const {createPool} = require("mysql");
var pool  = createPool({
  connectionLimit : 10,
  host     : process.env.MY_SQL_DB_HOST || `203.114.108.46`,
  user     : process.env.MY_SQL_DB_USER || 'root',
  password : process.env.MY_SQL_DB_PASSWORD || '',
  database : process.env.MY_SQL_DB_DATABASE || 'tong_dev',
  port:process.env.MY_SQL_DB_PORT || 8080,
  timeout:200000
}); 
module.exports = pool;