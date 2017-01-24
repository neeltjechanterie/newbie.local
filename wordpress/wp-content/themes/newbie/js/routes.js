/**
 * Created by neeltjechanterie on 17/11/16.
 */
;(function () {
    'use strict';

    app.config(['$routeProvider', '$locationProvider', '$httpProvider', 'moment', function($routeProvider, $locationProvider, $httpProvider) {

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/_=_', {
                templateUrl: myLocalized.views + 'main.html',
                controller: 'Main'
            })
            .when('/', {
                templateUrl: myLocalized.views + 'main.html',
                controller: 'Main'
            })
            .when('/child', {
                templateUrl: myLocalized.views + 'child.html',
                controller: 'Child'
            })
            .when('/child/child-edit-picture/:id', {
                templateUrl: myLocalized.views + 'profile/child-picture.html',
                controller: 'Child'
            })

            .when('/child/child-settings/:id', {
                templateUrl: myLocalized.views + 'profile/child-settings.html',
                controller: 'Child'
            })
            .when('/child/weight/:id', {
                templateUrl: myLocalized.views + 'profile/child-weight.html',
                controller: 'ChildWeight'
            })
            .when('/child/length/:id', {
                templateUrl: myLocalized.views + 'profile/child-length.html',
                controller: 'ChildLength'
            })
            .when('/child/:id', {
                templateUrl: myLocalized.views + 'profile/child-post.html',
                controller: 'Child'
            })
            .when('/checklists',{
                templateUrl: myLocalized.views + 'test-all.html',
                controller: 'Test'
            })
            .when('/checklist/:id',{
                templateUrl: myLocalized.views + 'test.php',
                controller: 'Test'
            })
            .when('/mom-edit-picture/:id',{
                templateUrl: myLocalized.views + 'profile/user-picture.php',
                controller: 'Main'
            })
            .when('/mom-settings/:id',{
                templateUrl: myLocalized.views + 'profile/user.php',
                controller: 'Main'
            })
            .when('/mom-edit/:id',{
                templateUrl: myLocalized.views + 'profile/user-edit.html',
                controller: 'EditUser'
            })
            .when('/mom-weight/:id',{
                templateUrl: myLocalized.views + 'profile/weight.html',
                controller: 'UserWeight'
            })
            .when('/child-edit-picture/:id',{
                templateUrl: myLocalized.views + 'profile/child-picture.html',
                controller: 'Main'
            })
            .when('/child-settings/:id',{
                templateUrl: myLocalized.views + 'profile/child-settings.html',
                controller: 'Main'
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
            .when('/test/:id', {
                templateUrl: myLocalized.views + 'detail-checklist.html',
                controller: 'Checklists'
            })
            .when('/tests', {
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