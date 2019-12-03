#!/usr/bin/env node
const shell = require('shelljs');
const colors = require('colors');
const inquirer = require('inquirer');
const fs = require('fs');
const generateRandomName = require('./functions/generateRandomName');
const completedInfos = require('./functions/completedInfos');
const headerInfos = require('./functions/headerInfos');
const Spinner = require('./functions/spinner');

// const appName = process.argv[2];

const clearCommandLine = shell.exec('clear');

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
      message: 'How do you intend to manage your CSS styling?',
      name: 'cssStyles',
      choices: [
        {
          name: 'standard CSS modules',
          checked: true,
        },
        {
          name: 'styled-components',
        },
      ],
    },
    {
      type: 'list',
      message: 'How do you intend to manage the state in your app?',
      name: 'stateManagement',
      choices: [
        {
          name: 'redux, react-redux, redux-thunk',
        },
        {
          name: `no state management library`,
          checked: true,
        },
      ],
    },
    {
      type: 'confirm',
      name: 'confirmChoices',
      message: 'Are you sure you want to continue with these settings?',
      default: true,
    },
  ])
  .then(answers => {
    if (answers.confirmChoices) {
      if (answers.cssStyles === 'standard CSS modules') {
        answers.cssStyles = false;
      }
      if (
        answers.stateManagement === 'react useContext() api' ||
        answers.stateManagement === 'No state management library'
      ) {
        answers.stateManagement = false;
      }
      answers.appDirectory = `${process.cwd()}/${answers.appName}`;
      answers.isUsingYarn = answers.packetManager === 'yarn';
      run(answers);
    } else {
      process.exit();
    }
  });

const run = async answers => {
  let success = await createReactApp(answers);

  if (!success) {
    console.log(
      'Something went wrong while trying to create a new React app using create-react-app'
        .red
    );
    return false;
  }

  await installPackages(answers);
  await updateTemplates(answers);

  completedInfos(answers);
};

const createReactApp = ({ appName }) => {
  return new Promise(resolve => {
    console.info(
      '\nStarting create-react-app, this will take a little time, \nso be patient..'
        .cyan
    );
    shell.exec(`create-react-app ${appName}`, { silent: true }, () => {
      console.info(
        `\nYour create-react-app ${appName}, has been created.`.cyan
      );
      resolve(true);
    });
  });
};

const installPackages = ({
  appName,
  stateManagement,
  packetManager,
  cssStyles,
}) => {
  return new Promise(resolve => {
    console.info(
      `\nInstalling ${cssStyles ? cssStyles : ''}${
        stateManagement ? ', ' + stateManagement : ''
      }.\n`.cyan
    );
    shell.exec(
      `cd ${appName} && rm yarn.lock && ${
        packetManager === 'yarn' ? 'yarn add' : 'npm i --save '
      } ${cssStyles ? cssStyles + ' ' : ''}${
        stateManagement === 'redux, react-redux, redux-thunk'
          ? 'redux react-redux redux-thunk'
          : ''
      }`,
      { silent: true },
      () => {
        console.info('\nFinished installing packages\n'.green);
        resolve();
      }
    );
  });
};

const updateTemplates = answers => {
  let templates = require('./templates/templates.js')(answers);
  const { appName, appDirectory } = answers;
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
        } else if (fileName === 'store.js') {
          if (answers.stateManagement === 'redux, react-redux, redux-thunk') {
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
