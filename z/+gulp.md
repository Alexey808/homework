
# GULP

### Пакеты
```js
'use strict';

var gulp         = require('gulp'),
    sass         = require('gulp-sass'),              // препроцессор
    rigger       = require('gulp-rigger'),            // для подключения файлов
    imagemin     = require('gulp-imagemin'),          // для сжатия img
    uglify       = require('gulp-uglifyjs'),          // для сжатия JS
    prefixer     = require('gulp-autoprefixer'),      // префиксы css
    watch        = require('gulp-watch'),             // отслеживание, есть встр
    browserSync  = require('browser-sync'),           // сервер
    del          = require('del'),                    // для чистки
    reload       = browserSync.reload;

```

### Дефолтный таск
```js
gulp.task('default', ['clean', 'build', 'webserver', 'watch']);
```

### Сервер
```js
var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend_Devil"
};
gulp.task('webserver', ()=> {
    browserSync(config);
});
```

### Чистка
```js
gulp.task('clean', ()=> {
  del.sync('build/*');
});
```

### PATH пути
```js
var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html',//'src/[^_]*.html',  //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/*.js',
        style: 'src/*.scss',
        img: 'src/img/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/[^_]*.js',
        style: 'src/**/*.scss',// 'src/**/*.sass',
        img: 'src/img/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    //clean: './build'
};
```

### Сборка html
```js
gulp.task('html:build', ()=> {
    gulp.src(path.src.html)               //Выберем файлы по нужному пути
        .pipe(rigger())                   //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выложим их в папку build
        .pipe(reload({stream: true}));    //И перезагрузим наш сервер для обновлений
});
```

### Сборка css
```js
gulp.task('style:build', ()=>{
    gulp.src(path.src.style)
        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
        //.pipe(setTimeout(sass({outputStyle:'expanded'}).on('error',sass.logError), 500))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});
```

### Сборка js
```js
gulp.task('js:build', ()=> {
    gulp.src(path.src.js)                 //Найдем наш main файл
        .pipe(rigger())                   //Прогоним через rigger
        .pipe(uglify())                   //Сожмем наш js
        .pipe(gulp.dest(path.build.js))   //Выложим готовый файл в build
        .pipe(reload({stream: true}));    //И перезагрузим сервер
});
```

### Сборка изображений
```js
gulp.task('image:build', ()=> {
    gulp.src(path.src.img)                //Выберем наши картинки
        .pipe(imagemin({                  //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            //use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))  //И бросим в build
        .pipe(reload({stream: true}));
});
```

### Сборка шрифтоф
```js
gulp.task('fonts:build', ()=> {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});
```

### Сборка тасков build
```js
gulp.task('build', [
    'html:build',
    'style:build',
    'js:build',
    'image:build',
    'fonts:build'
]);
```

### Отслеживание изменений
```js
gulp.task('watch', ()=> {
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.watch.style], {readDelay: 200}, function(event, cb) {
        gulp.start('style:build');
    });
});
```




