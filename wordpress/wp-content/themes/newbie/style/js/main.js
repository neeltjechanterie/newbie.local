jQuery(document).ready(function(e) {
    e(".navigation-toggle").on("click",
        function() {
            e("body").toggleClass("navigation-active")
        })

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
