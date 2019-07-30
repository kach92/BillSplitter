var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

module.exports = (dbPoolInstance) => {

    let registerPost = (registerInfo, callback) => {
        let query = 'INSERT INTO users (name,password) VALUES ($1,$2) RETURNING *';
        let arr = [registerInfo.name, registerInfo.password]
        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, true);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    let loginPost = (loginInfo, callback) => {
        let query = 'SELECT * FROM users WHERE name = $1';
        let arr = [loginInfo.name]
        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    };

    let getAllUsers = (callback) => {
        let query = 'SELECT * FROM users';
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows);
                } else {
                    callback(null, null);
                }
            }
        });

    }

    let getSingleUserByName = (user_name, callback) => {

        let query = 'SELECT * FROM users WHERE name = $1'
        let arr = [user_name]
        dbPoolInstance.query(query, arr,(error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });
    }

    return {
        registerPost,
        loginPost,
        getAllUsers,
        getSingleUserByName
    };
};