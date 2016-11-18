/**
 * Created by neeltjechanterie on 17/11/16.
 */
;(function () {
    'use strict';

    //sayHello Directive for User information
    app.directive('sayHello', function(){
        return {
            restrict: 'EA',
            templateUrl: myLocalized.views + 'say-hello.html',
            controller: ['WPService', function(WPService) {
                WPService.getCurrentUser();
            }]
        };
    });

})();