const friendlyWords = require('friendly-words');

module.exports = function generateRandomName() {
  const predicates =
    friendlyWords.predicates[
      Math.floor(Math.random() * friendlyWords.predicates.length)
    ];
  const obj =
    friendlyWords.objects[
      Math.floor(Math.random() * friendlyWords.objects.length)
    ];
  return `${predicates}-${obj}`;
};
