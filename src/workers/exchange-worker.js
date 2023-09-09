'use strict';

const { PeerRPCClient } = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const { readCertFile } = require('../utils');

const link = new Link({
  grape: 'http://127.0.0.1:30001',
  requestTimeout: 10000,
});
link.start();

const opts = {
  secure: {
    key: readCertFile('../certs/client-key.pem'),
    cert: readCertFile('../certs/client-crt.pem'),
    ca: readCertFile('../certs/ca-crt.pem'),
    rejectUnauthorized: false,
  },
};

const peer = new PeerRPCClient(link, opts);
peer.init();

module.exports = {
  peer,
};
