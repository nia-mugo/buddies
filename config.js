'use strict';

require('dotenv').config();
const fs = require('fs-extra');

const {NODE_ENV} = process.env;
const mySqlConfig = {
  driver: "mysql",
  host: "",
  user: "",
  password: "",
  database: "",
  multipleStatements: true,
  dateStrings: true,
  timezone: "Z",
  charset: "utf8mb4",
  connectionLimit: 20
};


function writeDbConfig() {
  switch(NODE_ENV) {
    case 'development':
    case 'staging':
    case 'production':
      mySqlConfig.host = process.env.DB_HOST;
      mySqlConfig.user = process.env.DB_USER_NAME;
      mySqlConfig.password = process.env.DB_PASSWORD;
      mySqlConfig.database = process.env.DB_NAME;
      break;
    case 'test':
      mySqlConfig.host = process.env.DB_HOST_TEST;
      mySqlConfig.user = process.env.DB_USER_NAME_TEST;
      mySqlConfig.password = process.env.DB_PASSWORD_TEST;
      mySqlConfig.database = process.env.DB_NAME_TEST;
      break;
    default:
      throw new Error('missing NODE_ENV'); 
  }

  fs.writeJsonSync('database.json', {default: mySqlConfig});
}

writeDbConfig();



