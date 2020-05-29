var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_ngojef',
  password        : '4186',
  database        : 'cs340_ngojef'
});

module.exports.pool = pool;
