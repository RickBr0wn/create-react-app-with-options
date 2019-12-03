const process = require('process');
const rdl = require('readline');
const std = process.stdout;

module.exports = class Spinner {
  start() {
    process.stdout.write('\x1B[?25l');
    const spinners = ['-', '\\', '|', '/'];
    let index = 0;
    const spinner = setInterval(() => {
      let line = spinners[index];

      if (line === undefined) {
        index = 0;
        line = spinners[index];
      }

      std.write(line);
      rdl.cursorTo(std, 0, 0);
      index = index >= spinners.length ? 0 : index + 1;
    }, 100);
  }

  finish() {
    clearInterval(this.spinner);
    process.stderr.write('\x1B[?25h');
  }
};
