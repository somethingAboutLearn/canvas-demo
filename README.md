# canvas-demo
## 画布
url：https://somethingaboutlearn.github.io/canvas-demo/

* Ajax请求外部json数据；


	``` javascript
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
	}
	getSchedule: function () {
		var request = getHTTPObject();
		if (request) {
			request.open("GET", "match.json", true);
			request.onreadystatechange = function () {}
			request.send(null);
		} else {
			alert("Sorry, your browser doesn\'t support XMLHttpRequest");
		}
	}
	```

* border-radius的巧用，画圆，画半圆等；

	``` css
	/*上半圆*/
	.top {
		width: 100px;/*宽度为高度的2倍*/
		height: 50px;
		border-radius: 50px 50px 0 0;/*圆角半径为高度的值*/
	}
	/*右半圆*/
	.right {
		height: 100px;/*高度为宽度的2倍*/
		width: 50px;
		border-radius: 0 50px 50px 0;/*圆角半径为宽度的值*/
	}
	/*下半圆*/
	.bottom {
		width: 100px;/*宽度为高度的2倍*/
		height: 50px;
		border-radius: 0 0 50px 50px;/*圆角半径为高度的值*/
	}
	/*左半圆*/
	.left {
		width: 50px;
		height: 100px;/*高度为宽度的2倍*/
		border-radius: 50px 0 0 50px;/*圆角半径为宽度的值*/
	}
	```

* canvas不支持IE8(包括)以下的浏览器；
* classList不支持IE10以下的版本；
* getElementsByClassName()不支持IE9以下的版本；
