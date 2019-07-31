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

    let getAllGroupsWithBillDetails  = (user_id,callback) => {
        let query = 'SELECT user_id, SUM(split_amount),group_id FROM (SELECT users.id AS user_id, users.name AS user_name, users_bills.split_amount,bills.id AS bill_id,bills.paid_by_user_id AS payer_id,groups.id AS group_id FROM groups INNER JOIN bills ON (groups.id = bills.group_id) INNER JOIN users_bills ON (bills.id = users_bills.bill_id) INNER JOIN users ON (users_bills.user_id = users.id) INNER JOIN users_groups ON (groups.id = users_groups.group_id) WHERE users_groups.user_id = $1) AS x GROUP BY user_id,group_id ORDER BY group_id;';

        let arr = [user_id];
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

    let getUsersInGroup = (user_id, callback) => {
        let query = 'SELECT groups.id AS group_id,users.id AS user_id, users.name AS user_name FROM groups INNER JOIN users_groups ON(groups.id = users_groups.group_id) INNER JOIN users ON (users_groups.user_id = users.id) WHERE groups.id = $1 ORDER BY users.id ASC';
        let arr = [user_id]
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

    let getAllGroups = (user_id,callback)=>{
        let query = 'SELECT groups.id AS group_id, groups.name AS group_name FROM groups INNER JOIN users_groups ON (groups.id = users_groups.group_id) WHERE users_groups.user_id = $1' ;
        let arr = [user_id]
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
        getAllGroupsWithBillDetails,
        getUsersInGroup,
        getAllGroups
    };
};