/**
 * Created by neeltjechanterie on 17/11/16.
 */
;(function () {
    'use strict';

    app.controller('Main', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike) {


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
    app.controller('Content', ['$scope', '$cookies', '$routeParams', '$http', '$httpParamSerializerJQLike', function($scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike) {


        /*$http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token')).success(function(res){
            console.log(res.data);
            $scope.user = res.data;
            $scope.post = res[0];
            document.querySelector('title').innerHTML = 'DETAIL';
        });*/

        //get current user
        $http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token'))
            .then(function successCallback(response) {

                // second API call to get more details about the current user, e.g. capabilities
                $http.get('/wp-json/wp/v2/users/' + response.data.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'))
                   .then(function successCallback(response) {
                    console.log(response.data);
                    $scope.user = response.data;
                }, function errorCallback(response) {
                    console.log(response);
                });
                $scope.user = response.data;
            }, function errorCallback(response) {
                console.log(response);
            });
        //get post by slug
        $http.get('wp-json/wp/v2/posts/?filter[name]=' + $routeParams.slug).success(function(res){
            $scope.post = res[0];
            document.querySelector('title').innerHTML = 'DETAIL';
        });

        // Edit post button
        $scope.editPost = function(id) {
            document.getElementById('editPost').style.display = 'block';
            $scope.post.id = id;
            $scope.post.title = $scope.post.title.rendered;
            $scope.post.content = $scope.post.content.rendered;

        };

        // Update post
        $scope.updatePost = function() {
            $http({
                url: 'wp-json/wp/v2/posts/' + $scope.post.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'),
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    title: $scope.post.title,
                    content: $scope.post.content
                })
            }).then(function successCallback(response) {
                console.log(response);

                $scope.posts = response.data;


                document.getElementById('editPost').style.display = 'none';
                document.getElementById('responseMessage').innerHTML = 'Succesfuly updated post.' + $scope.post.id;

            }, function errorCallback(response) {
                console.log(response);
            });
        };
    }]);

/*    app.controller("LoginController", function($scope) {

        $scope.login = function() {
            window.location.href = "https://api.imgur.com/oauth2/authorize?client_id=" + "CLIENT_ID_HERE" + "&response_type=token"
        }

    });

    app.controller("SecureController", function($scope) {

        $scope.accessToken = JSON.parse(window.localStorage.getItem("imgur")).oauth.access_token;

    });*/


})();