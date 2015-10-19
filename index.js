var gulp    = require('gulp');
var postStylus = require('poststylus');
var Elixir = require('laravel-elixir');
var compile = require('laravel-elixir/tasks/shared/Css');

var config = Elixir.config;


/*
 |----------------------------------------------------------------
 | Stylus Compilation Task
 |----------------------------------------------------------------
 |
 | This task will compile your Stylus, including minification and
 | and auto-prefixing. Additionally it supports any postStylus
 | plugins that you want to include with your compilation.
 |
 */

Elixir.extend('stylus', function(src, output, baseDir, options) {
    config.css.stylus = {
        folder: 'stylus',

        pluginOptions: {
            use: [
                postStylus(['lost'])
            ]
        }
    };
    var paths = prepGulpPaths(src, baseDir, output);

    new Elixir.Task('stylus', function() {

        return compile({
            name: 'Stylus',
            compiler: require('gulp-stylus'),
            src: paths.src,
            output: paths.output,
            task: this,
            pluginOptions: options || config.css.stylus.pluginOptions
        });
    })
    .watch(paths.src.baseDir + '/**/*.styl')
    .ignore(paths.output.path);
});


/**
 * Prep the Gulp src and output paths.
 *
 * @param  {string|array} src
 * @param  {string|null}  baseDir
 * @param  {string|null}  output
 * @return {object}
 */
var prepGulpPaths = function(src, baseDir, output) {
    return new Elixir.GulpPaths()
        .src(src, baseDir || config.get('assets.css.stylus.folder'))
        .output(output || config.get('public.css.outputFolder'), 'app.css');
};
