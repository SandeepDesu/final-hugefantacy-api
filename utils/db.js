var mysql = require('mysql');

var connection = mysql.createPool({
    host: "35.188.113.10",
    port: "3306",
    user: "hugefantacy",
    password: "India1947",
    database: "hugefantacy"
});

module.exports = connection;