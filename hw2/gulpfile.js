var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    rigger       = require('gulp-rigger'),
    browserSync  = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    del          = require('del');
    /*reload       = browserSync.reload;*/


//--- такс default -> Запуск: build,webserver,watch.
    gulp.task('default', ['clean', 'build', 'webserver', 'watch']);

//--- таск clean -> Очистить build.
    gulp.task('clean', function(cb) {
        del(path.clean, cb);
    });

//--- переменная config -> Настройки dev сервера.
    /* !Создадим переменную с настройками нашего dev сервера: */
    var config = {
        server: {
            baseDir: "./build"
        },
        tunnel: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "Frontend_Devil"
    };
//--- таск webserver -> Веб сервер. Релоад.
    gulp.task('webserver', function () {
        browserSync(config);
    });

//--- таск watch -> Изменение файлов.
    gulp.task('watch', function(){
        gulp.watch([path.watch.html], function(event, cb) {
            gulp.start('html:build');
        });
        gulp.watch([path.watch.style], function(event, cb) {
            gulp.start('style:build');
        });
        gulp.watch([path.watch.js], function(event, cb) {
            gulp.start('js:build');
        });
        // gulp.watch([path.watch.img], function(event, cb) {
        //     gulp.start('image:build');
        // });
        // gulp.watch([path.watch.fonts], function(event, cb) {
        //     gulp.start('fonts:build');
        // });
    });

//--- переменная path -> Пути к файлам.
    var path = {
        build: { //сборка
            html: 'build/',
            js: 'build/js/',
            css: 'build/css/',
            img: 'build/img/',
            fonts: 'build/fonts/'
        },
        app: { //исходники
            js: 'app/*.js',
            style: 'app/*.scss',
            html: 'app/index.html',
            img: 'app/img/*.*',
            fonts: 'app/fonts/*.*'
        },
        watch: { //наблюдаем
            js: 'app/js/*.js',
            style: 'app/*.scss',
            html: 'app/*.html',
            img: 'app/img/**/*.*',
            fonts: 'app/fonts/**/*.*'


        },
        clean: 'build/'
    }; 

//--- таск html:build -> Сборка html файлов.
    gulp.task('html:build', function () {
        gulp.src(path.app.html)
            .pipe(rigger())
            .pipe(gulp.dest(path.build.html))
            .pipe(browserSync.reload({stream: true}));
    });

//--- таск js:build -> Сборка js файлов.
    gulp.task('js:build', function () {
        gulp.src(path.app.js)
            .pipe(rigger())
            .pipe(gulp.dest(path.build.js))
            .pipe(browserSync.reload({stream: true}));
    });

//--- таск style:guild -> Сборка css файлов.
    gulp.task('style:build', function () {
        gulp.src(path.app.style)
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest(path.build.css))
            .pipe(browserSync.reload({stream: true}));
    });

//--- таск image:build -> Сборка картинок.
    gulp.task('image:build', function () {
        gulp.src(path.app.img)
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()],
                interlaced: true
            }))
            .pipe(gulp.dest(path.build.img))
            .pipe(browserSync.reload({stream: true}));
    });

//--- таск fonts:build -> Собираем шрифты.
    gulp.task('fonts:build', function() {
        gulp.src(path.app.fonts)
            .pipe(gulp.dest(path.build.fonts))
    });

//--- таск build -> Запуск тасков build:html,js,style,image,fonts.
    gulp.task('build', [
        'html:build',
        'style:build',
        'js:build'
        // 'fonts:build',
        // 'image:build'
    ]);