var app = angular.module('app', ['ngRoute', 'ngSanitize', 'angularMoment']);
app.run(function(amMoment) {
    amMoment.changeLocale('nl');
});
app.config(['$routeProvider', '$locationProvider', 'moment', function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider
        .when('/', {
            templateUrl: myLocalized.partials + 'main.html',
            controller: 'Main'
        })
        .when('/baby', {
            templateUrl: myLocalized.partials + 'baby.html',
            controller: 'Baby'
        })
        /*.when('/:ID', {
            templateUrl: myLocalized.partials + 'content.html',
            controller: 'Content'
        })*/
        .when('/category/:category', {
            templateUrl: myLocalized.partials + 'baby.html',
            controller: 'Category'
        })
        .when('/blog/:slug/', {
            templateUrl: myLocalized.partials + 'content.html',
            controller: 'Content'
        })
        .when('/checklists', {
            templateUrl: myLocalized.partials + 'checklists.html',
            controller: 'Checklists'
        })
        .when('login', {
            url: '/login',
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        })
        .when('secure', {
            url: '/secure',
            templateUrl: 'templates/secure.html',
            controller: 'SecureController'
        });
}]);
app.controller('Main', function($scope, $http, moment, $routeParams) {
    $http.get('/wp-json/wp/v2/posts/').success(function(res){
        $scope.posts = res;
        document.querySelector('title').innerHTML = 'HOME';
    });
    $http.get('/wp-json/wp/v2/categories').success(function(res){
        $scope.categories = res;

    });
    $http.get('/wp-json/wp/v2/users/1').success(function(res){
        $scope.users = res;

        var dueDate = $scope.users.acf.due_date;
        var d1 = moment(dueDate);
        var d2 = moment(Date.now());
        var weeks = moment.duration(d1.diff(d2)).asWeeks();
        var days = moment.duration(d1.diff(d2)).asDays();

        $scope.users.percentDate = (weeks / 40) * 100;
        $scope.users.currentWeek = weeks;
        $scope.users.CountWeeks = (40 - weeks).toFixed(0);
        $scope.users.CountDays = (268 - days).toFixed(0);

    });

});
app.controller('Baby', function($scope, $http, $routeParams) {
    $http.get('/wp-json/wp/v2/posts/').success(function(res){
        $scope.posts = res;
        document.querySelector('title').innerHTML = 'BABY';
    });
    $http.get('/wp-json/wp/v2/categories').success(function(res){
        $scope.categories = res;
    });
});
app.controller('Category', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('wp-json/categories').success(function(res){
        $scope.categories = res;
    });

    $http.get('/wp-json/wp/v2/categories/' + $routeParams.category).success(function(res){
        $scope.current_category_id = $routeParams.category;
        $scope.pageTitle = 'Posts in ' + res.name + ':';
        document.querySelector('title').innerHTML = 'Category: ' + res.name + ' | AngularJS Demo Theme';

        $http.get('/wp-json/wp/v2/posts/?filter[category_name]=' + res.name).success(function(res){
            $scope.posts = res;
        });
    });
}]);
/*app.controller('Content', function($scope, $http, $routeParams) {
    $http.get('/wp-json/wp/v2/posts/' + $routeParams.ID).success(function(res){
        $scope.post = res;
    });
});*/
app.controller('Content', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('wp-json/wp/v2/posts/?filter[name]=' + $routeParams.slug).success(function(res){
        $scope.post = res[0];
        document.querySelector('title').innerHTML = 'DETAIL';
    });
}]);
app.controller('Checklists', function($scope, $http, $routeParams) {

});
app.controller("LoginController", function($scope) {

    $scope.login = function() {
        window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "CLIENT_ID_HERE" + "&response_type=token"
    }

});

app.controller("SecureController", function($scope) {

    $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;

});