import babel from 'rollup-plugin-babel';
import browserSync from 'browser-sync';
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import { rollup } from 'rollup';
import uglify from 'rollup-plugin-uglify';

const $ = gulpLoadPlugins();

gulp.task('default', ['css', 'js', 'views', 'imagemin']);

gulp.task('browserSync', ['default'], () => {
  browserSync.init({
    notify: false,
    port: 8000,
    server: {
      baseDir: 'dist',
    },
  });
});

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('src/sass/**/*.scss', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('src/views/**/*.pug', ['views']);
});

gulp.task('min', ['css-min', 'js-min']);

gulp.task('css', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'nested', // expanded, nested, compact, compressed
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('css-min', () => {
  gulp.src('src/sass/**/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'compressed',
      precision: 10,
      includePath: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'))
    .pipe($.notify({
      message: 'Minify Sass Complete!',
      onLast: true,
    }));
});

gulp.task('js', () => rollup({
  input: 'src/js/main.js',
  plugins: [
    babel({
      presets: [
        ['es2015', { modules: false }],
      ],
      babelrc: false,
      exclude: 'node_modules/**',
    }),
  ],
})
  .then(bundle => bundle.generate({
    format: 'umd',
    name: 'myModuleName',
  }))
  .then(gen => $.file('bundle.js', gen.code, { src: true })
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream())),
);

gulp.task('js-min', () => rollup({
  input: 'src/js/main.js',
  plugins: [
    babel({
      presets: [
        ['es2015', { modules: false }],
      ],
      babelrc: false,
      exclude: 'node_modules/**',
    }),
    uglify(),
  ],
})
  .then(bundle => bundle.generate({
    format: 'umd',
    name: 'myModuleName',
  }))
  .then(gen => $.file('bundle.min.js', gen.code, { src: true })
    .pipe(gulp.dest('dist/js'))),
);

gulp.task('views', () => {
  gulp.src('src/views/**/*.pug')
    .pipe($.plumber())
    .pipe($.pug({
      pretty: true,
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('imagemin', () => {
  gulp.src('src/assets/**/*')
    .pipe($.plumber())
    .pipe($.imagemin())
    .pipe(gulp.dest('dist/assets'));
});
