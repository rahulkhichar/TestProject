const express = require('express');

const router = express.Router();

const CsvToJsonConvertercontroller = require('@controllers/v1/CsvToJsonConverter');
const HttpResponseHandler = require('@root/src/common/libs/HttpResponseHandler');

router.get('/', async (req, res, next) => {
  try {
    const result = await CsvToJsonConvertercontroller.convertCsvToJson();
    HttpResponseHandler.success(req, res, result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
