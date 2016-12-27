/**
 * Created by neeltjechanterie on 17/11/16.
 */
;(function () {
    'use strict';

    app.controller('Main', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies) {
        $http.get('wp-json/wp/v2/users/me').success(function(res){
            WPService.currentUser = res;


            //$scope.users = res;

            var dueDate = WPService.currentUser.acf.due_date;
            var d1 = moment(dueDate);
            var d2 = moment(Date.now());
            var weeks = moment.duration(d1.diff(d2)).asWeeks();
            var days = moment.duration(d1.diff(d2)).asDays();

            WPService.currentUser.percentDate = (weeks / 40) * 100;
            WPService.currentUser.CountDownWeek = weeks;
            var currentWeek = (40 - weeks).toFixed(0);
            WPService.currentUser.CountWeeks = currentWeek;
            var currentDay = (268 - days).toFixed(0);
            WPService.currentUser.CountDays = currentDay;

            $scope.data.filterWeeksPost = 'week-' + (weeks).toFixed(0);


            $http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token'))
                .then(function successCallback(response) {

                    // second API call to get more details about the current user, e.g. capabilities
                    $http.get('/wp-json/wp/v2/users/' + response.data.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'))
                        .then(function successCallback(response) {
                            console.log(response.data);
                            $scope.user = response.data;


                            //WPService.currentUser.currentWeek = weeks;

                            if (currentWeek < 10){
                                var currentWeekEdit = "0" + currentWeek;
                                console.log(currentWeekEdit);
                            }
                            else {
                                var currentWeekEdit = currentWeek;
                            }

                            var catWeekName = 'Week ' + currentWeek;
                            var catWeekSlug = 'week-' + currentWeekEdit;



                            console.log(catWeekName);
                            console.log(catWeekSlug);
                            $http.get('/wp-json/wp/v2/posts/?filter[category_name]=' + catWeekSlug).success(function(res){
                                $scope.posts = res;

                            });
                            $http.get('/wp-json/wp/v2/categories/?search=' + catWeekSlug).success(function(res){
                                $scope.categories = res;
                            });
                            $http.get('/wp-json/wp/v2/posts-baby/?filter[category_name]=' + catWeekName).success(function(res){
                                $scope.posts_baby = res;

                            });

                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    $scope.user = response.data;


                }, function errorCallback(response) {
                    console.log(response);
                });
        });
        //get current user


        $scope.data = WPService;



/*        $http.get('/wp-json/wp/v2/posts/').success(function(res){
            $scope.posts = res;

        });
        $http.get('/wp-json/wp/v2/categories/').success(function(res){
            $scope.categories = res;
        });*/



    }]);
    app.controller('Test', ['$scope', '$cookies', '$routeParams', '$http', '$httpParamSerializerJQLike', function($scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike) {
        //app.controller('Checklists', ['$scope', '$cookies', '$routeParams', '$http', '$httpParamSerializerJQLike', function($scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike) {

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
                console.log("Current user: " + $scope.user.id + ", Current username: " + $scope.user.slug);
                $http.get('wp-json/wp/v2/checklists/?author=' + $scope.user.id).success(function(res){
                    $scope.checklists = res;

                    $scope.totalItems = res.length;
                    console.log("TOTAL: " + $scope.totalItems);




                });

                $http.get('/wp-json/wp/v2/checklists/' + '337').success(function(res){
                    $scope.checklist = res;
                    var items = res.acf.checklist_items;
                    var ag_items = res.acf.ag_repeater_checklist;
                    console.log(items);
                    console.log(res);
                    console.log(ag_items);
                    //$scope.checklist.acf.checklist_items = res.data;
                    //console.log(res.data);
                    //$scope.item = res.data;
                    //console.log(res.data);

                    //$scope.totalItems = res.length();

                });

            }, function errorCallback(response) {
                console.log(response);
            });


    }]);

    //app.controller('Checklists', function($scope, $http, moment, $routeParams) {
    app.controller('Checklists', ['$scope', '$cookies', '$routeParams', '$http', '$httpParamSerializerJQLike', function($scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike) {
    //app.controller('Checklists', ['$scope', '$cookies', '$routeParams', '$http', '$httpParamSerializerJQLike', function($scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike) {

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
                console.log("Current user: " + $scope.user.id + ", Current username: " + $scope.user.slug);
                $http.get('wp-json/wp/v2/checklists/?author=' + $scope.user.id).success(function(res){
                    $scope.checklists = res;

                    $scope.totalItems = res.length;
                    console.log("TOTAL: " + $scope.totalItems);




                });

                $http.get('/wp-json/wp/v2/checklists/' + $routeParams.id).success(function(res){
                    $scope.checklist = res;
                    var items = res.acf.checklist_items;
                    console.log(items);
                    console.log(res);
                    //$scope.checklist.acf.checklist_items = res.data;
                    //console.log(res.data);
                    //$scope.item = res.data;
                    //console.log(res.data);

                    //$scope.totalItems = res.length();

                });

            }, function errorCallback(response) {
                console.log(response);
            });

        // Edit item button
        $scope.editItem = function(id, itemId) {
            document.getElementById('editItem').style.display = 'block';
            $scope.checklists.id = id;
            //$scope.checklist.id = id[0];
            $scope.checklist.id = itemId;
            console.log("ID: " + id);
            console.log("ID2: " + itemId);
            //console.log("ID2: " + id[0]);
            //console.log("ID3: " + id[1]);
            console.log("ID3: " + $scope.checklists.id);
            console.log("ID4: " + $scope.checklist.id);
            //console.log("ID4: " + $scope.item.id);
            //$scope.checklist.item.id = itemId;
            //$scope.checklist.acf.checklist_items.id = itemId;
            //console.log("ItemID: " + itemId);

            //$scope.item.checklistId = $scope.checklist.acf.checklist_items.id;
            $scope.checklist.description = $scope.checklist.item_description;
            console.log($scope.checklist.description);
        };

        // Update item
        $scope.updateItem = function() {
            console.log("ID: " + $scope.checklists.id);
            console.log("ID2: " + $scope.checklist.id);
            console.log($scope.checklist);
            console.log($scope.checklists);
            $scope.checklists[3].acf.checklist_items = $scope.checklist;
            console.log($scope.checklists);
            var p = $httpParamSerializerJQLike({

                acf: $scope.checklists.acf
            });
            console.log(p);

            $http({
                url: 'wp-json/wp/v2/checklists/' + $scope.checklists.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'),
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'id': $scope.checklists.id
                },
                data: $httpParamSerializerJQLike({"acf": $scope.checklists.acf})

            }).then(function successCallback(response) {
                console.log(response);

                $scope.checklist = response.data;


                document.getElementById('editItem').style.display = 'none';
                document.getElementById('responseMessage').innerHTML = 'Succesfuly updated checklist.' + $scope.checklist.id;

            }, function errorCallback(response) {
                console.log(response);
            });
        };

    }]);

    app.filter('filterChecklist', function(WPService){
        WPService.getCurrentUser();
        return function(input){
            var out = [];
            angular.forEach(input, function(item){
                console.log("Logged in User: " + WPService.currentUser.slug);
                console.log("Checklist user: " + item.item_user.nickname);
                if(item.item_user.nickname === WPService.currentUser.slug){
                    out.push(item);


                    //console.log(item);
                }
            });
            return out;

        }
    });

    app.filter('filterItemsChecklist', function(){
        return function(input){
            var out = [];
            angular.forEach(input, function(item){
                if(item.item_value == true){
                    out.push(item.length);
                    //console.log(item);
                }
            });
            return out;

        }
    });



    app.controller('Baby', function($scope, $http, $routeParams, WPService) {
        /*$http.get('/wp-json/wp/v2/posts/').success(function(res){
            $scope.posts = res;
            document.querySelector('title').innerHTML = 'BABY';
        });
        $http.get('/wp-json/wp/v2/categories').success(function(res){
            $scope.categories = res;
        });*/

        $http.get('wp-json/wp/v2/users/me').success(function(res){
            WPService.currentUser = res;
            console.log(res.currentUser);


            var dueDate = WPService.currentUser.acf.due_date;
            var d1 = moment(dueDate);
            var d2 = moment(Date.now());
            var weeks = moment.duration(d1.diff(d2)).asWeeks();

            $scope.data.filterWeeksPost = 'Week-' + (weeks).toFixed(0);

            $http.get('/wp-json/wp/v2/categories').success(function(res, filterWeeksPost){
                $scope.categories = res;
                $scope.data.filterWeeksPost = res;

                $http.get('/wp-json/wp/v2/posts/?filter[category_name]=' + filterWeeksPost).success(function(res){
                    $scope.posts = res;
                    console.log(res.posts);
                });
            });

        });
        $scope.data = WPService;



/*        $http.get('wp-json/taxonomies/category/terms/?filter[slug]=' + $routeParams.category).success(function(res){
            $scope.current_category_id = res[0].ID;
            $scope.pageTitle = 'Posts in ' + res[0].name + ':';
            document.querySelector('title').innerHTML = 'Category: ' + res[0].name + ' | AngularJS Demo Theme';

            $http.get('wp-json/posts/?filter[category_name]=' + res[0].name).success(function(res){
                $scope.posts = res;
            });
        });*/
    });


/*    app.controller('Categories', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
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
    }]);*/
    app.controller('Content', ['$scope', '$cookies', '$routeParams', '$http', '$httpParamSerializerJQLike', function($scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike) {

        $http.get('wp-json/wp/v2/posts/' + $routeParams.ID).success(function(res) {
            $scope.post = res;
            document.querySelector('title').innerHTML = res.title.rendered + ' | AngularJS Demo Theme';
        }).error(function(res, status) {
            if (status === 404) {
                $scope.is404 = true;
                document.querySelector('title').innerHTML = 'Page not found | AngularJS Demo Theme';
                $scope.errorMessage = 'Error: ' + res[0].message;
            }
        });

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

        //get category by slug
        $http.get('wp-json/wp/v2/categories/' + $routeParams.id).success(function(res){
            $scope.category = res;
            console.log(res.data);

        }).error(function (res) {
            console.log(res);

        });

        //get post by slug
        $http.get('wp-json/wp/v2/posts/?filter[name]=' + $routeParams.slug).success(function(res){
            $scope.post = res[0];
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

// Inline edit directive
/*    app.directive('inlineEdit', function($timeout) {
        return {
            scope: {
                model: '=inlineEdit',
                handleSave: '&onSave',
                handleCancel: '&onCancel'
            },
            link: function(scope, elm, attr, $scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike) {

                var previousValue;

                scope.edit = function() {
                    scope.editMode = true;
                    previousValue = scope.model;

                    $timeout(function() {
                        elm.find('input')[0].focus();
                    }, 0, false);
                };
                scope.save = function() {
                    scope.item.item_description = scope.checklist.checklist_items.item_description;
                        $http({
                            url: 'wp-json/wp/v2/checklists/' + scope.checklist.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'),
                            method: "POST",
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            data: $httpParamSerializerJQLike({
                                title: $scope.item.item_description
                            })
                        }).then(function successCallback(response) {
                            console.log(response);

                            scope.checklists = response.data;
                            scope.editMode = false;


                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    };

                    //scope.handleSave({value: scope.model});
                scope.cancel = function() {
                    $scope.editMode = false;
                    $scope.model = previousValue;
                    $scope.handleCancel({value: scope.model});
                };
            },
            templateUrl: myLocalized.views + 'inline-edit.html'
        };
    });*/

})();