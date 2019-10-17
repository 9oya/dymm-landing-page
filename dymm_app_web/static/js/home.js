$(document).ready(function () {

    !(function () {
        $("#bx-home-first").show(400, function () {
            $("#img-screen-1").show("slow", function () {
                $("#img-screen-2").show("slow", function () {
                    $("#img-screen-3").show("slow", function () {
                        $("#bx-home-second").show("slow", function () {
                            $("#bx-home-second").show("slow");
                            $("#bx-home-third").show("slow");
                            $("#footer").show("slow")
                        })
                    });
                });
            });
        })
    })();
});