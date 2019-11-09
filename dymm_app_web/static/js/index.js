$(document).ready(function () {

    /*=========================================================================
    Import Modules
    =========================================================================*/
    AOS.init();
    let owl = $('.owl-carousel'),
        lang = window.navigator.language,
        topBtn = $("#btn-top"),
        _navBar = $(".nav-bar"),
        _sectionA = $("#section-a"),
        _sectionB = $("#section-b"),
        _sectionC = $("#section-c");

    owl.owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        video: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true
            },
            600: {
                items: 3,
                nav: false
            },
            1000: {
                items: 5,
                nav: true,
                loop: false
            }
        }
    });

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topBtn.css('display', 'block')
        } else {
            topBtn.css('display', 'none')
        }
    };

    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    if (lang === 'ko-KR' || lang === 'ko') {

    } else {
        console.log(lang);
    }

    /*=========================================================================
    Private methods for Tag Application
    =========================================================================*/
    let _nav = {
        btn: function () {
        }
    };

    _nav.btn.prototype.btnATapped = function () {
        console.log("btn-a Tapped!");
        $('html, body').animate({
            scrollTop: (_sectionC.offset().top)
        }, 500);
    };
    _nav.btn.prototype.btnBTapped = function () {

    };

    /*=========================================================================
    Event delegation map
    =========================================================================*/
    topBtn.click(function () {
        topFunction()
    });
    _navBar.on(
        "click",
        "#nav-btn-a, #nav-btn-b",
        function (e) {
            let _currEle = $(this);
            if (_currEle.is("#nav-btn-a")) {
                _nav.btn.prototype.btnATapped()
            } else if (_currEle.is("#nav-btn-b")) {
                _nav.btn.prototype.btnBTapped()
            }
        });

});