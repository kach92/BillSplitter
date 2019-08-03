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
        let query = 'SELECT x.user_id,x.net,users.name,x.group_id FROM users INNER JOIN (SELECT user_id,SUM(net) AS net,pay_to_id,group_id FROM net_table GROUP BY user_id,pay_to_id,group_id,paid HAVING user_id =$1 AND NOT paid=true ORDER BY group_id) AS x ON (users.id = x.pay_to_id) ORDER BY x.group_id';

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
        let query = 'SELECT groups.id AS group_id,users.id AS user_id, users.name AS user_name,groups.name AS group_name FROM groups INNER JOIN users_groups ON(groups.id = users_groups.group_id) INNER JOIN users ON (users_groups.user_id = users.id) WHERE groups.id = $1 ORDER BY users.id ASC';
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

    let getGroupCount = (user_id,callback)=>{
        let query = 'SELECT * FROM groups WHERE id IN (SELECT group_id FROM users_groups WHERE user_id=$1 )ORDER BY id DESC';
        let arr = [user_id]
        dbPoolInstance.query(query,arr,(error, queryResult) => {
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

    let getSingleGroup = (group_id,callback)=>{
        let query = 'SELECT * FROM groups WHERE id = $1';
        let arr = [group_id]
        dbPoolInstance.query(query,arr,(error, queryResult) => {
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

    let getSingleGroupWithBillDetails = (group_id,user_id,callback)=>{
        let query = 'SELECT x.user_id,x.net,users.name,users.id AS friend_id,x.group_id FROM users INNER JOIN (SELECT user_id,SUM(net) AS net,pay_to_id,group_id FROM net_table GROUP BY user_id,pay_to_id,group_id HAVING user_id =$1 AND group_id =$2 ORDER BY group_id) AS x ON (users.id = x.pay_to_id) ORDER BY x.group_id'
        let arr = [user_id,group_id]
        dbPoolInstance.query(query,arr,(error, queryResult) => {
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

    let updateGroupProfilePic = (group_id,image_url,callback)=>{
        let query = "UPDATE groups SET image=$1 WHERE id=$2 RETURNING *"
        let arr = [image_url,group_id];

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



    return {
        newGroup,
        userGroupLink,
        getAllGroupsWithBillDetails,
        getUsersInGroup,
        getAllGroups,
        getGroupCount,
        getSingleGroup,
        getSingleGroupWithBillDetails,
        updateGroupProfilePic
    };
};