let gulp = require("gulp");

let connect = require("gulp-connect");

let sass = require("gulp-sass-china")
//创建指令
gulp.task("linzhenhui", () => {
	console.log("this is my first gulp");
});

//gulp.task()//自定义gulp指令
//将本地文件上传到服务器disk的文件夹中
//gulp.src() //用来找到源文件的目录
//gulp.pipe()//在连缀中连续调用gulp方法
//gulp.dest()//转存方法
//gulp.watch()//监控

gulp.task("index", () => {
	return gulp.src(["page/**/*", "!page/pass.txt"]).pipe(gulp.dest("disk")).pipe(connect.reload());
})
gulp.task("watch", () => {
	gulp.watch("sass/*.scss",["sass"])
})
gulp.task("server", () => {
	connect.server({
		root: "ymt",
		port: 8123,
		livereload:true,
	})
})


gulp.task("sass", () => {
	return gulp.src("sass/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(gulp.dest("css"))
		.pipe(connect.reload());
})


gulp.task("default", ["server", "watch"]);