<?php
/**
 * WordPress OAuth Functions
 * 
 * @author Justin Greer <justin@justin-greer.com>
 * @package WordPress OAuth Server
 *
 * @todo Convert entire file into library ( class )
 */

// Hook into core filters
require_once dirname(__FILE__) . '/filters.php' ;

// Hook into core actions
require_once( dirname(__FILE__) . '/actions.php' );

/**
 * Generates a 40 Character key is generated by default but should be adjustable in the admin
 * @return [type] [description]
 *
 * @todo Allow more characters to be added to the character list to provide complex keys
 */
function wo_gen_key( $length = 40 ) {

	// Gather the settings
	$options = get_option("wo_options");
	$user_defined_length = (int) $options["client_id_length"];
	
	// If user setting is larger than 0, then define it
	if ( $user_defined_length > 0 ) {
		$length = $user_defined_length;
	}

	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$randomString = '';

	for ($i = 0; $i < $length; $i++) {
		$randomString .= $characters[rand(0, strlen($characters) - 1)];
	}

	return $randomString;
}

/**
 * Blowfish Encryptions
 * @param  [type]  $input  [description]
 * @param  integer $rounds [description]
 * @return [type]          [description]
 *
 * REQUIRES ATLEAST 5.3.x
 */
function wo_crypt($input, $rounds = 7) {
	$salt = "";
	$salt_chars = array_merge(range('A', 'Z'), range('a', 'z'), range(0, 9));
	for ($i = 0; $i < 22; $i++) {
		$salt .= $salt_chars[array_rand($salt_chars)];
	}
	return crypt($input, sprintf('$2a$%02d$', $rounds) . $salt);
}

/** 
 * Check if there is more than one client in the system
 * 
 * @return boolean [description]
 */
function has_a_client (){
	global $wpdb;
	$count = $wpdb->get_results("SELECT * FROM {$wpdb->prefix}oauth_clients");
	//print_r($count);
	if (count($count) >= 1)
		return true;
}

/**
 * Get the client IP multiple ways since REMOTE_ADDR is not always the best way to do so
 * @return [type] [description]
 */
function client_ip(){
	$ipaddress = '';
    if (getenv('HTTP_CLIENT_IP'))
        $ipaddress = getenv('HTTP_CLIENT_IP');
    else if(getenv('HTTP_X_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_X_FORWARDED_FOR');
    else if(getenv('HTTP_X_FORWARDED'))
        $ipaddress = getenv('HTTP_X_FORWARDED');
    else if(getenv('HTTP_FORWARDED_FOR'))
        $ipaddress = getenv('HTTP_FORWARDED_FOR');
    else if(getenv('HTTP_FORWARDED'))
        $ipaddress = getenv('HTTP_FORWARDED');
    else if(getenv('REMOTE_ADDR'))
        $ipaddress = getenv('REMOTE_ADDR');
    else
        $ipaddress = 'UNKNOWN';
 
    return $ipaddress;
}

/**
 * Valid the license
 * @param  [type] $l [description]
 * @return [type]    [description]
 */
function _vl() {
	$options = get_option('wo_options');
	return @$options['license_status'] == 'valid' ? true : false;
}

function license_status (){
	$options = get_option('wo_options');
	$status = isset($options['license_status']) ? $options['license_status'] : '';
	switch($status){
		case 'invalid':
			echo 'Invalid. Activate your license now.';
			break;	
		case 'valid':
			echo 'Valid';
			break;
	}

}

/**
 * Cron Tasks That the plugin should run daily
 * @return [type] [description]
 */
add_action( 'wo_daily_tasks_hook', 'wo_daily_tasks' );
function wo_daily_tasks () {
	$options = get_option( 'wo_options' );
	if( @$options['license_status'] == 'valid' ){
		$api_params = array( 
			'edd_action'=> 'activate_license', 
			'license' 	=> $options['license'], 
			'item_name' => urlencode('WP OAuth License'),
			'url'       => home_url()
		);
		$response = wp_remote_get( add_query_arg( $api_params, 'https://wp-oauth.com' ) );
		if ( !is_wp_error( $response ) ){
			$license_data = json_decode( wp_remote_retrieve_body( $response ) );
			if(@$options['license_status'] == 'valid' && $license_data->license != 'valid') {
				wp_mail( get_option('admin_email'), 'Issues found with WP OAuth Server', 'Recent checks show that your license key status for WordPress OAuth Server has been changed.');
				$options['license'] = '';
				$options['license_status'] = '';
			}
			update_option('wo_options', $options);
		}
	}
}

/**
 * WordPress OAuth Server Firewall
 * Called if and license is valid and the firewall is enabled
 */
add_action('wo_before_api', 'wordpress_oauth_firewall_init', 10);
function wordpress_oauth_firewall_init() {
	$options = get_option('wo_options');
	if(!_vl())
		return;

	if(isset($options['firewall_block_all_incomming']) && $options['firewall_block_all_incomming']){
		$remote_addr = client_ip();
		$whitelist = str_replace(' ', '',$options['firewall_ip_whitelist']); // remove all whitespace
		$whitelist_array = explode(',', $whitelist);
		if(in_array($remote_addr, $whitelist_array))
			return;

		header('Content-Type: application/json');
		$response = array(
			'error' => 'Unauthorized'
			);
		print json_encode($response);
		exit;
	}
}

/**
 * Return the private key for signing
 * @since 3.0.5
 * @return [type] [description]
 */
function get_private_server_key () {
	$keys = apply_filters('wo_server_keys', null);
	return file_get_contents( $keys['private'] );
}

/**
 * Returns the public key
 * @return [type] [description]
 * @since 3.1.0
 */
function get_public_server_key () {
	$keys = apply_filters('wo_server_keys', null);
	return file_get_contents( $keys['public'] );
}

/**
 * Returns the set ALGO that is to be used for the server to encode
 *
 * @todo Possibly set this to be adjusted somewhere. The it_token calls for it to be set by each
 * client as a pref but we need to keep this simple.
 * 
 * @since 3.1.93
 * @return String Type of algorithm used for encoding and decoding.
 */
function wo_get_algorithm (){
	return 'RS256';
}	

/**
 * Check to see if there is certificates that have been generated
 * @return boolean [description]
 */
function wo_has_certificates (){
	return file_exists( dirname(WPOAUTH_FILE) . '/library/keys/public_key.pem' ) 
	&& file_exists( dirname(WPOAUTH_FILE) . '/library/keys/private_key.pem' );
}

/**
 * [wo_create_client description]
 * @param  [type] $user [description]
 * @return [type]       [description]
 *
 * @todo Add role and permissions check
 */
function wo_create_client( $user=null ){

	do_action('wo_before_create_client', array( $user ) );
	if(! current_user_can( 'manage_options' ) )
		return false;

	$new_client_id = wo_gen_key();
	$new_client_secret = wo_gen_key();

	// Insert the user into the system
	global $wpdb;
	return $wpdb->insert("{$wpdb->prefix}oauth_clients",
		array(
			'client_id' => $new_client_id,
			'client_secret' => $new_client_secret,
			'redirect_uri' => empty($user['client-redirect-uri']) ? '' : $user['client-redirect-uri'],
			'name' => empty($user['client-name']) ? 'No Name' : $user['client-name'],
			'description' => empty($user['client-description']) ? '' : $user['client-description']
			));
}

function login_redirect( $redirect_to, $request, $user ){
    return home_url('');
}
add_filter( 'login_redirect', 'login_redirect', 10, 3 );