var gulp = require("gulp"),
	del = require("del"),
	connect = require("gulp-connect"),
	shell = require("gulp-shell")
	rename = require("gulp-rename");

gulp.task("connect", function() {
	connect.server({
		name: "Dev App",
		port: 8080,
		root: ["dist/"]
	});
});

gulp.task("clean", function() {
	return del(["dist"]);
});

gulp.task("tsc", ["clean"], shell.task([
	"tsc"
], {cwd: "app"}));

gulp.task("tsc_watch", ["clean"], shell.task([
	"tsc -w"
], {cwd: "app"}));

gulp.task("html", function() {
	return gulp.src("app/app.html")
		.pipe(rename("index.html"))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});

gulp.task("css", function() {
	return gulp.src("app/style/**/*.*(css|less)")
		.pipe(rename("output.css"))
		.pipe(gulp.dest("dist/css"))
});

gulp.task("default", ["tsc_watch", "html", "css", "connect"]);
