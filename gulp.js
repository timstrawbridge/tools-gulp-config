
var gulp = require( 'gulp' );
var minifyCSS = require( 'gulp-clean-css' );
var minifyJS = require( 'gulp-uglify' );
var concat = require( 'gulp-concat' );
var rename = require( 'gulp-rename' );
var sourcemaps = require('gulp-sourcemaps');
var clean = require( 'gulp-clean' );

//var browserSync = require('browser-sync').create();

var cssSourceFiles = 'src/css/*.css';
var jsSourceFiles = 'src/js/*.js';

//const watcher = watch([ cssSourceFiles ]);

function minifyStyles(){
  return gulp.src( cssSourceFiles )

  .pipe( sourcemaps.init() )
  .pipe( minifyCSS() )
  // .pipe( concat( 'main-css.min.css' ) )
  .pipe( rename({
    dirname:'./',
    suffix:'.min',
    extname: '.css'
  }))
  .pipe( sourcemaps.write('maps') )
  .pipe( gulp.dest('web/dist'));
  //.pipe( browserSync.stream() );
}

function minifyScripts(){
  return gulp.src( ['src/js/*.js', '!src/js/jquery-2.2.4.min.js'] )
  .pipe( sourcemaps.init() )
  .pipe( minifyJS() )
  .pipe( rename({
    dirname:'./',
    suffix:'.min',
    extname: '.js'
  }))
  .pipe( sourcemaps.write('maps') )
  .pipe( gulp.dest('web/dist') );

}

function cleanUp(){
  return gulp.src( 'src/dist/*', { read: false } )
    .pipe( clean() );
}

function watchSourceFiles(){
  gulp.watch( cssSourceFiles, minifyStyles );
  gulp.watch( jsSourceFiles, minifyScripts );
}

var build = gulp.series( cleanUp, minifyStyles, minifyScripts, watchSourceFiles );

exports.default = build;
