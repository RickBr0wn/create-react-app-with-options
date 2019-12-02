const graphic = require('./graphic');

module.exports = function headerInfos() {
  graphic();
  console.info('');
  console.info('Welcome to create-react-app-with-options.'.green);
  console.info('');
  console.info(
    "This cli tool allows you to customize the create-react-app process.\nYou will be asked a series of questions relevant to the app \nand the npm packages you require. \nIt will then use create-react-app in it's usual \nmanner but will install all of the required dependencies \nand replace the create-react-app boilerplate with a 'trimmed' \ndown boilerplate bespoke to your dependencies and answers."
  );
  console.info('');
};
