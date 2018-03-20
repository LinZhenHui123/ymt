//1.自主开发插件的准备工作
;
(function($) {
	"use strict";
	$.fn.banner = function(options) {
		//		开辟一个空间,专门用来存放需要用到的属性
		this.LOCAL = {
			//离开的图片的索引
			iPrev: options.img.length - 1,
			//小标的当前索引和要出来的图片的索引
			index: 0
		}

		var that = this;

		//策略模式；判断用户是否传入左右按钮
		if(typeof options.left == "object" && options.left.length != 0 && typeof options.right == "object" && options.right.length != 0) {
			//左按钮的点击事件
			options.left.on("click", function() {
				//改变索引
				that.LOCAL.changeIndex("left")
				//图片运动
				that.LOCAL.move(that.LOCAL.index, that.LOCAL.iPrev, -1);
				//小标的当前项的更改
				that.LOCAL.active(that.LOCAL.index);
			})
			options.right.on("click", function() {
				//				that.LOCAL.changeIndex("right");
				that.LOCAL.changeIndex("right")

				that.LOCAL.move(that.LOCAL.index, that.LOCAL.iPrev, 1);

				that.LOCAL.active(that.LOCAL.index);
			})
		}

				this.LOCAL.changeIndex = function(dir) {
					if(dir == "left") {
						if(that.LOCAL.index == 0) {
							that.LOCAL.index = options.img.length - 1;
							that.LOCAL.iPrev = 0;
						} else {
							that.LOCAL.index--;
							that.LOCAL.iPrev = that.LOCAL.index + 1;
						}
					} else {
						if(that.LOCAL.index == options.img.length - 1) {
							that.LOCAL.index = 0;
							that.LOCAL.iPrev = options.img.length - 1;
						} else {
							that.LOCAL.index++;
							that.LOCAL.iPrev = that.LOCAL.index - 1;
						}
					}
				}

		//封装的运动的方法
		this.LOCAL.move = function(now, prev, num) {
			options.img.eq(now).css({
				left: options.img.eq(0).width() * num
			}).stop(false, true).animate({
				left: 0
			})
			options.img.eq(prev).stop(false, true).animate({
				left: options.img.eq(0).width() * -num
			})
		}

		//封装的改变小标的当前项的方法
		this.LOCAL.active = function(index) {
			if(typeof options.items == "object" && options.items.length != 0) {
				options.items.eq(index).css({
					background: "red"
				}).siblings().css({
					background: "rgba(100,100,100,0.5)"
				})
			}

		}

		//策略模式：判断用户是否传入小按钮
		if(typeof options.items == "object" && options.items.length != 0) {
			//默认第一个小按钮为当前
			options.items.eq(0).css({
				background: "red"
			})
			//给小按钮添加点击事件
			options.items.on("click", function() {
				//点击之后，将当前索引，存放在下一个变量中
				that.LOCAL.iNext = $(this).index();

				//让图片运动，改变小按钮的当前项
				if(that.LOCAL.index < that.LOCAL.iNext) {

					that.LOCAL.move(that.LOCAL.iNext, that.LOCAL.index, 1)

				}
				if(that.LOCAL.index > that.LOCAL.iNext) {

					that.LOCAL.move(that.LOCAL.iNext, that.LOCAL.index, -1)

				}

				//把当前点下的那个索引（存放在下一个变量中的索引），放在当前变量中
				that.LOCAL.index = that.LOCAL.iNext;

				//小按钮的当前项的修改
				that.LOCAL.active(that.LOCAL.index);
			})
		}

		//策略模式：判断用户是否允许自动播放
		if((options.autoPlay == undefined || options.autoPlay == true) && typeof options.right == "object" && options.right.length != 0) {
			this.LOCAL.timer = setInterval(function() {
				options.right.trigger("click");
			}, 2000)

			this.hover(function() {
				clearInterval(that.LOCAL.timer);
			}, function() {
				that.LOCAL.timer = setInterval(function() {
					options.right.trigger("click");
				}, 2000)
			})
		}
	}
})(jQuery)