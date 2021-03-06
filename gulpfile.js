"use strict";

let gulp = require("gulp");
let sass = require("gulp-sass");
let sourcemaps = require("gulp-sourcemaps");
let replace = require('gulp-replace');
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");

let autoprefixer = require("autoprefixer");
let babel = require('gulp-babel');
let mqpacker = require("css-mqpacker");
let minify = require("gulp-csso");
let server = require("browser-sync").create();
let rename = require("gulp-rename");
let imagemin = require("gulp-imagemin");
let svgmin = require("gulp-svgmin");
let svgsprite = require('gulp-svg-sprite');
let run = require("run-sequence").use(gulp);
let del = require("del");
let jsmin = require("gulp-uglify");
let htmlimport = require('gulp-html-import');
let concat = require('gulp-concat');
let copy = require('gulp-copy');
let htmlbeautify = require('gulp-html-beautify');
let wait = require('gulp-wait');
let critical = require('critical');
let sortCSSmq = require('sort-css-media-queries');


// cleans build-directory
gulp.task("clean", function () {
	return del("build");
});


// copies global project assets into build
gulp.task("copyAssets", function () {
	return gulp.src([
		"assets/js/*.js",
		"assets/css/*.css",
		"assets/fonts/*.{woff,woff2,otf,ttf}",
		"assets/img/*.{png,jpg,gif,jpeg,svg}"
	])
	.pipe(copy('build', {
		prefix: 1
	}));
});


// copies images for bem-blocks into build
gulp.task("copybemimages", function () {
	return gulp.src([
		"blocks/**/*.{png,jpg,gif,jpeg,svg}"
	])
	.pipe(copy('build/img', {
		prefix: 4
	}));
});


// concats separate js for blocks into assets/js/script.js
gulp.task('concat', function () {
	return gulp.src('blocks/**/*.js')
	.pipe(concat('script.js'))
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(gulp.dest('assets/js/'));
});


// concats and minify all js vendors of gulp.src below
gulp.task('concat-vendors', function () {
	return gulp.src(['build/js/jquery-3.2.1.min.js', 'build/js/jquery.lazy.min.js', 'build/js/scaffolding.js', 'build/js/script.js', 'build/js/imagesloaded.pkgd.min.js', 'build/js/jquery.fancybox.min.js', 'build/js/wow.min.js', 'build/js/masonry.pkgd.min.js', 'build/js/anime.min.js', 'build/js/gridLoading.js', 'build/js/tilt.jquery.js', 'build/js/jquery.lazy-load-google-maps.min.js', 'build/js/vk-openapi.js'])
	.pipe(concat('script.min.js'))
	.pipe(jsmin({
		output: {
			comments: true
		}
	}))
	.pipe(gulp.dest('build/js/'));
});


// imports html of bem-blocks into pages
// then copies html-pages into build
gulp.task('htmlimport', function () {
	gulp.src('pages/*.html')
	.pipe(htmlimport('blocks/'))
	.pipe(replace(/\n\s*<!--DEV[\s\S]+?-->/gm, ''))
	.pipe(gulp.dest('build/'));
});


// beautifies html-pages in build
gulp.task('htmlbeautify', function () {
	gulp.src('build/*.html')
	.pipe(htmlbeautify({
		"indent_size": 2
	}))
	.pipe(gulp.dest('build/'))
});


// compiles main scss in css
// then puts minified css into build/css
gulp.task("style", function () {
	gulp.src("assets/styles/style.scss")
	.pipe(wait(200))
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(postcss([
		autoprefixer({
			browsers: [
				"last 4 version",
				"last 4 Chrome versions",
				"last 4 Firefox versions",
				"last 4 Opera versions",
				"last 4 Edge versions"
			]
		}),
		mqpacker({
			sort: sortCSSmq.desktopFirst
		})
	]))
	.pipe(gulp.dest("build/css"))
	.pipe(minify())
	.pipe(rename("style.min.css"))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest("build/css"))
	.pipe(server.stream());
});

// compiles main scss in css
// then puts minified css into build/css WITHOUT SOURCEMAP
gulp.task("style-prod", function () {
	gulp.src("assets/styles/style.scss")
	.pipe(wait(200))
	.pipe(plumber())
	.pipe(sass())
	.pipe(postcss([
		autoprefixer({
			browsers: [
				"last 4 version",
				"last 4 Chrome versions",
				"last 4 Firefox versions",
				"last 4 Opera versions",
				"last 4 Edge versions"
			]
		}),
		mqpacker({
			sort: sortCSSmq.desktopFirst
		})
	]))
	.pipe(gulp.dest("build/css"))
	.pipe(minify())
	.pipe(rename("style.min.css"))
	.pipe(gulp.dest("build/css"))
});


// compiles blocks scss in css separately
// then puts minified css into build/blocks-css
gulp.task('block-css', function () {
	return gulp.src('blocks/**/*.scss')
	.pipe(sass())
	.pipe(postcss([
		autoprefixer({
			browsers: [
				"last 4 version",
				"last 4 Chrome versions",
				"last 4 Firefox versions",
				"last 4 Opera versions",
				"last 4 Edge versions"
			]
		}),
		mqpacker({
			sort: sortCSSmq.desktopFirst
		})
	]))
	.pipe(minify())
	.pipe(gulp.dest('build/blocks-css'))
});


// minifies compiled script.js in build (rename to script.min.js)
gulp.task("jsmin", function () {
	return gulp.src("assets/js/script.js")
	.pipe(jsmin())
	.pipe(rename("script.min.js"))
	.pipe(gulp.dest("build/js"));
});


// minifies images
gulp.task("images", function () {
	return gulp.src("build/img/**/*.{png,jpg,gif}")
	.pipe(imagemin([
		imagemin.optipng({
			optimizationLevel: 5
		}),
		imagemin.jpegtran({
			progressive: true
		})
	]))
	.pipe(gulp.dest("build/img"));
});


// minifies svg-images
gulp.task("svgimages", function () {
	return gulp.src("build/img/*.svg")
	.pipe(svgmin())
	.pipe(gulp.dest("build/img"));
});


// makes view- and symbol- svg-sprite
let svgConfig = {
	dest: ".",
	shape: {
		dimension: { // Set maximum dimensions
			maxWidth: 32,
			maxHeight: 32
		},
		spacing: {
			padding: 0
		}
	},
	mode: {
		view: { // Makes scss-sprite
			dest: ".",
			sprite: "build/img/svgsprite.css.svg",
			bust: false,
			prefix: "._svg-icon-%s",
			render: {
				scss: {
					dest: "./assets/styles/svg_sprite.scss",
				}
			},
		},
		symbol: { // Makes inline html sprite
			dest: ".",
			sprite: "build/svg/svgsprite.svg"
		},
	}
};
gulp.task("svgsprite", function () {
	return gulp.src(['assets/img/*.svg', 'blocks/**/*.svg'])
	.pipe(svgsprite(svgConfig))
	.pipe(replace('build', '..'))
	.pipe(gulp.dest('.'))
});


// serve styles from build
gulp.task("watch", ["style"], function () {
	server.init({
		server: "build",
		notify: false,
		open: true,
		ui: false
	});

	gulp.watch(["assets/styles/**/*.{scss,sass}", "blocks/**/*.{scss,sass}"], ["style"]);
	gulp.watch(["blocks/**/*.js"]).on("change", function () {
		del("build/js/script.min.js");
		del("build/js/script.js");
		run("concat");
		run("jsmin");
		server.reload();
	});
	gulp.watch(["./pages/*.html", "./blocks/**/*.html"]).on("change", function () {
		del("build/*.html");
		run("htmlimport");
		server.reload();
	});
	gulp.watch("blocks/**/*.js").on("change", function () {
		del("build/js/script.min.js");
		run("concat","jsmin");
		server.reload();
	});
});


// inline critical CSS for first screen into head
gulp.task("criticalCSS", function () {
	critical.generate({
		inline: true,
		base: 'build/',
		src: 'index.html',
		dest: 'index.html',
		dimensions: [
			{
				width: 320,
				height: 660,
			},
			{
				width: 768,
				height: 1024,
			},
			{
				width: 1280,
				height: 768,
			},
			{
				width: 1920,
				height: 1024,
			},
		],
	});
});


//start
gulp.task("serve", function () {
	run("clean", "concat", "htmlimport", "htmlbeautify", "copyAssets", "copybemimages", "jsmin", "svgsprite", "style-prod", "watch" /*, "images", "svgimages"*/)
});


// build
gulp.task("build", function () {
	run("clean", "concat", "htmlimport", "htmlbeautify", "copyAssets", "style-prod", "copybemimages", "svgsprite",  /*"images", "svgimages",*/ "criticalCSS", "concat-vendors")
});

