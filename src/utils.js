const { join } = require('path');
const { readFileSync } = require('fs');

const readCertFile = (certFileName) => {
  const certsFolder = join(__dirname, '..', 'certs');
  return readFileSync(join(certsFolder, certFileName));
};

module.exports = {
  readCertFile,
};
