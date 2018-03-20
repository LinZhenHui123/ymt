$.extend({
	nav: function() {
		$("#categoryMenu").on("mouseenter", function() {
			$(this).siblings(".category-box").stop().css("opacity", "1").children(".category-downlist").stop().css("display", "block");

		})
		$(".category-box").on("mouseenter", function() {
			$(this).stop().css("opacity", "1").children(".category-downlist").stop().css("display", "block");

		})

		$("#categoryMenu").on("mouseleave", function() {
			$(this).siblings(".category-box").stop().css("opacity", "0").children(".category-downlist").stop().css("display", "none");
		})
		$(".category-box").on("mouseleave", function() {
			$(this).stop().css("opacity", "0").children(".category-downlist").stop().css("display", "none");
		})
	}
})
$.extend({
	search: function() {
		$(".search").on("click", function() {

		})
	}
});

$(".banner").banner({
	img: $(".imgbox").children("img"),
	left: $(".prev1"),
	right: $(".next1"),
	autoPlay: true
});

var posterTvGrid = new posterTvGrid('posterTvGrid', {
	className: "posterTvGrid"
}, [{
		"img": "http://pic1.ymatou.com/G02/M08/47/D5/CgvUBVqhBvCAa1BpAAFdirEoATY08_28_13_w_o.jpeg",
		"title": "",
		"url": "#"
	},
	{
		"img": "http://pic1.ymatou.com/G02/M02/29/E8/CgvUBFqdLlSAGjgXAAIpUhT4mNQ14_28_13_w_o.jpeg",
		"title": "",
		"url": "#"
	},
	{
		"img": "http://pic1.ymatou.com/G02/M0A/25/22/CgvUA1qdLcyAfpz_AAHvLtMtMxM07_28_13_w_o.jpeg",
		"title": "",
		"url": "#"
	},
	{
		"img": "http://pic1.ymatou.com/G02/M01/25/23/CgvUA1qdLgqAWC-SAAHSvVZGMnA70_28_13_w_o.jpeg",
		"title": "",
		"url": "#"
	},
	{
		"img": "http://pic1.ymatou.com/G02/M05/2C/0A/CgvUBVqdLa-ADTxtAAI1kcvW_DA73_28_13_w_o.jpeg",
		"title": "",
		"url": "#"
	}
]);

function GoodList(nav, a, b) {
	var that = this;
	this.nav = nav;
	this.a = a;
	$.ajax({
		url: "http://datainfo.duapp.com/shopdata/getGoods.php",
		dataType: "jsonp",
		linenumber: this.a,
	}).then(function(res) {
		var str = "";
		var sstr = "";
		for(let i = 0; i < a; i++) {
			str +=
				`<li class = "product-item">
				<a title = "${res[i].goodsName}" class = "product-img" >
				<img class ="lazy"src="${res[i].goodsListImg}" alt = "${res[i].goodsName}"/>
				<a href = "#"title = "${res[i].goodsName}" >
				<p class = "name lineClamp2" > ${res[i].goodsName} < /p> 
				</a>
				<p class = "price" > <em class = "unit" > ¥ </em > ${res[i].price} </p >
				</li>`
		}
		for(var i = 0; i < b; i++) {
			sstr += str;
		}
		//			console.log(that.nav)
		$(that.nav).html(sstr);
	})
}

new GoodList(".product-list", 4, 1);
new GoodList(".cai", 10, 10);

// 倒计时
function leftTimer(year, month, day, hour, minute, second) {
	var leftTime = (new Date(year, month - 1, day, hour, minute, second)) - (new Date()); //计算剩余的毫秒数 
	var days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数 
	var hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时 
	var minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟 
	var seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数 
	days = checkTime(days);
	hours = checkTime(hours);
	minutes = checkTime(minutes);
	seconds = checkTime(seconds);
	setInterval("leftTimer(2019,11,11,11,11,11)", 1000);
	//document.getElementById("timer").innerHTML = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒"; 
	$(".hours").html(hours);
	$(".minutes").html(minutes);
	$(".seconds").html(seconds);
}

function checkTime(i) { //将0-9的数字前面加上0，例1变为01 
	if(i < 10) {
		i = "0" + i;
	}
	return i;
}
leftTimer();

function loadMore(id) {
	var i = 10;
	$(id).on("click", function() {
		i++;
		new GoodList(".cai", 10, i);
	})
}
new loadMore(".loading-more")

function Cookie() {
	var c = window.location.href.split("?")[1];
	if(c != undefined) {
		setCookie("name", c);
	}
	var cook = "";
	if (document.cookie.split("=")[0]==name) {
		cook = document.cookie.split("=")[1];
		console.log(cook)
		if(cook) {
			$(".on").css("display", "none");
			$(".off").css("display", "block");
			$(".off").html(cook + "<a id='tuichu' style='display: none;'>退出</a>");
		}
	}
}
new Cookie();
