const graphic = require('./graphic');

module.exports = function headerInfos() {
  graphic();
  console.info('');
  console.info('Welcome to create-react-app-with-options.'.green);
  console.info('');
  console.info(
    "This cli tool allows you to customize the create-react-app process. You will be asked a series of questions relevant to the app and the npm packages you require. It will then use create-react-app in it's usual manner but will install all of the required dependencies and replace the create-react-app boilerplate with a 'trimmed' down boilerplate bespoke to your dependencies and answers."
  );
  console.info('');
};
