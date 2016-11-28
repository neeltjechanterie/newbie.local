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