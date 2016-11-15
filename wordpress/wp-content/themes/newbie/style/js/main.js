jQuery(document).ready(function(e) {

    e(".btnTest").on("click",
        function() {
            console.log('Hello')
        });



    e(".navigation-toggle").on("click",
        function() {
            e("body").toggleClass("navigation-active")
        });

        // SERVICE CIRCLES
        function serviceCircleHeights() {
            var circleWidth = $(".user-profile > div").width();
            $(".user-profile > div").height( circleWidth + "px" );
        }
        ///// ON WINDOW LOAD /////
        $(window).load(function(){
            serviceCircleHeights();
        });

        ///// ON WINDOW RESIZE /////
        $(window).resize(function(){
            serviceCircleHeights();
        });


});


/*
$(document).on("click", ".btnNext", function() {

    //$('.nav-tabs > .active').next('.nav-item').find('.nav-link').trigger('click');
    $('.nav-tabs > .active').next('li').find('a').trigger('click');

    console.log("click next");

});
$(document).on("click", ".btnPrevious", function() {

    $('.nav-tabs > .active').prev('.nav-item').find('.nav-link').trigger('click');
    console.log("click prev");

});*/
