const createAppJs = require('./App.js');
const createIndexHtml = require('./indexHtml.js');
const createIndexCss = require('./indexCss.js');
const createIndexJs = require('./index.js');

module.exports = answers => ({
  'App.js': createAppJs(answers),
  'index.js': createIndexJs(answers),
  'store.js': answers.stateManagement ? require('./store.js') : '',
  'index.html': createIndexHtml(answers.appName),
  'index.css': createIndexCss(),
  '.prettierrc': require('./prettierrc.js'),
});
