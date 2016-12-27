/**
 * Created by neeltjechanterie on 17/11/16.
 */
;(function () {
    'use strict';

    app.config(['$routeProvider', '$locationProvider', '$httpProvider', 'moment', function($routeProvider, $locationProvider, $httpProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: myLocalized.views + 'main.html',
                controller: 'Main'
            })
            .when('/baby', {
                templateUrl: myLocalized.views + 'baby.html',
                controller: 'Baby'
            })
            .when('/test',{
                templateUrl: myLocalized.views + 'test.php',
                controller: 'Test'
            })
            /*.when('/:ID', {
             templateUrl: myLocalized.views + 'content.html',
             controller: 'Content'
             })*/
            /*.when('/categories', {
                templateUrl: myLocalized.views + 'categories.html',
                controller: 'Categories'
            })
            .when('/categories/:id', {
                templateUrl: myLocalized.views + 'category.html',
                controller: 'Category'
            })*/
            .when('/category/:id/', {
                templateUrl: myLocalized.views + 'content-category.html',
                controller: 'Content'
            })
            .when('/blog/:slug/', {
                templateUrl: myLocalized.views + 'content.html',
                controller: 'Content'
            })
            .when('/checklist/:id', {
                templateUrl: myLocalized.views + 'detail-checklist.html',
                controller: 'Checklists'
            })
            .when('/checklists', {
                templateUrl: myLocalized.views + 'checklists.html',
                controller: 'Checklists'
            })
            /*.when('/checklist/:slug/', {
                templateUrl: myLocalized.views + 'detail-checklist.html',
                controller: 'DetailChecklist'
            })*/
            .when('/timer', {
                templateUrl: myLocalized.views + 'timer.html'
            })
            /*.when('/login', {
                url: '/wp-login.php'
            })*/
            /*.when('secure', {
                url: '/secure',
                templateUrl: 'templates/secure.html',
                controller: 'SecureController'
            })*/
        ;

        $httpProvider.interceptors.push([function() {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};
                    //add nonce to avoid CSRF issues
                    config.headers['X-WP-Nonce'] = myLocalized.nonce;

                    return config;
                }
            };
        }]);

    }]);

})();