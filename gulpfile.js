var gulp = require("gulp"),
	del = require("del"),
	connect = require("gulp-connect"),
	shell = require("gulp-shell")
	rename = require("gulp-rename"),
	watch = require("gulp-watch"),
	sym = require("gulp-sym"),
	runSequence = require("run-sequence");

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

gulp.task("tsc", shell.task([
	"tsc"
], {cwd: "app"}));

gulp.task("tsc_watch", shell.task([
	"tsc -w"
], {cwd: "app"}));

gulp.task("html", function() {
	return gulp.src("app/app.html")
		.pipe(rename("index.html"))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});

gulp.task("html_watch", function() {
	return gulp.src("app/app.html")
		.pipe(watch("app/app.html"))
		.pipe(rename("index.html"))
		.pipe(gulp.dest("dist"))
		.pipe(connect.reload());
});

gulp.task("css", function() {
	return gulp.src("app/style/**/*.*(css|less)")
		.pipe(rename("output.css"))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});

gulp.task("css_watch", function() {
	return gulp.src("app/style/**/*.*(css|less)")
		.pipe(watch("app/style/**/*.*(css|less)"))
		.pipe(rename("output.css"))
		.pipe(gulp.dest("dist/css"))
		.pipe(connect.reload());
});

gulp.task("copy:config", function() {
	return gulp.src("config.js")
		.pipe(sym("dist/config.js", {force: true}));
});

gulp.task("copy:jspm_packages", function() {
	return gulp.src("jspm_packages")
		.pipe(sym("dist/jspm_packages", {force: true}));
});

gulp.task("app:install", shell.task([
	"jspm install"
]));

gulp.task("default", function(cb) {
	runSequence("clean",
		"app:install",
		[
			"tsc",
			"html",
			"css",
			"copy:config",
			"copy:jspm_packages"
		],
		"connect",
		[
			"tsc_watch",
			"html_watch",
			"css_watch",
		],
		cb
	);
});
