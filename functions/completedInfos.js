module.exports = function completedInfos({
  appName,
  appDirectory,
  isUsingYarn,
}) {
  console.info(`Initialized a git repository.\n`.green);
  console.info(`\nSuccess! Created ${appName} at ${appDirectory}
\nInside that directory, you can run several commands:`);
  console.info(`\n  ${isUsingYarn ? 'yarn' : 'npm'} start`.cyan);
  console.info(`    Starts the development server.`);
  console.info(`\n  ${isUsingYarn ? 'yarn' : 'npm'} build`.cyan);
  console.info(`    Bundles the app into static files for production.`);
  console.info(`\n  ${isUsingYarn ? 'yarn' : 'npm'} test`.cyan);
  console.info(`    Starts the test runner.`);
  console.info(`\n  ${isUsingYarn ? 'yarn' : 'npm'} eject`.cyan);
  console.info(
    '    Removes this tool and copies build dependencies, configuration \n  files and scripts into the app directory. If you do this, \nyou can’t go back!'
  );
  console.info('\nI suggest that you begin by typing:');
  console.info(
    `\n  cd ${appName} && ${isUsingYarn ? 'yarn' : 'npm'} start`.cyan
  );
  console.info('\nHappy Learning!');
  return null;
};
