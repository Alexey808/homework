var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    rigger       = require('gulp-rigger'),
    autoprefixer = require('gulp-autoprefixer');


//--- такс default -> Запуск: build,webserver,watch.
    gulp.task('default', ['build']);

//--- переменная path -> Пути к файлам.
    var path = {
        build: { //сборка
            html: 'build/',
            js: 'build/js/',
            react: 'build/js/react/',
            css: 'build/css/',
            img: 'build/img/',
            fonts: 'build/fonts/'
        },
        app: { //исходники
            js: 'app/js/main.js',
            style: 'app/style/main.scss',
            html: 'app/pages/*.html',
            img: 'app/img/**/*.*',
            fonts: 'app/fonts/**/*.*'
        },
        watch: { //наблюдаем
            js: 'app/js/main.js',
            style: 'app/style/main.scss',
            html: 'app/pages/*.html',
            img: 'app/img/**/*.*',
            fonts: 'app/fonts/**/*.*'
        },
    }; 

//--- таск html:build -> Сборка html файлов.
    gulp.task('html:build', function () {
        gulp.app(path.app.html)
            .pipe(rigger())
            .pipe(gulp.dest(path.build.html))
    });

//--- таск js:build -> Сборка js файлов.
    gulp.task('js:build', function () {
        gulp.app(path.app.js)
            .pipe(rigger())
            .pipe(gulp.dest(path.build.js))
    });

//--- таск style:guild -> Сборка css файлов.
    gulp.task('style:build', function () {
        gulp.app(path.app.style)
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest(path.build.css))
    });

//--- таск image:build -> Сборка картинок.
    gulp.task('image:build', function () {
        gulp.app(path.app.img)
            .pipe(gulp.dest(path.build.img))
    });

//--- таск fonts:build -> Собираем шрифты.
    gulp.task('fonts:build', function() {
        gulp.app(path.app.fonts)
            .pipe(gulp.dest(path.build.fonts))
    });

//--- таск build -> Запуск тасков build:html,js,style,image,fonts.
    gulp.task('build', [
        'html:build'
        // 'js:build',
        // 'style:build',
        // 'fonts:build',
        // 'image:build'
    ]);