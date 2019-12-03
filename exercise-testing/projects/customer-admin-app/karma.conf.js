// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-typescript-preprocessor'),
      require('karma-typescript'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, '../../coverage/dada'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true,
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    restartOnFileChange: true,

    preprocessors: {
      '**/*.ts': ['karma-typescript'],
    },

    typescriptPreprocessor: {
      // options passed to the typescript compiler
      options: {
        sourceMap: true, // (optional) Generates corresponding .map file.
        target: 'es2015', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
        module: 'esnext', // (optional) Specify module code generation: 'commonjs' or 'amd'
        noResolve: true, // (optional) Skip resolution and preprocessing.
        removeComments: true, // (optional) Do not emit comments to output.
        concatenateOutput: false, // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
      },
      // transforming the filenames
      transformPath: function(path) {
        return path.replace(/\.ts$/, '.js');
      },
      files: ['./src/*.ts', './test/*.ts'],
    },
  });
};
