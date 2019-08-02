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
    }

    let getAllRelatedFriends = (user_id, callback) => {
        let query = 'SELECT x.user_id,x.net,users.id AS pay_to_id,users.name,x.group_id,groups.name AS group_name FROM users INNER JOIN (SELECT user_id,SUM(net) AS net,pay_to_id,group_id FROM net_table WHERE paid =false GROUP BY user_id,pay_to_id,group_id HAVING user_id =$1 ORDER BY group_id) AS x ON (users.id = x.pay_to_id) INNER JOIN groups ON (groups.id = x.group_id) ORDER BY x.group_id,users.id'
        let arr = [user_id]
        dbPoolInstance.query(query, arr, (error, queryResult) => {
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

    let getAllFriendsRelatedToUser = (user_id, callback) => {
        let query = "SELECT DISTINCT net_table.pay_to_id,users.name FROM net_table INNER JOIN users ON (users.id = net_table.pay_to_id) WHERE net_table.user_id = $1"
        let arr = [user_id]
        dbPoolInstance.query(query, arr, (error, queryResult) => {
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

    let getAllFriend1to1Bills = (user_id,friend_id,callback)=>{
        let query = "SELECT x.user_id,x.net,users.id AS pay_to_id,users.name,x.group_id,groups.name AS group_name FROM users INNER JOIN (SELECT user_id,SUM(net) AS net,pay_to_id,group_id FROM net_table WHERE paid =false GROUP BY user_id,pay_to_id,group_id HAVING user_id =$1 ORDER BY group_id) AS x ON (users.id = x.pay_to_id) INNER JOIN groups ON (groups.id = x.group_id) WHERE pay_to_id =$2 ORDER BY x.group_id,users.id"
        let arr = [user_id,friend_id]
        dbPoolInstance.query(query, arr, (error, queryResult) => {
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

    let getSingleUser = (friend_id,callback)=>{
        let query = "SELECT * FROM users WHERE id = $1"
        let arr = [friend_id];

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
    }



    return {
        registerPost,
        loginPost,
        getAllUsers,
        getSingleUserByName,
        getAllRelatedFriends,
        getAllFriendsRelatedToUser,
        getAllFriend1to1Bills,
        getSingleUser
    };
};