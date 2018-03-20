//监听事件
function addEvent(ele, myEvent, callback) { //添加监听事件//addEvevt(obox,"click",fn1);
	if(ele.addEventListener) {
		ele.addEventListener(myEvent, callback, false);
	} else if(ele.attachEvent) {
		ele.attachEvent("on" + myEvent, callback);
	} else {
		ele["on" + myEvent] = callback;
	}
}

function removeEvent(ele, myEvent, callback) { //删除监听事件// removeEvent(obox,"click",fn2)
	if(ele.removeEventListener) {
		ele.removeEventListener(myEvent, callback, false);
	} else if(ele.detachEvent) {
		ele.detachEvent("on" + myEvent, callback);
	} else {
		ele["on" + myEvent] = null;
	}
}

//获取元素
function getId(id) { //获取ID//var obox=mybao.getId("box");
	return document.getElementById(id);
}

function getClass(cla) {
	return document.getElementsByClassName(cla);
}

//cookie的封装
//设置cookie
function setCookie(name, value, t) { //name 必须是字符串
	var d = new Date();
	d.setDate(d.getDate() + t);
	document.cookie = name + "=" + value + ";expires=" + d;
}
//获取cookie
function getCookie(name) {
	var str = document.cookie;
	var arr = str.split("; ");
	var newArr = [];
	for(var i = 0; i < arr.length; i++) {
		newArr.push(arr[i].split("="));
	}
	for(var i = 0; i < newArr.length; i++) {
		if(name == newArr[i][0]) {
			return newArr[i][1];
		}
	}
}

//	删除cookie
function removeCookie(name) {
	setCookie(name, "123", -1);
}

//拖拽窗口
function movebox(id) {
	var obox = document.getElementById("box");
	var screenW = document.documentElement.clientWidth || document.body.clientWidth;
	var screenH = document.documentElement.clientHeight || document.body.clientHeight;

	//先按下鼠标
	obox.onmousedown = function(eve) {
		var e = eve || window.event;
		var disX = e.offsetX;
		var disY = e.offsetY;
		//移动鼠标
		document.onmousemove = function(eve) {
			var e = eve || window.event;
			//将元素的left设置为，移动时的page坐标减去按下时获取到的鼠标在元素身上的坐标
			var l = e.pageX - disX;
			var t = e.pageY - disY;

			if(l < 0) {
				l = 0;
			}
			if(l > screenW - obox.offsetWidth) {
				l = screenW - obox.offsetWidth;
			}
			if(t < 0) {
				t = 0;
			}
			if(t > screenH - obox.offsetHeight) {
				t = screenH - obox.offsetHeight
			}

			obox.style.left = l + "px";
			obox.style.top = t + "px";
		}
		//松开鼠标
		obox.onmouseup = function() {
			document.onmousemove = null;
		}
	}
}

//随机色
function randc() {
	var r = Math.round(Math.random() * 255).toString(16); //16进制随机数r
	var g = Math.round(Math.random() * 255).toString(16); //16进制随机数g
	var b = Math.round(Math.random() * 255).toString(16); //16进制随机数b
	return "#" + Zero(r) + Zero(g) + Zero(b);
}
//补零
function Zero(i) {
	if(i < 10 || i.length == 1) {
		return i = "0" + i;
	} else {
		return i = "" + i;
	}
}