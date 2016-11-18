var app = angular.module('app', ['ngRoute', 'ngSanitize', 'angularMoment', 'ngAnimate', 'ngSanitize', 'ui.bootstrap']);
app.run(function(amMoment) {
    amMoment.changeLocale('nl');
});
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
        /*.when('/:ID', {
            templateUrl: myLocalized.views + 'content.html',
            controller: 'Content'
        })*/
        .when('/categories', {
            templateUrl: myLocalized.views + 'categories.html',
            controller: 'Categories'
        })
        .when('/categories/:id', {
            templateUrl: myLocalized.views + 'category.html',
            controller: 'Category'
        })

        .when('/blog/:slug/', {
            templateUrl: myLocalized.views + 'content.html',
            controller: 'Content'
        })
        .when('/checklists', {
            templateUrl: myLocalized.views + 'checklists.html',
            controller: 'Checklists'
        })
        .when('/checklist/:id', {
            templateUrl: myLocalized.views + 'detail-checklist.html',
            controller: 'DetailChecklist'
        })
        .when('/checklist/:slug/', {
            templateUrl: myLocalized.views + 'detail-checklist.html',
            controller: 'DetailChecklist'
        })
        .when('/timer', {
            templateUrl: myLocalized.views + 'timer.html'
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



app.controller('Main', ['$scope', '$routeParams', '$http', 'WPService', function($scope, $routeParams, $http, WPService) {


    $http.get('/wp-json/wp/v2/posts/').success(function(res){
        $scope.posts = res;
        document.querySelector('title').innerHTML = 'HOME';
    });
    $http.get('/wp-json/wp/v2/categories').success(function(res){
        $scope.categories = res;
    });

    $http.get('wp-json/wp/v2/users/me').success(function(res){
        WPService.currentUser = res;

        //$scope.users = res;

        var dueDate = WPService.currentUser.acf.due_date;
        var d1 = moment(dueDate);
        var d2 = moment(Date.now());
        var weeks = moment.duration(d1.diff(d2)).asWeeks();
        var days = moment.duration(d1.diff(d2)).asDays();

        WPService.currentUser.percentDate = (weeks / 40) * 100;
        WPService.currentUser.currentWeek = weeks;
        WPService.currentUser.CountWeeks = (40 - weeks).toFixed(0);
        WPService.currentUser.CountDays = (268 - days).toFixed(0);
    });
    $scope.data = WPService;

}]);
app.controller('Checklists', function($scope, $http, moment, $routeParams) {
    $http.get('wp-json/wp/v2/checklists').success(function(res){
        $scope.checklists = res;
        document.querySelector('title').innerHTML = 'CHECKLISTS';


    });

});
app.controller('DetailChecklist', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
/*    $http.get('wp-json/wp/v2/checklists/?filter[name]=' + $routeParams.slug).success(function(res){
        $scope.checklist = res[0];
        document.querySelector('title').innerHTML = 'DETAIL CHECKLIST';

        $http.get('wp-json/wp/v2/categories?post=' + res.id).success(function(res){
            $scope.categories = res;
        })

    });*/


    $http.get('/wp-json/wp/v2/checklists/' + $routeParams.id).success(function(res){
        $scope.checklist = res;

        $http.get('wp-json/wp/v2/posts?tags=:id').success(function(res){
            $scope.tags = res;
        });


        $http.get('wp-json/wp/v2/posts?categories=' + res.id).success(function(res){
            $scope.categories = res;
        })
    });


    //$http.get('/wp-json/wp/v2/tags?post=' + $routeParams.checklistId).success(function(res){
/*    $http.get('/wp-json/wp/v2/tags?post=34').success(function(res){
        //$scope.current_checklist_id = $routeParams.checklistId;
        $scope.tags = res[0];

        $http.get('/wp-json/wp/v2/checklists/?filter[tag_name]=' + res.name).success(function(res){
            $scope.tags = res;
        });
    });*/

}]);


app.controller('Baby', function($scope, $http, $routeParams) {
    $http.get('/wp-json/wp/v2/posts/').success(function(res){
        $scope.posts = res;
        document.querySelector('title').innerHTML = 'BABY';
    });
    $http.get('/wp-json/wp/v2/categories').success(function(res){
        $scope.categories = res;
    });
});

app.controller('Categories', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/wp-json/wp/v2/categories').success(function(res){
        $scope.categories = res;
    });

    $http.get('wp-json/wp/v2/categories/' + $routeParams.id).success(function(res){
        $scope.current_category_id = res.id;
        $scope.pageTitle = 'Posts in ' + res[0].name + ':';
        document.querySelector('title').innerHTML = 'Category: ' + res[0].name + ' | AngularJS Demo Theme';

        $http.get('wp-json/wp/v2/posts?categories=' + res[0].id).success(function(res){
            $scope.posts = res;
        })
    });
}]);
app.controller('Category', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('/wp-json/wp/v2/categories/' + $routeParams.id).success(function(res){
        $scope.category = res;
        document.querySelector('title').innerHTML = 'DETAIL';

        $http.get('wp-json/wp/v2/posts?categories=' + res.id).success(function(res){
            $scope.posts = res;
        })
    });
}]);
app.controller('Content', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
    $http.get('wp-json/wp/v2/posts/?filter[name]=' + $routeParams.slug).success(function(res){
        $scope.post = res[0];
        document.querySelector('title').innerHTML = 'DETAIL';
    });
}]);

app.controller("LoginController", function($scope) {

    $scope.login = function() {
        window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "CLIENT_ID_HERE" + "&response_type=token"
    }

});

app.controller("SecureController", function($scope) {

    $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;

});

//sayHello Directive
app.directive('sayHello', function(){
    return {
        restrict: 'EA',
        templateUrl: myLocalized.views + 'say-hello.html',
        controller: ['WPService', function(WPService) {
            WPService.getCurrentUser();
        }]
    };
});