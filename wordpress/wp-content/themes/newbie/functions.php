<?php

function my_scripts() {


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
    wp_enqueue_script(
        'my-scripts',
        get_stylesheet_directory_uri() . '/assets/js/app.js',
        array( 'my-jquery', 'angularjs', 'angular-local-storage', 'moment', 'moment-locale', 'angular-moment', 'angular-oauth1-client', 'angularjs-route', 'angularjs-sanitize', 'angular-slick', 'angular-cookies', 'angular-image-cache' )
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
add_action( 'wp_enqueue_scripts', 'my_scripts' );