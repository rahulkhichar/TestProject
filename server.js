'use strict';

require('module-alias/register');

const InitApp = require('./src/InitApp');

const express = require('express');
const cors = require('cors');

const router = require('./src/apis/routes');
const config = require('./src/config');

const app = express();
InitApp(app).then(() => {
  app.use(express.json({ limit: '1mb' }));
  app.use(
    express.urlencoded({
      limit: '1mb',
      extended: true,
    }),
  );

  app.use(cors());

  app.use(config.node.pathPrefix, router);
  app.use(async (error, req, res, next) => {
    try {
      console.log(error);
    } catch (err) {
      await err.handleError(req, res);
    }
  });
  const server = app.listen(config.node.port, () => {
    console.log({ msg: `Base URL: http://${config.node.host}:${config.node.port}${config.node.pathPrefix}` });
  });
});
