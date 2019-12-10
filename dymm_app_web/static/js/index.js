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
        _sectionC = $(".section-c"),
        _sectionD = $(".section-d");

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
                items: 6,
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
            sectionCTop = _sectionC.offset().top,
            sectionDTop = _sectionD.offset().top;

        if (curScrollPos > 40) {
            topBtn.css('display', 'block')
        } else {
            topBtn.css('display', 'none')
        }

        if (curScrollPos > (sectionBTop - 400) &&
            (curScrollPos < (sectionBTop - 10))) {
            if (_sectionB.is(".off")) {
                return false
            }
            $('html, body').animate({
                scrollTop: (_sectionB.offset().top)
            }, 500);
            _sectionB.removeClass("on").addClass("off");
        }

        if (curScrollPos > (sectionCTop - 400) &&
            (curScrollPos < (sectionCTop - 10))) {
            if (_sectionC.is(".off")) {
                return false
            }
            $('html, body').animate({
                scrollTop: (_sectionC.offset().top)
            }, 500);
            _sectionC.removeClass("on").addClass("off");
        }

        if (curScrollPos > (sectionDTop - 400) &&
            (curScrollPos < (sectionDTop - 10))) {
            if (_sectionD.is(".off")) {
                return false
            }
            $('html, body').animate({
                scrollTop: (_sectionD.offset().top)
            }, 500);
            _sectionD.removeClass("on").addClass("off");
        }

        if (curScrollPos < (sectionDTop - 400)) {
            _sectionD.removeClass("off").addClass("on");
        }

        if (curScrollPos < (sectionBTop - 400)) {
            _sectionB.removeClass("off").addClass("on");
            _sectionC.removeClass("off").addClass("on");
        }

        if (curScrollPos < (sectionCTop - 400)) {
            _sectionC.removeClass("off").addClass("on");
            _sectionD.removeClass("off").addClass("on");
        }
    };

    function topFunction() {
        $('html, body').animate({
            scrollTop: ($('#content').offset().top)
        }, 500);
    }

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
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
        let _popup = $("#popup");
        if (_popup.is(".off")) {
            _popup.show();
            _popup.removeClass("off").addClass("on");
        }
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
    _nav.btn.prototype.submitContact = function (currEle) {
        let _form = currEle.parent(),
            _formData = _form.serialize(),
            _loadingImg = $("img.popup-loading"),
            _popup = $("#popup"),
            _inputName = _form.find("#name"),
            _inputEmail = _form.find("#email"),
            _inputMsg = _form.find("#message");

        if (_inputName.val().length <= 0) {
            return false
        } else if (_inputEmail.val().length <= 0 ||
            !isEmail(_inputEmail.val())) {
            return false
        } else if (_inputMsg.val().length <= 0) {
            return false
        }

        _loadingImg.show();
        if (_popup.is(".on")) {
            _popup.hide();
            _popup.removeClass("on").addClass("off");
        }
        $.post("/contact", _formData)
            .done(function (response, textStatus, jqXHR) {
                alert(response.message);
                _nav.btn.prototype.popupCloseTapped();
                _loadingImg.hide();
                _inputName.val('');
                _inputEmail.val('');
                _inputMsg.val('');
            })
            .fail(function (response) {
                _f.alertFailResponse(response);
            });
    };

    /*=========================================================================
    Event delegation map
    =========================================================================*/
    topBtn.click(function () {
        topFunction()
    });
    _navBar.on(
        "click",
        "#nav-btn-a, #nav-btn-b, #drop-a, #drop-b, #popup-close, #submit",
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
            } else if (_currEle.is("#submit")) {
                _nav.btn.prototype.submitContact(_currEle)
            }
        });

});