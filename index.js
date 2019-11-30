#!/usr/bin/env node
const shell = require('shelljs');
const colors = require('colors');
const inquirer = require('inquirer');
const fs = require('fs');
const generateRandomName = require('./functions/generateRandomName');
const completedInfos = require('./functions/completedInfos');
const headerInfos = require('./functions/headerInfos');

// const appName = process.argv[2];
let appDirectory, appName, isUsingYarn;

headerInfos();

inquirer
  .prompt([
    {
      type: 'list',
      name: 'packetManager',
      message: 'Which package manager do you use?',
      choices: ['npm', 'yarn'],
      default: 1,
    },
    {
      name: 'appName',
      message: 'What is the name of your new app?',
      default: generateRandomName(),
    },
    {
      type: 'list',
      name: 'appDependencies',
      message: 'Which package setup do you want?',
      choices: ['react, redux, router', 'blank', 'blank'],
      default: 0,
    },
  ])
  .then(answers => {
    appName = answers.appName;
    appDirectory = `${process.cwd()}/${appName}`;
    isUsingYarn = answers.packetManager === 'yarn';
    run();
  });

const run = async () => {
  let success = await createReactApp(appName);

  if (!success) {
    console.log(
      'Something went wrong while trying to create a new React app using create-react-app'
        .red
    );
    return false;
  }

  await installPackages();
  await updateTemplates();
  completedInfos();
};

const createReactApp = appName => {
  return new Promise(resolve => {
    shell.exec(`create-react-app ${appName}`, () => {
      console.info('Created react app');
      resolve(true);
    });
  });
};

// const cdIntoNewApp = appName => {
//   return new Promise(resolve => {
//     shell.exec(`cd ${appName} && touch test2.js`, () => {
//       resolve();
//     });
//   });
// };

// const test = () => {
//   return new Promise(resolve => {
//     shell.exec(`touch test.js`, () => {
//       resolve();
//     });
//   });
// };

const installPackages = () => {
  return new Promise(resolve => {
    console.info(
      '\nInstalling redux, react-router, react-router-dom, react-redux, and redux-thunk.\n'
        .cyan
    );
    shell.exec(
      `cd ${appName} && rm yarn.lock && ${
        isUsingYarn ? 'yarn add' : 'npm i --save'
      } redux react-router react-redux redux-thunk react-router-dom`,
      () => {
        console.info('\nFinished installing packages\n'.green);
        resolve();
      }
    );
  });
};

const updateTemplates = () => {
  let templates = require('./templates/templates.js')(appName);

  return new Promise(resolve => {
    let promises = [];
    console.info('\nCreating boilerplate code for dependencies\n'.cyan);

    Object.keys(templates).forEach((fileName, i) => {
      promises[i] = new Promise(res => {
        if (fileName === 'index.html') {
          fs.writeFile(
            `${appDirectory}/public/index.html`,
            templates[fileName],
            function(err) {
              if (err) {
                return console.log(err);
              }
              res();
            }
          );
        } else if (fileName === '.prettierrc') {
          fs.writeFile(
            `${appDirectory}/.prettierrc`,
            templates[fileName],
            function(err) {
              if (err) {
                return console.log(err);
              }
              res();
            }
          );
        } else {
          fs.writeFile(
            `${appDirectory}/src/${fileName}`,
            templates[fileName],
            function(err) {
              if (err) {
                return console.log(err);
              }
              res();
            }
          );
        }
      });
    });

    fs.unlink(`${appDirectory}/src/App.css`, function(err) {
      if (err) {
        return console.log(err);
      }
    });

    fs.unlink(`${appDirectory}/src/logo.svg`, function(err) {
      if (err) {
        return console.log(err);
      }
    });

    Promise.all(promises).then(() => {
      resolve();
    });
  });
};
