var gulp = require("gulp");
var sass = require("gulp-sass")(require("sass"));
var rename = require("gulp-rename");

/*
 * VARIÁVEIS
 */
// ARQUIVO SASS PRINCIPAL
var scssFiles = "./src/main.scss";

// DESTINO DOS ARQUIVOS .CSS
var cssDest = "./css";

// OPÇÕES PARA DESENVOLVIMENTO
var sassDevOptions = {
  outputStyle: "expanded",
};

// OPÇÕES PARA PRODUÇÃO
var sassProdOptions = {
  outputStyle: "compressed",
};

/*
 * TAREFAS
 */
// TAREFA 'sassdev' - RODE O COMANDO 'gulp sassdev'
gulp.task("sassdev", function () {
  return gulp
    .src(scssFiles)
    .pipe(sass(sassDevOptions).on("error", sass.logError))
    .pipe(gulp.dest(cssDest));
});

// TAREFA 'sassprod' - RODE COM O COMANDO 'gulp sassprod'
gulp.task("sassprod", function () {
  return gulp
    .src(scssFiles)
    .pipe(sass(sassProdOptions).on("error", sass.logError))
    .pipe(rename("main.min.css"))
    .pipe(gulp.dest(cssDest));
});

// TAREFA 'watch' - RODE COM O COMANDO 'gulp watch'
gulp.task("watch", function () {
  gulp.watch(scssFiles, gulp.parallel("sassdev", "sassprod"));
});

// TAREFA PADRÃO - RODE COM O COMANDO 'gulp'
gulp.task("default", gulp.parallel("sassdev", "sassprod", "watch"));