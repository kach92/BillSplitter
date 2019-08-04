var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let getAll = (callback) => {

        let query = 'SELECT * FROM pokemons';

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
    };

    let updateActivity = (user_id, user_name, bill_id, category, group_id, bill_name, callback) => {

        if (category === "added") {
            let query = "SELECT name FROM groups WHERE id = $1";
            let arr = [group_id];
            dbPoolInstance.query(query, arr, (error, queryResult) => {
                if (error) {
                    callback(error, null);
                } else {
                    if (queryResult.rows.length > 0) {
                        let group_name = queryResult.rows[0].name;
                        let sentence = group_name
                        let query2 = "INSERT INTO activity(user_id,user_name,category,activity,bill_id,group_id,bill_name)VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *"
                        let arr2 = [user_id, user_name, category, sentence, bill_id, group_id, bill_name]
                        dbPoolInstance.query(query2, arr2, (error, queryResult) => {
                            if (error) {
                                callback(error, null);
                            } else {
                                if (queryResult.rows.length > 0) {
                                    callback(null, true)
                                } else {
                                    callback(null, null)
                                }
                            }
                        })

                    } else {
                        callback(null, null);

                    }
                }
            });

        }


    }

    let getAllActivities = (user_id, callback) => {
        let query = "SELECT * FROM activity WHERE group_id IN (SELECT group_id FROM users_groups WHERE user_id = $1) OR user_id = $1 OR other_user_id = $1 ORDER BY id DESC"
        let arr = [user_id]
        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows)

                } else {
                    callback(null, null);

                }
            }
        });
    }

    let updateActivityForCreateGroup = (user_id, user_name, category, group_id, group_name, callback) => {

        let query = "INSERT INTO activity(user_id,user_name,activity,category,group_id)VALUES ($1,$2,$3,$4,$5) RETURNING *";
        let arr = [user_id, user_name, group_name, category, group_id];
        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {

                if (queryResult.rows.length > 0) {
                    callback(error, true)
                } else {
                    callback(null, null)
                }

            }
        });



    }

    let updateActivityForSettleByGroup = (user_id, user_name, other_user_id, category, group_id, amount, callback) => {

        let query = "SELECT name FROM users WHERE id = $1";
        let arr = [other_user_id];
        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {

                if (queryResult.rows.length > 0) {
                    let other_user_name = queryResult.rows[0].name;
                    let query2 = "SELECT name FROM groups WHERE id = $1";
                    let arr2 = [group_id];
                    dbPoolInstance.query(query2, arr2, (error, queryResult2) => {
                        if (error) {
                            callback(error, null);
                        } else {

                            if (queryResult2.rows.length > 0) {
                                group_name = queryResult2.rows[0].name
                                let query3 = "INSERT INTO activity (user_id,user_name,other_user_id,other_user_name,activity,category,group_id,amount) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
                                let arr3 = [user_id, user_name, other_user_id, other_user_name, group_name, category, group_id, amount];
                                dbPoolInstance.query(query3, arr3, (error, queryResult3) => {
                                    if (error) {
                                        callback(error, null);
                                    } else {

                                        if (queryResult3.rows.length > 0) {
                                            callback(null, true)
                                        } else {
                                            callback(null, null)
                                        }

                                    }
                                });
                            } else {
                                callback(null, null)
                            }

                        }
                    });
                } else {
                    callback(null, null)
                }

            }
        });



    }

    let updateActivityForSettle = (user_id, user_name, other_user_id, category, amount, callback) => {

        let query = "SELECT name FROM users WHERE id = $1";
        let arr = [other_user_id];
        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);
            } else {
                if (queryResult.rows.length > 0) {
                    let other_user_name = queryResult.rows[0].name;

                    let query3 = "INSERT INTO activity (user_id,user_name,other_user_id,other_user_name,category,amount) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *";
                    let arr3 = [user_id, user_name, other_user_id, other_user_name, category, amount];
                    dbPoolInstance.query(query3, arr3, (error, queryResult3) => {
                        if (error) {
                            callback(error, null);

                        } else {

                            if (queryResult3.rows.length > 0) {
                                callback(null, true)
                            } else {
                                callback(null, null)
                            }

                        }
                    });

                } else {
                    callback(null, null)
                }

            }
        });
    }



    return {
        getAll,
        updateActivity,
        getAllActivities,
        updateActivityForCreateGroup,
        updateActivityForSettleByGroup,
        updateActivityForSettle

    };
};