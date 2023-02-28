const fs = require('fs');

const parse = require('csv-parse');

const Userservice = require('@services/v1/User');

const convertCsvToJson = async () => {
  const path = '/home/rahulkhichar/Downloads/assignment.csv';
  const csvData = [];
  const data = [];
  let result = null;
  fs.createReadStream(path)
    .pipe(parse.parse({ delimiter: ',' }))
    .on('data', (csvrow) => {
      if (csvrow[0] !== 'name.firstName') {
        data.push({
          name: `${csvrow[0]} ${csvrow[1]}`,
          age: parseInt(csvrow[2], 10),
          address: {
            line1: csvrow[3],
            line2: csvrow[4],
            city: csvrow[5],
            state: csvrow[6],
          },
          gender: csvrow[7],
        });
        csvData.push(csvrow);
      }
    })
    .on('end', async () => {
      result = await Userservice.addUsers(data);
      console.log(csvData);
    });
  return result;
};

module.exports = { convertCsvToJson };
