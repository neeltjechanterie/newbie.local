jQuery(document).ready(function(e) {

    e(".btnTest").on("click",
        function() {
            console.log('Hello')
        });

    e(".navigation-toggle").on("click",
        function() {
            e("body").toggleClass("navigation-active")
        });

    // JS CIRCLES
    function serviceCircleHeights() {
        var circleWidth = $(".user-profile > div").width();
        $(".user-profile > div").height( circleWidth + "px" );
    }
    function timerCircleHeights() {
        var circleTimerWidth = $("#stopwatch").width();
        $("#stopwatch").height( circleTimerWidth + "px" );
    }
    ///// ON WINDOW LOAD /////
    $(window).load(function(){
        serviceCircleHeights();
        timerCircleHeights();
    });

    ///// ON WINDOW RESIZE /////
    $(window).resize(function(){
        serviceCircleHeights();
        timerCircleHeights();
    });

    var iScrollPos = 0;

    $(window).scroll(function () {
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > iScrollPos) {
            $( ".user-profile" ).css( {"bottom": "-2%", "transition": ".5s" });
        } else {
            $( ".user-profile.baby" ).css( "bottom", "-35%" );
            $( ".user-profile.mom" ).css( "bottom", "-25%" );

        }
        iScrollPos = iCurScrollPos;
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
