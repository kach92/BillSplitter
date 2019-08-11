var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

module.exports = (dbPoolInstance) => {

    let registerPost = (registerInfo, callback) => {
        let query = 'INSERT INTO users (name,password,image,mobile) VALUES ($1,$2,$3,$4) RETURNING *';
        let arr = [registerInfo.name, registerInfo.password, registerInfo.image, registerInfo.mobile]
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

    let getSingleUserByName = (valuesInBracs, callback) => {

        let query = `SELECT id FROM users WHERE name IN ${valuesInBracs}`
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
        let query = "SELECT DISTINCT net_table.pay_to_id,users.name,users.image FROM net_table INNER JOIN users ON (users.id = net_table.pay_to_id) WHERE net_table.user_id = $1 ORDER BY pay_to_id DESC"
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

    let getAllFriend1to1Bills = (user_id, friend_id, callback) => {
        let query = "SELECT x.user_id,x.net,users.id AS pay_to_id,users.name,x.group_id,groups.name AS group_name,groups.image,users.mobile FROM users INNER JOIN (SELECT user_id,SUM(net) AS net,pay_to_id,group_id FROM net_table WHERE paid =false GROUP BY user_id,pay_to_id,group_id HAVING user_id =$1 ORDER BY group_id) AS x ON (users.id = x.pay_to_id) INNER JOIN groups ON (groups.id = x.group_id) WHERE pay_to_id =$2 ORDER BY x.group_id,users.id"
        let arr = [user_id, friend_id]
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

    let getSingleUser = (friend_id, callback) => {
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

    let checkIfUserExist = (register_details, callback) => {
        let query = "SELECT EXISTS (SELECT * FROM users WHERE name=$1)"
        let arr = [register_details.name];

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

    let getUserDetail = (user_id, callback) => {
        let query = "SELECT * FROM users WHERE id = $1"
        let arr = [user_id];

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

    let updateProfilePic = (user_id, image_url, callback) => {
        let query = "UPDATE users SET image=$1 WHERE id=$2 RETURNING *"
        let arr = [image_url, user_id];

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

    let updateUserProfile = (user_id, new_details,callback) => {
        let query = "UPDATE users SET name=$1,mobile=$2 WHERE id=$3 RETURNING *"
        let arr = [new_details.name,new_details.mobile,user_id];

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

    let updatePassword = (new_password, user_id,callback) => {
        let query = "UPDATE users SET password=$1 WHERE id=$2 RETURNING *"
        let arr = [new_password,user_id];

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
        getSingleUser,
        checkIfUserExist,
        getUserDetail,
        updateProfilePic,
        updateUserProfile,
        updatePassword
    };
};