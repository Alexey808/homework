var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    rigger       = require('gulp-rigger'),
    browserSync  = require('browser-sync'),
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
        gulp.src(path.src.html)
            .pipe(rigger())
            .pipe(gulp.dest(path.build.html))
            .pipe(reload({stream: true}));      //И перезагрузим наш сервер для обновлений
    });

//--- таск js:build -> Сборка js файлов.
    gulp.task('js:build', function () {
        gulp.src(path.src.js)
            .pipe(rigger())
            .pipe(uglify())
            .pipe(gulp.dest(path.build.js))
            .pipe(reload({stream: true}));
    });

//--- таск style:guild -> Сборка css файлов.
    gulp.task('style:build', function () {
        gulp.src(path.src.style)
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(gulp.dest(path.build.css))
            .pipe(reload({stream: true}));
    });

//--- таск image:build -> Сборка картинок.
    gulp.task('image:build', function () {
        gulp.src(path.src.img)
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [pngquant()],
                interlaced: true
            }))
            .pipe(gulp.dest(path.build.img))
            .pipe(reload({stream: true}));
    });

//--- таск fonts:build -> Собираем шрифты.
    gulp.task('fonts:build', function() {
        gulp.src(path.src.fonts)
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