# canvas-demo
画布
url：https://university-notes.github.io/canvas-demo/NBA-battle/
1.Ajax请求外部json数据；
getHTTPObject: function () {
        if (typeof XMLHttpRequest == "undefined")
            XMLHttpRequest = function () {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                }
                catch (e) {
                }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                }
                catch (e) {
                }
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e) {
                }
                return false;
            }
        return new XMLHttpRequest();
    },
2.border-radius的巧用，画圆，画半圆等；
