/**
 * Created by neeltjechanterie on 17/11/16.
 */
var app = angular.module('app', ['ngRoute', 'ngSanitize', 'angularMoment', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'ngCookies', 'ngImageCache']);
app.run(function(amMoment) {
    amMoment.changeLocale('nl');
});