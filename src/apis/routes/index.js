/* eslint-disable import/no-unresolved */
const express = require('express');

const {
  node: { buildNumber, serviceName },
} = require('@config');

const HttpResponseHandler = require('@root/src/common/libs/HttpResponseHandler');

const router = express.Router();

const v1Routes = require('./v1');

// Health Check
router.get('/healthcheck', (req, res) => {
  const data = {
    ts: new Date(),
    buildNumber,
    serviceName,
  };
  return HttpResponseHandler.success(req, res, data);
});

router.use('/v1', v1Routes);

module.exports = router;
