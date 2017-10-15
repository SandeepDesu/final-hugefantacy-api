var connection = require('../utils/db');



function AuthLoginSchema() {
   this.conn = connection;
}


AuthLoginSchema.prototype.getAll = function () {
    this.conn.query('select * FROM authlogin', callback);
};

AuthLoginSchema.prototype.getByid = function (id,callback) {
    this.conn.query('select * FROM authlogin WHERE id = ' + id, callback);
};

AuthLoginSchema.prototype.create = function (authInfo) {
    this.conn.query("insert into authlogin SET ?", authInfo, function (err, results) {
        if (results) {
            authInfo.id = results.insertId;
        }
        callback(err, authInfo);
    });
};

AuthLoginSchema.prototype.update = function (id,data,callback) {
    this.conn.query('UPDATE authlogin SET ? WHERE id = ' + id, data, function (err) {
        callback(err, data);
    });
};

AuthLoginSchema.prototype.delete = function (id,callback) {
    this.conn.query('DELETE FROM authlogin WHERE id = ' + id, callback);
};

module.exports = AuthLoginSchema;