const express = require('express');

const router = express.Router();

const CsvToJsonConverter = require('./CsvToJsonConverter');

router.use('/convert', CsvToJsonConverter);

module.exports = router;
