const { readCertFile } = require('../utils');

const VALID_FINGERPRINTS = [
  '81:30:4F:6E:75:9E:CB:CE:2F:22:05:C8:5F:B9:97:A8:EB:8C:04:0E:6E:4F:3C:2A:96:98:F5:B8:0C:64:7E:81',
];

const verifyClient = (info, cb) => {
  const fingerprint = info.req.socket.getPeerCertificate().fingerprint;
  if (VALID_FINGERPRINTS.includes(fingerprint)) {
    cb(true);
  }
  cb(false, 403, 'Forbidden');
};

const secureOpts = {
  key: readCertFile('server-key.pem'),
  cert: readCertFile('server-crt.pem'),
  ca: readCertFile('ca-crt.pem'),
  requestCert: true,
  rejectUnauthorized: false,
  verifyClient,
};

const permissions = {
  push: [
    '81:30:4F:6E:75:9E:CB:CE:2F:22:05:C8:5F:B9:97:A8:EB:8C:04:0E:6E:4F:3C:2A:96:98:F5:B8:0C:64:7E:81',
  ],
  pull: [
    '81:30:4F:6E:75:9E:CB:CE:2F:22:05:C8:5F:B9:97:A8:EB:8C:04:0E:6E:4F:3C:2A:96:98:F5:B8:0C:64:7E:81',
  ],
};

const isAllowedAction = (action) => {
  if (!permissions[action]) return false;
  return true;
};

const isAllowedToPerformAction = (action, fingerprint) => {
  if (!permissions[action]) return false;
  if (permissions[action].indexOf(fingerprint) !== -1) return true;
  return false;
};

module.exports = {
  secureOpts,
  isAllowedAction,
  isAllowedToPerformAction,
};
