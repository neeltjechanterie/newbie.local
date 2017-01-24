jQuery(document).ready(function($) {
    // Prevent jQuery UI dialog from blocking focusin
    $(document).on('focusin', function(e) {
        if ($(e.target).closest(".mce-window, .moxman-window").length) {
            e.stopImmediatePropagation();
        }
    });
    // Prevent Bootstrap dialog from blocking focusin
    $(document).on('focusin', function(e) {
        if ($(e.target).closest(".mce-window").length) {
            e.stopImmediatePropagation();
        }
    });

    $(".btnTest").on("click",
        function() {
            console.log('Hello');
            alert( "Alert" );
        });


    $(".navigation-toggle").on("click",
        function() {
            $("body").toggleClass("navigation-active");
            console.log("click");
        });


   /* e(".navigation-edit-toggle").on("click",
        function() {
            e("article").toggleClass("settings-navigation-active");
            console.log('Hello')
        });*/
    $(document).on('click', '.navigation-edit-toggle', function() {
        $("article").toggleClass("settings-navigation-active");
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
        $('.baby-wrapper').each(function() {
            $(this).height( babyWidth + "px");
        });
    }
    function babyHeightsContainer() {
        var babyWidth = $(".baby-container").width();
        $(".baby-container").height( babyWidth + "px" );
        $(".test").height( babyWidth + "px" );

    }
    ///// ON WINDOW LOAD /////
    $(window).load(function(){
        serviceCircleHeights();
        timerCircleHeights();
        babyHeights();
        babyHeightsContainer();
    });

    ///// ON WINDOW RESIZE /////
    $(window).resize(function(){
        serviceCircleHeights();
        timerCircleHeights();
        babyHeights();
    });

    $(window).scroll(function(){
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