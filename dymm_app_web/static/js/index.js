$(document).ready(function () {

    /*=========================================================================
    Import Modules
    =========================================================================*/
    AOS.init();
    let _f = $.base.method,
        _u = $.base.url,
        owl = $('.owl-carousel'),
        lang = window.navigator.language,
        topBtn = $("#btn-top"),
        _navBar = $(".nav-bar"),
        _sectionA = $(".section-a"),
        _sectionB = $(".section-b"),
        _sectionC = $(".section-c");

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

    let langStored = Cookies.getJSON('dymm_client_lang');
    if (langStored === undefined) {
        if (lang !== 'ko-KR') {
            lang = 'en-US'
        }
        Cookies.set('dymm_client_lang', lang, {
            expires: 30
        })
    }

    window.onscroll = function () {
        let curScrollPos = window.pageYOffset,
            sectionBTop = _sectionB.offset().top,
            sectionCTop = _sectionC.offset().top;

        if (curScrollPos > 40) {
            topBtn.css('display', 'block')
        } else {
            topBtn.css('display', 'none')
        }

        if (curScrollPos > (sectionBTop - 300) &&
            (curScrollPos < (sectionBTop - 10))) {
            if (_sectionB.is(".off")) {
                return false
            }
            $('html, body').animate({
                scrollTop: (_sectionB.offset().top)
            }, 500);
            _sectionB.removeClass("on").addClass("off");
        }

        if (curScrollPos > (sectionCTop - 300) &&
            (curScrollPos < (sectionCTop - 10))) {
            if (_sectionC.is(".off")) {
                return false
            }
            $('html, body').animate({
                scrollTop: (_sectionC.offset().top)
            }, 500);
            _sectionC.removeClass("on").addClass("off");
        }

        if (curScrollPos < (sectionCTop - 300)) {
            _sectionC.removeClass("off").addClass("on");
        }

        if (curScrollPos < (sectionBTop - 300)) {
            _sectionB.removeClass("off").addClass("on");
            _sectionC.removeClass("off").addClass("on");
        }
    };

    function topFunction() {
        $('html, body').animate({
            scrollTop: ($('#content').offset().top)
        }, 500);
    }

    /*=========================================================================
    Private methods for Tag Application
    =========================================================================*/
    let _nav = {
        btn: function () {
        }
    };

    _nav.btn.prototype.btnATapped = function () {
        $('html, body').animate({
            scrollTop: (_sectionB.offset().top)
        }, 500);
    };
    _nav.btn.prototype.btnBTapped = function () {
        $('#overlay').fadeIn(300);
    };
    _nav.btn.prototype.popupCloseTapped = function () {
        $('#overlay').fadeOut(300);
    };
    _nav.btn.prototype.dropASelected = function () {
        if (langStored === 'en-US') {
            return false
        }
        Cookies.remove('dymm_client_lang');
        Cookies.set('dymm_client_lang', 'en-US', {
            expires: 30
        });
        location.reload();
    };
    _nav.btn.prototype.dropBSelected = function () {
        if (langStored === 'ko-KR') {
            return false
        }
        Cookies.remove('dymm_client_lang');
        Cookies.set('dymm_client_lang', 'ko-KR', {
            expires: 30
        });
        location.reload();
    };

    /*=========================================================================
    Event delegation map
    =========================================================================*/
    topBtn.click(function () {
        topFunction()
    });
    _navBar.on(
        "click",
        "#nav-btn-a, #nav-btn-b, #drop-a, #drop-b, #popup-close",
        function (e) {
            let _currEle = $(this);
            if (_currEle.is("#nav-btn-a")) {
                _nav.btn.prototype.btnATapped()
            } else if (_currEle.is("#nav-btn-b")) {
                _nav.btn.prototype.btnBTapped()
            } else if (_currEle.is("#drop-a")) {
                _nav.btn.prototype.dropASelected()
            } else if (_currEle.is("#drop-b")) {
                _nav.btn.prototype.dropBSelected()
            } else if (_currEle.is("#popup-close")) {
                _nav.btn.prototype.popupCloseTapped()
            }
        });

});