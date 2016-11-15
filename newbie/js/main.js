jQuery(document).ready(function(e) {
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
            $( ".user-profile" ).css( "bottom", "-35%" );
        }
        iScrollPos = iCurScrollPos;
    });

    $('.btnNext').click(function(){
        $('.nav-tabs > .active').next('li').find('a').trigger('click');
    });

    $('.btnPrevious').click(function(){
        $('.nav-tabs > .active').prev('li').find('a').trigger('click');
    });
});
