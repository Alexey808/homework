'use strict';

 // Подключаемые библиотеки
var gulp          = require('gulp');
var sass          = require('gulp-sass');
var concat        = require('gulp-concat');
var cleanCSS      = require('gulp-clean-css');
var autoprefixer  = require('gulp-autoprefixer');
var sourceMaps    = require('gulp-sourcemaps');
var gulpif        = require('gulp-if');
var clean         = require('gulp-clean');
var browserSync   = require('browser-sync');
var uglify        = require('gulp-uglify');


//Дефолтный таск ---------------------------------------------------+
gulp.task('default', ['build', 'server', 'watch']);

// Сервер ----------------------------------------------------------+
var config = {
    server: {
        baseDir: "./build"
    },
    host: 'localhost',
    port: 9000,
};
gulp.task('server', ()=> {
    browserSync(config);
});

// PATH ------------------------------------------------------------+
var path = {
    build: {
        html: 'build/',
        css: 'build/css/',
        js: 'build/js/',
        img: 'build/img/'
    },
    src: {
        html: 'src/*.html', 
        // style: 'src/sass/index.scss',
        style: 'src/sass/',
        js: 'src/js/**/*.js',
        img: 'src/img/**/*.*'
    },
    watch: {
        html: 'src/*.html',
        style: 'src/sass/**/*.*',
        js: 'src/main.js',
        img: 'src/img/*.*'
    },
    clean: './build/*'
};

// Сборка тасков build ---------------------------------------------+
gulp.task('build', [
    // 'clean:build',
    'html:build',
    'style:build',
    'js:build',
    'image:build'
]);

//Чистка -----------------------------------------------------------+
gulp.task('clean:build', ()=> {
    return gulp.src(path.clean, {read: false})
        .pipe(clean());
});

// Отслеживание изменений ------------------------------------------+
gulp.task('watch', ()=> {
    gulp.watch([path.watch.html], (event, cb) => {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], (event, cb) => {
        gulp.start('style:build');
    });
    gulp.watch([path.watch.html], (event, cb) => {
        gulp.start('js:build');
    });
    gulp.watch([path.watch.style], (event, cb) => {
        gulp.start('image:build');
    });
});

// Сборка html -----------------------------------------------------+
gulp.task('html:build', ()=> {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html)) 
        .pipe(browserSync.reload({stream: true})); 
});

// Сборка css ------------------------------------------------------+
gulp.task('style:build', ()=> { console.log(gulp.src(path.src.style));
    gulp.src(path.src.style)
        // .pipe(sourceMaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 9 versions'], cascade: false}))
        // .pipe(cleanCSS())
        .pipe(concat('main.css'))
        // .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.reload({stream: true})); 

});

gulp.task('style:build', ()=> {

    gulp.src(path.src.style + 'index.scss') // 'src/sass/index.scss'
        .pipe(sourceMaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 9 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(concat('main.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css)); // 'build/css/'

    gulp.src(path.src.style + 'm-index.scss') // 'src/sass/m-index.scss'
        .pipe(sourceMaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 9 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(concat('m-main.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css)); // 'build/css/'

    gulp.src(path.src.style + 't-index.scss') // 'src/sass/t-index.scss'
        .pipe(sourceMaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer({browsers: ['last 9 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(concat('t-main.css'))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css)) // 'build/css/'

        .pipe(browserSync.reload({stream: true})); 

});

// Сборка js -------------------------------------------------------+
gulp.task('js:build', ()=> {
    gulp.src(path.src.js)
        // .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.reload({stream: true})); 
});

// Сборка изображений ----------------------------------------------+
gulp.task('image:build', ()=> {
    gulp.src(path.src.img)
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     //use: [pngquant()],
        //     interlaced: true
        // }))
        .pipe(gulp.dest(path.build.img))
        .pipe(browserSync.reload({stream: true})); 
});
