jQuery(document).ready(function ($) {


    $(window).bind("load", function () {
        sizeup();
    });
    $(window).resize(function () {
        sizeup();
    });

    function sizeup() {
        $('#zipform').css('top', ($(window).height() / 2) - ($('#zipform').outerHeight() / 2));
    }

    $("#sendzip").keyup(function (event) {
        if (event.keyCode == 13) {
            $("#sendzip").click();
        }
    });

    


});
