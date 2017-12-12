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
var browserSync   = require('browser-sync');//.create();

// // Окружение
// //const ENV = process.env.NODE_ENV || 'production';
// var ENV = 'dev';

// // Задача запускаемая по умолчанию
// gulp.task('default', function() {
//     var tasks = ['sass'];
//     if (ENV != 'production') {
//         tasks.push('watch');
//     } else {
//         gulp.src(['./src/*'], {read: false}).pipe(clean());
//     }

//     gulp.start(tasks);
// });

// // Задача для автозапуска нужных подзадач
// gulp.task('watch', function () {
//     // ENV = 'dev';
//     gulp.watch([
//       '*.html',
//       'css/**/*.css',
//       'sass/**/*.scss'
//     ]).on('change', browserSync.reload);
// });

// // Запуск BrowserSync
// gulp.task('server', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         },
//         port: 9000,
//         open: false
//     });
// });

// // Подзадача для запуска сборщика SCSS файлов
// gulp.task('sass', function () {
//     return gulp.src([
//         './sass/index.scss'
//     ])
//         .pipe(gulpif(ENV != 'production', sourceMaps.init()))
//         .pipe(sass.sync().on('error', sass.logError))
//         .pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
//         .pipe(cleanCSS())
//         .pipe(concat('./src/style.css'))
//         .pipe(gulpif(ENV != 'production', sourceMaps.write()))
//         .pipe(gulp.dest('.'));
// });

//-----------------------------------------------------------------------------

//Дефолтный таск ---------------------------------------------------+
gulp.task('default', ['clean', 'build', 'server', 'watch']);


// Сервер ----------------------------------------------------------+
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
gulp.task('server', ()=> {
    browserSync(config);
});


// PATH ------------------------------------------------------------+
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        css: 'build/css/',
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', 
        style: 'src/sass/**/*.scss',
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/*.html',
        style: 'src/**/*.scss',
    },
    clean: './build/*'
};


// Сборка тасков build ---------------------------------------------+
gulp.task('build', [
    'html:build',
    'style:build'
]);

//Чистка -----------------------------------------------------------+
gulp.task('clean', ()=> {
    // clean.sync('build/*');
   
    return gulp.src(path.clean, {read: false})
        .pipe(clean());
});

// Отслеживание изменений ------------------------------------------+
gulp.task('watch', ()=> {
    gulp.watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], {readDelay: 200}, function(event, cb) {
        gulp.start('style:build');
    });
});

// Сборка html -----------------------------------------------------+
gulp.task('html:build', ()=> {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        // .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        // .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
        browserSync.reload;
});

// Сборка css ------------------------------------------------------+
gulp.task('style:build', ()=>{
    gulp.src(path.src.style)
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        .pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
        .pipe(cleanCSS())
        .pipe(concat(path.build.css))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.build.css))
        browserSync.reload;

        // .pipe(gulpif(ENV != 'production', sourceMaps.init()))
        // .pipe(sass.sync().on('error', sass.logError))
        // .pipe(autoprefixer({browsers: ['last 10 versions'], cascade: false}))
        // .pipe(cleanCSS())
        // .pipe(concat('./src/style.css'))
        // .pipe(sourceMaps.write())
        // .pipe(gulp.dest('.'));
});


