/**
 * Created by neeltjechanterie on 17/11/16.
 */
var app = angular.module('app', ['ngRoute', 'ngSanitize', 'angularMoment', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngCookies', 'ngImageCache', 'ngFileUpload', 'ui.tinymce']);
app.run(function(amMoment) {
    amMoment.changeLocale('nl');
});
/**
 * Created by neeltjechanterie on 17/11/16.
 */
;(function () {
    'use strict';
    app.controller('EditUser', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout) {
        $http.get('wp-json/wp/v2/users/me').success(function(res){
            WPService.currentUser = res;

            $http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token'))
                .then(function successCallback(response) {

                    // second API call to get more details about the current user, e.g. capabilities
                    $http.get('/wp-json/wp/v2/users/' + response.data.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'))
                        .then(function successCallback(response) {
                            $scope.user = response.data;



                            // Update user
                            $scope.updateUser = function() {
                                $http({
                                    url: 'wp-json/wp/v2/users/' + $scope.user.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'),
                                    method: "POST",
                                    headers: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    data: $httpParamSerializerJQLike({
                                        email: $scope.user.email,
                                        description: $scope.user.description,
                                        first_name: $scope.user.first_name,
                                        last_name: $scope.user.last_name,
                                        nickname: $scope.user.nickname,
                                        username: $scope.user.username
                                    })
                                }).then(function successCallback(response) {
                                    console.log(response);

                                    //$scope.loadData();

                                    document.getElementById('editUser').style.display = 'none';
                                    document.getElementById('responseMessage').innerHTML = 'Succesfuly updated user.' + $scope.user.id;


                                }, function errorCallback(response) {
                                    console.log(response);
                                });
                            };


                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    $scope.user = response.data;


                }, function errorCallback(response) {
                    console.log(response);
                });

        });

        $scope.data = WPService;

    }]);
    app.controller('UserWeight', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', '$browser', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout, $browser) {
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

                            $scope.baseUrl = window.location.origin;
                            $scope.url =  $scope.baseUrl + "/wp-json/acf/v2/user/" + $routeParams.id;
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
    }]);
    app.controller('Main', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', '$browser', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout, $browser) {
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

                            var baseUrl = window.location.origin;
                            $scope.url =  baseUrl + "/wp-json/acf/v2/user/" + $routeParams.id;
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
    }]);
    app.controller('Test', ['$scope', '$cookies', '$routeParams', '$http', '$httpParamSerializerJQLike', '$location', '$route', function($scope, $cookies, $routeParams, $http, $httpParamSerializerJQLike, $location, $route) {
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

                     for( var i = 0; i < $scope.checklists.length; i++ ){
                         (function(checklist) {
                             $(document).on('click', ".cl-btn-"+checklist.id, function() {
                                 $(this).parent(".cl-title").parent(".cl-item").find('.settings-checklist').toggleClass("settings-display");
                                 // $(this).parent(".cl-title").parent(".cl-item").find('.settings-checklist').toggleClass("settings-display", 500, "easeOutBack");
                                 //$(this).parent(".cl-title").toggleClass("settings-display");
                                 console.log("click");
                             });
                         })($scope.checklists[i]);
                     }


                    });
                };
                $scope.loadData();

                $http.get('/wp-json/wp/v2/checklists/' + $routeParams.id).success(function(res){
                    $scope.baseUrl = window.location.origin;
                    $scope.url =  $scope.baseUrl + "/wp-json/acf/v2/checklists/" + $routeParams.id;
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
                document.getElementById('addPost').style.display = 'none';
                //$scope.loadData();
                $route.reload();
                //$location.path('/test/' + res.data.id);



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
                $location.path('/checklists');

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

    /*
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
*/

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


    app.controller('Child', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', '$browser', '$location', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout, $browser, $location) {
        $http.get('wp-json/wp/v2/users/me').success(function(res){
            WPService.currentUser = res;


            $http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token'))
                .then(function successCallback(response) {

                    // second API call to get more details about the current user, e.g. capabilities
                    $http.get('/wp-json/wp/v2/users/' + response.data.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'))
                        .then(function successCallback(response) {
                            console.log(response.data);
                            $scope.user = response.data;

                            var baseUrl = window.location.origin;
                            $scope.url =  baseUrl + "/wp-json/acf/v2/user/" + $routeParams.id;
                            console.log(response.data);

                            // CALCULATE BIRTHDAY (with amDifference in view)
                            //var thisDay = moment(new Date()).format('DD/MM/YYYY');
                            $scope.thisDay = moment(new Date());
                            console.log($scope.thisDay);

                            var formatBirthday = $scope.user.acf.birthday_child;
                            $scope.brithday = formatBirthday.split("-").reverse().join("/");


                            // SORT WEIGHT STATISTICS BY DATE
                            var weight_statistics = response.data.acf.baby_weight_statistics;
                            function sortByKey(array, key) {
                                return array.sort(function(a, b) {
                                    var x = a[key]; var y = b[key];
                                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                                });
                            }
                            var sort_weight_statistics = sortByKey(weight_statistics, 'weight_date');

                            var $last_weight_date = sort_weight_statistics.map(function(a) {return a.weight_date;});
                            var $last_weight_value = sort_weight_statistics.map(function(a) {return a.weight_number;});

                            // GET LAST DATE WITH WEIGHT
                            $scope.last_item_weight_date = $last_weight_date.pop();
                            $scope.last_item_weight = $last_weight_value.pop();
                            var last_item_weight = $scope.last_item_weight;
                            console.log(last_item_weight);


                            // SORT LENGTH STATISTICS BY DATE
                            var length_statistics = response.data.acf.baby_length_statistics;
                            function sortByKey(array, key) {
                                return array.sort(function(a, b) {
                                    var x = a[key]; var y = b[key];
                                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                                });
                            }
                            var sort_length_statistics = sortByKey(length_statistics, 'length_date');

                            var $last_length_date = sort_length_statistics.map(function(a) {return a.length_date;});
                            var $last_length_value = sort_length_statistics.map(function(a) {return a.length_number;});

                            // GET LAST DATE WITH LENGTH
                            $scope.last_item_length = $last_length_value.pop();
                            $scope.last_item_length_date = $last_length_date.pop();
                            var last_item_length = $scope.last_item_length;
                            console.log(last_item_length);

                            // CALCULATE BMI
                            var $lenght_value_m = last_item_length / 100;
                            $scope.bmi = (last_item_weight /  ($lenght_value_m * $lenght_value_m)).toFixed(2);
                            console.log($lenght_value_m);

                            $scope.loadData = function () {
                                $http.get('/wp-json/wp/v2/posts-child-profile/?author=' + $scope.user.id).success(function (res) {
                                    $scope.posts_child_profile = res;
                                    console.log(res);
                                });
                            };
                            $scope.loadData();


                            //get category by slug
                            $http.get('wp-json/wp/v2/posts-child-profile/' + $routeParams.id).success(function (res) {
                                $scope.post = res;
                                console.log(res);
                                console.log($routeParams.id);

                            }).error(function (res) {
                                console.log(res);

                            });

                            $scope.urlAdd =  baseUrl + "/wp-json/wp/v2/posts-child-profile/";
                            $scope.urlEdit =  baseUrl + "/wp-json/wp/v2/posts-child-profile/" + $routeParams.id;

                            // Edit checklist button
                            $scope.editPost = function() {
                                document.getElementById('editPost').style.display = 'block';
                                document.getElementById('contentPost').style.display = 'none';
                                $scope.post.title = $scope.post.title.rendered;
                                $scope.post.content = $scope.post.content.rendered;
                                $scope.loadData();

                                $scope.tinymceOptions = {
                                    selector: 'textarea',
                                    plugins: 'link image code',
                                    menubar: false,
                                    inline: false,
                                    skin: 'lightgray',
                                    theme : 'modern'
                                };
                            };



                            // Edit checklist button
                            $scope.addPostShow = function() {
                                document.getElementById('addPost').style.display = 'block';
                                var item = $( '#addPost' );
                                item.find( 'input' ).val( '' );
                            };

                            // delete checklist in detail
                            $scope.deletePost = function(id) {
                                $scope.post.id = id;
                                $http({
                                    url: 'wp-json/wp/v2/posts-child-profile/' + $scope.post.id,
                                    method: "DELETE",
                                    headers: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    data: {
                                        id: $scope.post.id
                                    }
                                }).then(function successCallback(res) {
                                    console.log(res);
                                    $location.path('/child');

                                }, function errorCallback(res) {
                                    console.log(res);
                                });
                            };


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
    }]);
    app.controller('ChildWeight', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', '$browser', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout, $browser) {
        $http.get('wp-json/wp/v2/users/me').success(function(res){
            WPService.currentUser = res;
            $scope.today = moment(new Date()).format("YYYY-MM-DD");

            $http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token'))
                .then(function successCallback(response) {

                    // second API call to get more details about the current user, e.g. capabilities
                    $http.get('/wp-json/wp/v2/users/' + response.data.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'))
                        .then(function successCallback(response) {
                            console.log(response.data);
                            $scope.user = response.data;

                            var baseUrl = window.location.origin;
                            $scope.url =  baseUrl + "/wp-json/acf/v2/user/" + $routeParams.id;
                            console.log(response.data);


                            // SORT WEIGHT STATISTICS BY DATE
                            var weight_statistics = response.data.acf.baby_weight_statistics;
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

                            // GET LAST DATE WITH WEIGHT
                            $scope.last_item_weight_date = $last_weight_date.pop();
                            $scope.last_item_weight = $last_weight_value.pop();
                            var last_item_weight_date = $scope.last_item_weight_date;
                            var last_item_weight = $scope.last_item_weight;
                            console.log(last_item_weight_date);
                            console.log(last_item_weight);

                            // GRAPH VALUES
                            var config = {
                                type: 'line',
                                data: {
                                    labels: $weight_date,
                                    datasets: [
                                        {
                                            label: "Gewicht kind",
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
                                        text:'Gewicht kind'
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

                            // GET GRAPH BY ID
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
    }]);
    app.controller('ChildLength', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', '$browser', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout, $browser) {
        $http.get('wp-json/wp/v2/users/me').success(function(res){
            WPService.currentUser = res;
            $scope.today = moment(new Date()).format("YYYY-MM-DD");
            $http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token'))
                .then(function successCallback(response) {

                    // second API call to get more details about the current user, e.g. capabilities
                    $http.get('/wp-json/wp/v2/users/' + response.data.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'))
                        .then(function successCallback(response) {
                            console.log(response.data);
                            $scope.user = response.data;

                            var baseUrl = window.location.origin;
                            $scope.url =  baseUrl + "/wp-json/acf/v2/user/" + $routeParams.id;
                            console.log(response.data);

                            // SORT LENGHT BY DATE
                            var length_statistics = response.data.acf.baby_length_statistics;
                            function sortByKey(array, key) {
                                return array.sort(function(a, b) {
                                    var x = a[key]; var y = b[key];
                                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                                });
                            }
                            var sort_length_statistics = sortByKey(length_statistics, 'length_date');
                            var $length_date = sort_length_statistics.map(function(a) {return a.length_date;});
                            var $length_value = sort_length_statistics.map(function(a) {return a.length_number;});

                            // GET LAST DATE LENGTH (if date not today in view > add button)
                            var $last_length_date = sort_length_statistics.map(function(a) {return a.length_date;});
                            var $last_length_value = sort_length_statistics.map(function(a) {return a.length_number;});

                            $scope.last_item_length = $last_length_value.pop();
                            $scope.last_item_length_date = $last_length_date.pop();

                            console.log($length_date);
                            console.log($length_value);

                            // GRAPH VALUES
                            var config = {
                                type: 'line',
                                data: {
                                    labels: $length_date,
                                    datasets: [
                                        {
                                            label: "Lengte kind",
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
                                            data: $length_value,
                                            spanGaps: false,
                                        }
                                    ]
                                },
                                options: {
                                    responsive: true,
                                    title:{
                                        display:true,
                                        text:'Lengte kind'
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
                                                labelString: 'Lengte in cm'
                                            }
                                        }]
                                    }
                                }
                            };

                            // GET GRAPH BY ID
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
    }]);

    app.controller('Dagboek', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', '$browser', '$location', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout, $browser, $location) {
        $http.get('wp-json/wp/v2/users/me').success(function(res){
            WPService.currentUser = res;


            $http.get('wp-json/wp/v2/users/me/?access_token=' + $cookies.get('wordpress_access_token'))
                .then(function successCallback(response) {

                    // second API call to get more details about the current user, e.g. capabilities
                    $http.get('/wp-json/wp/v2/users/' + response.data.id + '/?context=edit&access_token=' + $cookies.get('wordpress_access_token'))
                        .then(function successCallback(response) {
                            console.log(response.data);
                            $scope.user = response.data;

                            var baseUrl = window.location.origin;
                            $scope.url =  baseUrl + "/wp-json/wp/v2/dagboek" + $routeParams.id;
                            console.log(response.data);

                            // CALCULATE BIRTHDAY (with amDifference in view)
                            //var thisDay = moment(new Date()).format('DD/MM/YYYY');
                            //$scope.thisDay = moment(new Date());
                            //console.log($scope.thisDay);

                            //var formatBirthday = $scope.user.acf.birthday_child;
                            //$scope.brithday = formatBirthday.split("-").reverse().join("/");



                            $scope.loadData = function () {
                                $http.get('/wp-json/wp/v2/dagboek/?author=' + $scope.user.id).success(function (res) {
                                    $scope.dagboek = res;
                                    console.log(res);

                                    var monthNames = ["JAN", "FEB", "MAR", "APR", "MEI", "JUN",
                                        "JUL", "AUG", "SEP", "OKT", "NOV", "DEC"
                                    ];

                                    var items = $scope.dagboek;
                                    var i;
                                    for (i = 0; i < items.length; i++) {
                                        var dagboekDate = new Date(items[i].date);
                                        console.log("The current month is " + monthNames[dagboekDate.getMonth()]);
                                        $scope.month = monthNames[dagboekDate.getMonth()];
                                        $scope.day = dagboekDate.getDate();
                                    }

                                    $http.get('wp-json/wp/v2/tags?post=' + $routeParams.id).success(function (res) {
                                        $scope.tags = res;
                                        console.log(res);

                                    }).error(function (res) {
                                        console.log(res);
                                    });

                                });
                            };
                            $scope.loadData();


                            //get category by slug
                            $http.get('wp-json/wp/v2/dagboek/' + $routeParams.id).success(function (res) {
                                $scope.post = res;
                                console.log(res);
                                console.log($routeParams.id);

                                var monthNames = ["JANUARI", "FEBRUARI", "MAART", "APRIL", "MEI", "JUNI",
                                    "JULI", "AUGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DECEMBER"
                                ];

                                var postDate = new Date($scope.post.date);
                                console.log("The current month is " + monthNames[postDate.getMonth()]);
                                $scope.monthDetail = monthNames[postDate.getMonth()];
                                $scope.dayDetail = postDate.getDate();

                                $http.get('wp-json/wp/v2/tags?post=' + $routeParams.id).success(function (res) {
                                    $scope.tags = res;
                                    console.log(res);

                                }).error(function (res) {
                                    console.log(res);
                                });

                            }).error(function (res) {
                                console.log(res);

                            });

                            $scope.urlAdd =  baseUrl + "/wp-json/wp/v2/dagboek/";
                            $scope.urlEdit =  baseUrl + "/wp-json/wp/v2/dagboek/" + $routeParams.id;

                            // Edit checklist button
                            $scope.editPost = function() {
                                document.getElementById('editPost').style.display = 'block';
                                document.getElementById('contentPost').style.display = 'none';
                                $scope.post.title = $scope.post.title.rendered;
                                $scope.post.content = $scope.post.content.rendered;
                                $scope.loadData();

                                $scope.tinymceOptions = {
                                    selector: 'textarea',
                                    plugins: 'link image code',
                                    menubar: false,
                                    inline: false,
                                    skin: 'lightgray',
                                    theme : 'modern'
                                };
                            };

                            // Add button
                            // $scope.addPostShow = function() {
                            //     document.getElementById('addPost').style.display = 'block';
                            //     var item = $( '#addPost' );
                            //     item.find( 'input' ).val( '' );
                            // };

                            // delete checklist in detail
                            $scope.deletePost = function(id) {
                                $scope.post.id = id;
                                $http({
                                    url: 'wp-json/wp/v2/dagboek/' + $scope.post.id,
                                    method: "DELETE",
                                    headers: {
                                        'content-type': 'application/x-www-form-urlencoded'
                                    },
                                    data: {
                                        id: $scope.post.id
                                    }
                                }).then(function successCallback(res) {
                                    console.log(res);
                                    $location.path('/dagboek');

                                }, function errorCallback(res) {
                                    console.log(res);
                                });
                            };


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
    }]);
    app.controller('Tips', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', '$browser', '$location', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout, $browser, $location) {
        $scope.loadData = function () {
            $http.get('/wp-json/wp/v2/tips').success(function (res) {
                $scope.dagboek = res;
                console.log(res);

                $http.get('wp-json/wp/v2/categories?filter[type]=tips').success(function (res) {
                    $scope.categories = res;
                    console.log(res);

                }).error(function (res) {
                    console.log(res);
                });


            });
        };
        $scope.loadData();
    }]);
    app.controller('Gids', ['$scope', '$routeParams', '$http', 'WPService', '$httpParamSerializerJQLike', '$cookies', 'Upload', '$timeout', '$browser', '$location', function($scope, $routeParams, $http, WPService, $httpParamSerializerJQLike, $cookies, Upload, $timeout, $browser, $location) {
        $scope.loadData = function () {
            $http.get('/wp-json/wp/v2/gids').success(function (res) {
                $scope.gids = res;
                console.log(res);

                $http.get('wp-json/wp/v2/gids_cat').success(function (res) {
                    $scope.categories = res;
                    console.log(res);

                }).error(function (res) {
                    console.log(res);
                });


            });
        };
        $scope.loadData();
    }]);


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

    app.directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
        }]);

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
            .when('/dagboek', {
                templateUrl: myLocalized.views + 'dagboek/dagboek.html',
                controller: 'Dagboek'
            })
            .when('/dagboek/:id', {
                templateUrl: myLocalized.views + 'dagboek/dagboek-detail.html',
                controller: 'Dagboek'
            })
            .when('/tips', {
                templateUrl: myLocalized.views + 'info/tips.html',
                controller: 'Tips'
            })
            .when('/tips/:id', {
                templateUrl: myLocalized.views + 'info/tips-detail.html',
                controller: 'Tips'
            })
            .when('/gids', {
                templateUrl: myLocalized.views + 'info/gids.html',
                controller: 'Gids'
            })
            .when('/tips/:id', {
                templateUrl: myLocalized.views + 'info/gids-detail.html',
                controller: 'Gids'
            })
            .when('/category/:id/', {
                templateUrl: myLocalized.views + 'content-category.html',
                controller: 'Content'
            })
            .when('/blog/:slug/', {
                templateUrl: myLocalized.views + 'content.html',
                controller: 'Content'
            })
            // .when('/test/:id', {
            //     templateUrl: myLocalized.views + 'detail-checklist.html',
            //     controller: 'Checklists'
            // })
            // .when('/tests', {
            //     templateUrl: myLocalized.views + 'checklists.html',
            //     controller: 'Checklists'
            // })
            /*.when('/checklist/:slug/', {
                templateUrl: myLocalized.views + 'detail-checklist.html',
                controller: 'DetailChecklist'
            })*/
            .when('/timer', {
                templateUrl: myLocalized.views + 'timer.html'
            })
            .otherwise({templateUrl: myLocalized.views + '404.html'})
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