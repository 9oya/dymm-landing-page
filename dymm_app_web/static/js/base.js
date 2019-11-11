$(document).ready(function () {
    /*=========================================================================
    Javascript Extensions
    =========================================================================*/
    String.prototype.format = function () {
        let formatted = this;
        for (let arg in arguments) {
            formatted = formatted.replace("{" + arg + "}", arguments[arg]);
        }
        return formatted;
    };

    /*=========================================================================
    jQuery Extensions
    =========================================================================*/
    $.each(["put", "delete"], function (i, method) {
        $[method] = function (url, data, callback, type) {
            if ($.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }
            return $.ajax({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            });
        };
    });
    $.fn.serializeIncludeDisabled = function () {
        let disabled = this.find(":input:disabled").removeAttr("disabled");
        let serialized = this.serialize();
        disabled.attr("disabled", "disabled");
        return serialized;
    };

    /*=========================================================================
    Public properties
    =========================================================================*/
    let _url = {
            api: {
                admin: "/api/admin",
                asset: "/api/asset",
                avatar: "/api/avatar",
                tag: "/api/tag",
                banner: "/api/banner"
            },
            view: {
                home: "/home",
                signIn: "/admin/sign-in",
                signUp: "/admin/sign-up",
                tag: "/tag"
            }
        },
        _message = {
            error: {
                notFound: "The requested resource is not available: 404",
                methodErr: "405 Method Not Allowed",
                server: "Internal server error: 500",
                network: "Network with server failed. \nPleas check your " +
                    "Wi-Fi or network status."
            }
        },
        _code = {
            expiredToken: "expired-token"
        },
        _alertFailResponse = function (response) {
            if (response.status === 400) {
                alert(response.responseJSON.message);
            } else if (response.status === 401) {
                alert(response.responseJSON.message);
            } else if (response.status === 403) {
                if (response.responseJSON.code === _code.expiredToken) {
                    location.assign(_url.view.signIn);
                    return
                }
                alert(response.responseJSON.message);
            } else if (response.status === 404) {
                alert(_message.error.notFound);
            } else if (response.status === 405) {
                alert(_message.error.methodErr);
            } else if (response.status === 500) {
                alert(_message.error.server);
            } else {
                alert(_message.error.network);
            }
        },
        _htmlFailResponse = function (response, msgEle) {
            if (response.status === 400) {
                msgEle.text(JSON.stringify(
                    response.responseJSON.message, null, "\t")
                );
            } else if (response.status === 401) {
                msgEle.text(JSON.stringify(
                    response.responseJSON.message, null, "\t")
                );
            } else if (response.status === 403) {
                if (response.responseJSON.code === _code.expiredToken) {
                    location.assign(_url.view.signIn);
                    return
                }
                msgEle.text(JSON.stringify(
                    response.responseJSON.message, null, "\t")
                );
            } else if (response.status === 404) {
                alert(_message.error.notFound);
            } else if (response.status === 405) {
                alert(_message.error.methodErr);
            } else if (response.status === 500) {
                alert(_message.error.server);
            } else {
                alert(_message.error.network);
            }
        }
    $.base = {
        url: _url,
        message: _message,
        code: _code,
        method: {
            alertFailResponse: _alertFailResponse,
            htmlFailResponse: _htmlFailResponse
        }
    };
});