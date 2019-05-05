/**
 * Created by fuzl on 2018-12-3.
 */
'use strict';
/* eslint-disable */
(function(){
    var urlParams = {};
    var search = window.location.search.slice(1);
    var args = search.split("&");
    for (var i = 0; i < args.length; i ++) {
        var arg = args[i];
        if (arg) {
            var kv = arg.split("=");
            var value = kv[1];
            urlParams[kv[0]] = value == null ? "" : window.decodeURIComponent(value);
        }
    }
    var token = urlParams["sso-epctoken"];
    if (token) {
        var expires = new Date();
        expires.setDate(expires.getDate() + 30);
        window.document.cookie = "sso-epctoken=" + window.encodeURIComponent(token) + "; expires=" + expires.toUTCString() + "; path=/";
    }
})();