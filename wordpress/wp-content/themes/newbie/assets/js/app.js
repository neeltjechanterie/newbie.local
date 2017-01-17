/**
 * Created by neeltjechanterie on 17/11/16.
 */
var app = angular.module('app', ['ngRoute', 'ngSanitize', 'angularMoment', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngCookies', 'ngImageCache', 'ngFileUpload']);
app.run(function(amMoment) {
    amMoment.changeLocale('nl');
});
/**
 * Created by neeltjechanterie on 17/11/16.
 */
;(function () {
    'use strict';

    app.controller('Main', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout) {
        $http.get('wp-json/wp/v2/users/me').success(function(res){
            WPService.currentUser = res;


            //$scope.users = res;

            var dueDate = WPService.currentUser.acf.due_date;
            var d1 = moment(dueDate);
            var d2 = moment(Date.now());
            var weeks = moment.duration(d1.diff(d2)).asWeeks();
            var days = moment.duration(d1.diff(d2)).asDays();

            $scope.percentDate = 100 - ((weeks / 40) * 100);
            WPService.currentUser.CountDownWeek = weeks;
            var currentWeek = (40 - weeks).toFixed(0);
            WPService.currentUser.CountWeeks = currentWeek;
            var currentDay = (268 - days).toFixed(0);
            WPService.currentUser.CountDays = currentDay;

            $scope.data.filterWeeksPost = 'week-' + (currentWeek);

            $scope.today = moment(new Date()).format("YYYY-MM-DD");

            $http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token'))
                .then(function successCallback(response) {

                    // second API call to get more details about the current user, e.g. capabilities
                    $http.get('/wp-json/wp/v2/users/' + response.data.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'))
                        .then(function successCallback(response) {
                            console.log(response.data);
                            $scope.user = response.data;
                            //$scope.user.email = response.data.email;
                            console.log(response.data.email);

                            $scope.url = "http://newbie.local/wp-json/acf/v2/user/" + $routeParams.id;
                            console.log(response.data);



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


                            var weight_statistics = response.data.acf.weight_statistics;
                            function sortByKey(array, key) {
                                return array.sort(function(a, b) {
                                    var x = a[key]; var y = b[key];
                                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                                });
                            }
                            var sort_weight_statistics = sortByKey(weight_statistics, 'weight_date');
                            var $weight_date = sort_weight_statistics.map(function(a) {return a.weight_date;});
                            var $weight_value = sort_weight_statistics.map(function(a) {return a.weight_number;});


                            var $last_weight_date = sort_weight_statistics.map(function(a) {return a.weight_date;});
                            var $last_weight_value = sort_weight_statistics.map(function(a) {return a.weight_number;});

                            $scope.last_item_weight = $last_weight_value.pop();
                            $scope.last_item_weight_date = $last_weight_date.pop();

                            console.log($weight_date);
                            console.log($weight_value);

                            var config = {
                                type: 'line',
                                data: {
                                    labels: $weight_date,
                                    datasets: [
                                        {
                                            label: "Mijn gewicht",
                                            fill: false,
                                            lineTension: 0.1,
                                            backgroundColor: "rgba(75,192,192,0.4)",
                                            borderColor: "rgba(75,192,192,1)",
                                            borderCapStyle: 'butt',
                                            borderDash: [],
                                            borderDashOffset: 0.0,
                                            borderJoinStyle: 'miter',
                                            pointBorderColor: "rgba(75,192,192,1)",
                                            pointBackgroundColor: "#fff",
                                            pointBorderWidth: 1,
                                            pointHoverRadius: 5,
                                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                                            pointHoverBorderColor: "rgba(220,220,220,1)",
                                            pointHoverBorderWidth: 2,
                                            pointRadius: 1,
                                            pointHitRadius: 10,
                                            data: $weight_value,
                                            spanGaps: false,
                                        }
                                    ]
                                },
                                options: {
                                    responsive: true,
                                    title:{
                                        display:true,
                                        text:'Gewicht mama'
                                    },
                                    tooltips: {
                                        mode: 'index',
                                        intersect: false,
                                    },
                                    hover: {
                                        mode: 'nearest',
                                        intersect: true
                                    },
                                    scales: {
                                        xAxes: [{
                                            display: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Datum'
                                            }
                                        }],
                                        yAxes: [{
                                            display: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: 'Gewicht in kg'
                                            }
                                        }]
                                    }
                                }
                            };

                            var ctx = document.getElementById("canvas").getContext("2d");
                            window.myLine = new Chart(ctx, config);


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
    app.controller('Test', ['$scope', '$cookies', '$routeParams', '$http', '$httpParamSerializerJQLike', '$location', function($scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike, $location) {
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
                $scope.loadData = function () {
                 $http.get('wp-json/wp/v2/checklists/?author=' + $scope.user.id).success(function(res){
                        $scope.checklists = res;

                        $scope.totalItems = res.length;
                        console.log("TOTAL: " + $scope.totalItems);

                    });
                };
                $scope.loadData();

                $http.get('/wp-json/wp/v2/checklists/' + $routeParams.id).success(function(res){
                    $scope.url = "http://newbie.local/wp-json/acf/v2/checklists/" + $routeParams.id;
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

        // Edit checklist button
        $scope.editPost = function(checklist) {
            document.getElementById('editPost').style.display = 'block';
            $scope.checklist = checklist;
            $scope.checklist.title = $scope.checklist.title.rendered;
            $scope.loadData();

        };

        // Update checklist
        $scope.updatePost = function() {
            $http({
                url: 'wp-json/wp/v2/checklists/' + $scope.checklist.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'),
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    title: $scope.checklist.title
                })
            }).then(function successCallback(response) {
                console.log(response);

                //$scope.checklists = response.data;
                $scope.loadData();

                document.getElementById('editPost').style.display = 'none';
                document.getElementById('responseMessage').innerHTML = 'Succesfuly updated checklist.' + $scope.checklist.id;


            }, function errorCallback(response) {
                console.log(response);
            });
        };

        // Edit checklist button
        $scope.addPostShow = function() {
            document.getElementById('addPost').style.display = 'block';
            var item = $( '#addPost' );
            item.find( 'input' ).val( '' );
        };

        // ADD checklist
        $scope.addPost = function() {
            $http({
                url: 'wp-json/wp/v2/checklists/?context=add&access_token=' + $cookies.get('wordpress_access_token'),
                method: "POST",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: $httpParamSerializerJQLike({
                    title: $scope.checklist.title,
                    status: 'publish'
                })
            }).then(function successCallback(res) {
                console.log(res);

                $scope.checklist = res.data;
                $scope.loadData();
                //$location.path('/test/' + res.data.id);


                document.getElementById('addPost').style.display = 'none';

            }, function errorCallback(response) {
                console.log(response);
            });
        };

        // delete checklist in detail
        $scope.deletePost = function(id) {
            $scope.checklist.id = id;
            $http({
                url: 'wp-json/wp/v2/checklists/' + $scope.checklist.id,
                method: "DELETE",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    id: $scope.checklist.id
                }
            }).then(function successCallback(res) {
                console.log(res);
                $location.path('/test');

            }, function errorCallback(res) {
                console.log(res);
            });
        };

        // delete checklist in repeater
        $scope.deletePostRepeater = function(checklist) {
            $scope.checklist = checklist;
            $http({
                url: 'wp-json/wp/v2/checklists/' + $scope.checklist.id,
                method: "DELETE",
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    id: $scope.checklist.id
                }
            }).then(function successCallback(res) {
                console.log(res);
                //location.reload();
                $scope.loadData();
            }, function errorCallback(res) {
                console.log(res);
            });
        };


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
/**
 * Created by neeltjechanterie on 17/11/16.
 */
;(function () {
    'use strict';

    //sayHello Directive for User information
    app.directive('sayHello', function(){
        return {
            restrict: 'AEC',
            templateUrl: myLocalized.views + 'say-hello.html',
            controller: ['WPService', function(WPService) {
                WPService.getCurrentUser();
            }]
        };
    });
    app.directive('checklist-header', function () {
        return {
            restrict: 'AEC',
            templateUrl: myLocalized.views + 'checklist-header.html',
            controller: 'Checklists'
        };

    });

})();
;(function () {
    'use strict';

function WPService($http) {

    var WPService = {
        categories: [],
        posts: [],
        pageTitle: 'Latest Posts:',
        currentPage: 1,
        totalPages: 1,
        currentUser: {}
    };


    WPService.getCurrentUser = function() {

        return $http.get('wp-json/wp/v2/users/me').success(function(res){
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
    };


    return WPService;
}

app.factory('WPService', ['$http', WPService]);

})();
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
                templateUrl: myLocalized.views + 'profile/user.html',
                controller: 'Main'
            })
            .when('/mom-weight/:id',{
                templateUrl: myLocalized.views + 'profile/weight.html',
                controller: 'Main'
            })
            .when('/baby-edit-picture/:id',{
                templateUrl: myLocalized.views + 'profile/baby-picture.php',
                controller: 'Main'
            })
            .when('/baby-settings/:id',{
                templateUrl: myLocalized.views + 'profile/baby-settings.php',
                controller: 'Main'
            })
            .when('/baby-body/:id',{
                templateUrl: myLocalized.views + 'profile/baby-body.php',
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