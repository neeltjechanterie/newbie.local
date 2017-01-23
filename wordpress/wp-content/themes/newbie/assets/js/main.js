jQuery(document).ready(function(e) {

    e(".btnTest").on("click",
        function() {
            console.log('Hello');
            alert( "Alert" );
        });


    e(".navigation-toggle").on("click",
        function() {
            e("body").toggleClass("navigation-active");
            console.log("click");
        });


   /* e(".navigation-edit-toggle").on("click",
        function() {
            e("article").toggleClass("settings-navigation-active");
            console.log('Hello')
        });*/
    $(document).on('click', '.navigation-edit-toggle', function() {
        e("article").toggleClass("settings-navigation-active");
        //e("body").toggleClass("navigation-active");

    });
    // $(document).on('click', '.settings-cl-btn', function() {
    //     e(".settings-checklist").toggleClass("settings-display");
    //     //e("body").toggleClass("navigation-active");
    //     console.log("click");
    //
    // });

    // JS CIRCLES
    function serviceCircleHeights() {
        var circleWidth = $(".user-profile > div").width();
        $(".user-profile > div").height( circleWidth + "px" );
    }
    function timerCircleHeights() {
        var circleTimerWidth = $("#stopwatch").width();
        $("#stopwatch").height( circleTimerWidth + "px" );
    }
    function babyHeights() {
        var babyWidth = $(".baby-wrapper").width();
        $(".baby-wrapper").height( babyWidth + "px" );
    }
    ///// ON WINDOW LOAD /////
    $(window).load(function(){
        serviceCircleHeights();
        timerCircleHeights();
        babyHeights();
    });

    ///// ON WINDOW RESIZE /////
    $(window).resize(function(){
        serviceCircleHeights();
        timerCircleHeights();
        babyHeights();
    });

    var iScrollPos = 0;

    $(window).scroll(function () {
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > iScrollPos) {
            $( ".user-profile img" ).css( {"bottom": "-2%", "transition": ".5s" });
        } else {
            $( ".user-profile.baby img" ).css( "bottom", "-35%" );
            $( ".user-profile.mom img" ).css( "bottom", "-25%" );

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
