var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

module.exports = (dbPoolInstance) => {

    let newGroup = (group_info, callback) => {
        let query = 'INSERT INTO groups (name) VALUES ($1) RETURNING *';
        let arr = [group_info.group_name];
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

    let userGroupLink = (group_id, user_id, callback) => {
        let query = 'INSERT INTO users_groups (user_id,group_id) VALUES ($1,$2) RETURNING *';
        let arr = [user_id, group_id];
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
    }

    let getAllGroups = (callback) => {
        let query = 'SELECT * FROM groups';
        dbPoolInstance.query(query, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows);
                } else {
                    callback(null, []);
                }
            }
        });
    }

    let getUsersInGroup = (group_id, callback) => {
        let query = 'SELECT groups.id AS group_id,groups.name AS group_name,users.id AS user_id, users.name AS user_name FROM groups INNER JOIN users_groups ON(groups.id = users_groups.group_id) INNER JOIN users ON (users_groups.user_id = users.id) WHERE groups.id = $1 ORDER BY users.id ASC';
        let arr = [group_id]
        dbPoolInstance.query(query, arr,(error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {

                    callback(null, queryResult.rows);
                } else {
                    callback(null, []);
                }
            }
        });
    }



    return {
        newGroup,
        userGroupLink,
        getAllGroups,
        getUsersInGroup
    };
};