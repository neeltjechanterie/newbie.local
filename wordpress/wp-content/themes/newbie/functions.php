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
    wp_register_script(
        'ui-tinymce',
        get_stylesheet_directory_uri() . '/bower_components/angular-ui-tinymce/dist/tinymce.min.js'
    );
    wp_register_script(
        'tinymce',
        get_stylesheet_directory_uri() . '/bower_components/tinymce/tinymce.js'
    );
    wp_enqueue_script(
        'my-scripts',
        get_stylesheet_directory_uri() . '/assets/js/app.js',
        array( 'my-jquery', 'angularjs', 'angular-local-storage', 'moment', 'moment-locale', 'angular-moment', 'angular-oauth1-client', 'angularjs-route', 'angularjs-sanitize', 'angular-slick', 'angular-cookies', 'angular-image-cache', 'ngFileUpload', 'FileUpload', 'ui-tinymce' )
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


add_action( 'after_setup_theme', 'ja_theme_setup' );
function ja_theme_setup() {
    add_theme_support( 'post-thumbnails');
}


//Get image URL
function get_thumbnail_url($post){
    if(has_post_thumbnail($post['id'])){
        $imgArray = wp_get_attachment_image_src( get_post_thumbnail_id( $post['id'] ), 'full' ); // replace 'full' with 'thumbnail' to get a thumbnail
        $imgURL = $imgArray[0];
        return $imgURL;
    } else {
        return false;
    }
}
//integrate with WP-REST-API
function insert_thumbnail_url_posts_child_profile() {
    register_rest_field( 'posts_child_profile',
        'featured_image',  //key-name in json response
        array(
            'get_callback'    => 'get_thumbnail_url',
            'update_callback' => null,
            'schema'          => null,
        )
    );
    register_rest_field( 'dagboek',
        'featured_image',  //key-name in json response
        array(
            'get_callback'    => 'get_thumbnail_url',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}
//register action
add_action( 'rest_api_init', 'insert_thumbnail_url_posts_child_profile' );

//create checklists on registration
function create_new_user_posts($user_id){
    if (!$user_id>0)
        return;

    //here we know the user has been created so to create
    // Create post object
    $babykleding = array(
        'post_title' => 'Babykleding',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($babykleding);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "6 rompertjes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "6 stuks bovenkleding",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "6 broekjes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "4 paar sokjes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "1 jasje of vestje",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 katoenen mutsjes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Kledingkast voor de baby",
            "ag_user"	=> $user_id,
        )

    );
    update_field( $field_key, $value, $the_post_id );

    //here we know the user has been created so to create
    // Create post object
    $doekjes = array(
        'post_title' => 'Doekjes',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($doekjes);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "16 hydrofiele luiers",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "6 monddoekjes",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );

    //here we know the user has been created so to create
    // Create post object
    $bad = array(
        'post_title' => 'Voor in bad',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($bad);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Babybad met standaard",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Babybadolie of zeepvrije wasgel",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Babyshampoo",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "6 hydrofiele washandjes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 Badcapes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Badthermometers",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );

    //here we know the user has been created so to create
    // Create post object
    $luiers = array(
        'post_title' => 'Voor het verschonen van de luiers',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($luiers);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 pakken newborn luiers",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Billendoekjes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Billencrème",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Aankleedkussen",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 hoezen voor het aankleedkussens",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Commode",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Luieremmer",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );


    //here we know the user has been created so to create
    // Create post object
    $overige = array(
        'post_title' => 'Overige verzorging',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($overige);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 digitale thermometers",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Babyolie",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Zacht babyborsteltje of kammetje",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Nagelvijltjes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Zonnebrand voor baby’s (50+)",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );

    //here we know the user has been created so to create
    // Create post object
    $slapen = array(
        'post_title' => 'Voor het slapen',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($slapen);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Wiegje of ledikant",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Matras",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 moltons",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "3 hoeslakens",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "3 bovenlakens",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 dekentjes van katoen of wol",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 slaapzakjes",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 naadloze metalen kruiken",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 kruikenzakken",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Nachtlampje",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Reiswiegje",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );

    //here we know the user has been created so to create
    // Create post object
    $borstvoeding = array(
        'post_title' => 'Borstvoeding',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($borstvoeding);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "2 voedingsbeha’s",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Zoogkompressen",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Borstkolf",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Flesjes voor afgekolfde melk",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Voedingskussen",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );

    //here we know the user has been created so to create
    // Create post object
    $flesvoeding = array(
        'post_title' => 'Voor flesvoeding',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($flesvoeding);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Zuigelingenvoeding",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "4 flessen en 2 spenen",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Flessenwarmer",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Flessenborstel",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Magnetron sterilisator",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Melkpoedertoren",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );

    //here we know the user has been created so to create
    // Create post object
    $huis = array(
        'post_title' => 'Handige producten voor in huis',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($huis);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Babyfoon",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Box",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Boxkleed",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Wipstoeltje",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Speelgoed en knuffels",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Fopspeen",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );

    //here we know the user has been created so to create
    // Create post object
    $opstap = array(
        'post_title' => 'Met baby op stap',
        'post_type' => 'checklist',
        'post_status' => 'publish',
        'post_author' => $user_id
    );
    $the_post_id = wp_insert_post($opstap);
    // save a repeater field value
    $field_key = "field_4444444444ddd";
    $value = array(
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Autostoel 0+",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Kinderwagen",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Luiertas",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Verschoonmatje",
            "ag_user"	=> $user_id,
        ),
        array(
            "ag_true_false"	=> "",
            "ag_checklist_item"	=> "Draagzak",
            "ag_user"	=> $user_id,
        )
    );
    update_field( $field_key, $value, $the_post_id );

};

add_action('user_register','create_new_user_posts', 999);
