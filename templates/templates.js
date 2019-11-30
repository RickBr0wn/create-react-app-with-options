const createAppJs = require('./App.js');
const createIndexHtml = require('./indexHtml.js');
const createIndexCss = require('./indexCss.js');

module.exports = appName => ({
  'App.js': createAppJs(),
  'index.js': require('./index.js'),
  'store.js': require('./store.js'),
  'index.html': createIndexHtml(appName),
  'index.css': createIndexCss(),
  '.prettierrc': require('./prettierrc.js'),
});
