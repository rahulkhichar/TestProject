const fs = require('fs');

const parse = require('csv-parse');

const Userservice = require('@services/v1/User');
const { convertArrayIntoObject } = require('./ConvertDotSeperatedKey');
const { url } = require('@root/src/config');

const convertCsvToJson = async () => {
  const path = `${url}`;
  const csvData = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(parse.parse({ delimiter: ',' }))
      .on('data', (csvrow) => {
        csvData.push(csvrow);
      })
      .on('end', async () => {
        resolve();
        console.log(csvData);
      });
  });

  const insertData = convertArrayIntoObject(csvData);
  await Userservice.addUsers(insertData);

  const ageBetween0To20 = await Userservice.getCount(0, 20);
  const ageBetween20To40 = await Userservice.getCount(20, 40);
  const ageBetween40To60 = await Userservice.getCount(40, 60);
  const ageBetween60To100 = await Userservice.getCount(60, 100);
  const totalSum = ageBetween0To20 + ageBetween20To40 + ageBetween40To60 + ageBetween60To100;
  const factor = 100 / totalSum;

  const resp = [
    { 'Age-Group': 'Age - Group' },
    { '<20': ageBetween0To20 * factor },
    { '>=20 & <40': ageBetween20To40 * factor },

    { '>=40 & <60 ': ageBetween40To60 * factor },
    { '>=60 ': ageBetween60To100 * factor },
  ];
  console.debug(resp);

  return resp;
};

module.exports = { convertCsvToJson };
