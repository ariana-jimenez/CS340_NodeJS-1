var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_ngojef',
  password        : '',
  database        : 'cs340_ngojef'
});

module.exports.pool = pool;
