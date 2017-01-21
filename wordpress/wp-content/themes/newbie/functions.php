<?php

require_once get_template_directory() . '/acf-checklist-fields.php';


add_action( 'wp_enqueue_scripts', 'my_scripts' );


function my_scripts() {
    $assets_dir = get_template_directory_uri() . '/assets/';

    wp_enqueue_style( 'bootstrap', $assets_dir . 'css/bootstrap.css' );
    //wp_enqueue_style( 'bootstrap-datepicker3', $assets_dir . 'css/bootstrap-datepicker3.min.css', array( 'bootstrap' ) );
    //wp_enqueue_style( 'bootstrap-colorpicker', $assets_dir . 'css/bootstrap-colorpicker.min.css', array( 'bootstrap' ) );
    wp_enqueue_style( 'style', get_stylesheet_uri() );

    wp_enqueue_script( 'script', $assets_dir . 'js/acf-repeater.js', array( 'jquery' ), false, true );
    wp_localize_script( 'script', 'WP_API_Settings', array( 'root' => esc_url_raw( rest_url() ), 'nonce' => wp_create_nonce( 'wp_rest' ) ) );

    wp_enqueue_script( 'bootstrap', $assets_dir . 'js/bootstrap.min.js', array( 'script' ), false, true );
    //wp_enqueue_script( 'bootstrap-datepicker', $assets_dir . 'js/bootstrap-datepicker.min.js', array( 'bootstrap' ), false, true );
    //wp_enqueue_script( 'bootstrap-colorpicker', $assets_dir . 'js/bootstrap-colorpicker.min.js', array( 'bootstrap' ), false, true );
    //wp_enqueue_script( 'google-maps', 'https://maps.googleapis.com/maps/api/js?v=3.11&sensor=false&libraries=places' );

    // ANGULAR MODULES
    wp_enqueue_script(
        'angularjs',
        get_stylesheet_directory_uri() . '/node_modules/angular/angular.min.js'
    );
    wp_enqueue_script(
        'angular-local-storage',
        get_stylesheet_directory_uri() . '/node_modules/angular-local-storage/dist/angular-local-storage.min.js'
    );
    wp_enqueue_script(
        'moment',
        get_stylesheet_directory_uri() . '/node_modules/moment/moment.js'
    );
    wp_enqueue_script(
        'moment-locale',
        get_stylesheet_directory_uri() . '/node_modules/moment/locale/nl.js'
    );
    wp_enqueue_script(
        'angular-moment',
        get_stylesheet_directory_uri() . '/node_modules/angular-moment/angular-moment.min.js'
    );
    wp_enqueue_script(
        'angular-oauth1-client',
        get_stylesheet_directory_uri() . '/node_modules/angular-oauth1-client/dist/angular-oauth1-client.min.js'
    );
    wp_enqueue_script(
        'angularjs-route',
        get_stylesheet_directory_uri() . '/node_modules/angular-route/angular-route.min.js'
    );
    wp_register_script(
        'angularjs-sanitize',
        get_stylesheet_directory_uri() . '/node_modules/angular-sanitize/angular-sanitize.min.js'
    );
    wp_register_script(
        'angular-slick',
        get_stylesheet_directory_uri() . '/node_modules/angular-slick-carousel/dist/angular-slick.min.js'
    );
    wp_register_script(
        'angular-cookies',
        get_stylesheet_directory_uri() . '/node_modules/angular-cookies/angular-cookies.min.js'
    );
    wp_register_script(
        'my-jquery',
        get_stylesheet_directory_uri() . '/node_modules/jquery/dist/jquery.min.js'
    );
    wp_register_script(
        'angular-image-cache',
        get_stylesheet_directory_uri() . '/node_modules/ng-image-cache/dist/ng-image-cache.js'
    );
    wp_register_script(
        'FileUpload',
        get_stylesheet_directory_uri() . '/node_modules/ng-file-upload/dist/ng-file-upload.min.js'
    );
    wp_register_script(
        'ngFileUpload',
        get_stylesheet_directory_uri() . '/node_modules/ng-file-upload/dist/ng-file-upload-shim.min.js'
    );
    wp_enqueue_script(
        'my-scripts',
        get_stylesheet_directory_uri() . '/assets/js/app.js',
        array( 'my-jquery', 'angularjs', 'angular-local-storage', 'moment', 'moment-locale', 'angular-moment', 'angular-oauth1-client', 'angularjs-route', 'angularjs-sanitize', 'angular-slick', 'angular-cookies', 'angular-image-cache', 'ngFileUpload', 'FileUpload' )
    );
    wp_enqueue_script(
        'wp-service',
        get_stylesheet_directory_uri() . '/js/factories.js'
    );
    wp_localize_script(
        'my-scripts',
        'myLocalized',
        array(
            'views' => trailingslashit( get_template_directory_uri() ) . 'views/',
            'nonce' => wp_create_nonce( 'wp_rest' )

        )
    );
}


add_filter( 'acf/rest_api/item_permissions/update', function( $permission, $request, $type ) {
    if ( 'user' == $type && method_exists( $request, 'get_param' ) && get_current_user_id() == $request->get_param( 'id' ) ) {
        return true;
    }
    return $permission;
}, 10, 3 );


function _checked( $haystack, $current, $echo = true ) {
    if ( is_array( $haystack ) ) {
        if ( in_array( $current, $haystack ) ) {
            $current = $haystack = true;
        } else {
            $current = ! ( $haystack = true );
        }
    }

    return checked( $haystack, $current, $echo );
}

/*
function user_include_email( $data ) {
    $email = $data->data['email']; // get featured image id
    if( $email ) {
        $data->data['email'] = $email[0];
    }

    return $data;
}
add_filter( 'rest_prepare_user', 'user_include_email', 10, 3 );*/


//add_action( 'template_redirect', 'redirect_to_specific_page' );

function redirect_to_specific_page() {

    if ( ! is_user_logged_in() ) {

        auth_redirect();
    }
}
//add_action( 'template_redirect', 'redirect_user' );

function redirect_user() {
    if ( ! is_user_logged_in() && ! is_page( 'login' )  && ! is_page( 'wp-login' ) ) {
        $return_url = esc_url( home_url( '/wp-login' ) );
        wp_redirect( $return_url );
        exit;
    }
}
function my_login_stylesheet() {
    wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/assets/css/style-login.css' );
    wp_enqueue_script( 'custom-login', get_stylesheet_directory_uri() . '/assets/js/style-login.js' );

}
add_action( 'login_enqueue_scripts', 'my_login_stylesheet' );