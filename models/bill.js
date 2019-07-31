var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";
const format = require('pg-format');

module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let createNewBillInGroup = (group_id, bill_info, callback) => {

        let query = 'INSERT INTO bills (amount,category,description,group_id,paid_by_user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *';
        let arr = [bill_info.bill_amount, bill_info.bill_category, bill_info.bill_description, group_id, bill_info.payer];
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

    let createUserBillLink = (bill_id, group_id, bill_info, callback) => {
        let query = 'SELECT user_id FROM users_groups WHERE group_id = $1 ORDER BY user_id ASC';
        let arr = [group_id];
        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);

            } else {
                if (queryResult.rows.length > 0) {
                    let user_id_arrObj = queryResult.rows
                    let valuesArr = [];
                    for (let i = 0; i < user_id_arrObj.length; i++) {
                        valuesArr.push([user_id_arrObj[i].user_id, bill_id, bill_info.split_amount[i]]);
                    }
                    let query = format('INSERT INTO users_bills (user_id,bill_id,split_amount) VALUES %L RETURNING *', valuesArr);
                    dbPoolInstance.query(query, (error, queryResult) => {
                        if (error) {
                            console.log(error);
                            callback(error, null);

                        } else {
                            if (queryResult.rows.length > 0) {
                                callback(null, true);

                            } else {
                                callback(null, null);


                            }
                        }
                    });

                } else {
                    callback(null, null);


                }
            }
        });
    };

    let updateNetTable = (group_id, split_array, payer_id, callback) => {
        let query = 'SELECT user_id FROM users_groups WHERE group_id = $1 ORDER BY user_id ASC';
        let arr = [group_id];
        dbPoolInstance.query(query, arr, (error, queryResult) => {
            if (error) {
                callback(error, null);

            } else {
                if (queryResult.rows.length > 0) {


                    let user_id_arrObj = queryResult.rows
                    let valuesArr = [];
                    for (let i = 0; i < user_id_arrObj.length; i++) {
                        if (parseInt(payer_id) !== parseInt(user_id_arrObj[i].user_id)) {
                            valuesArr.push([user_id_arrObj[i].user_id, split_array[i], payer_id, group_id]);
                            valuesArr.push([payer_id, parseFloat(split_array[i]) * -1, user_id_arrObj[i].user_id, group_id]);
                        }

                    }
                    let query = format('INSERT INTO net_table (user_id,net,pay_to_id,group_id) VALUES %L RETURNING *', valuesArr);
                    dbPoolInstance.query(query, (error, queryResult) => {
                        if (error) {
                            console.log(error);
                            callback(error, null);

                        } else {
                            if (queryResult.rows.length > 0) {
                                callback(null, true);

                            } else {
                                callback(null, null);


                            }
                        }
                    });

                } else {
                    callback(null, null);
                }
            }
        })
    }

    let getAllBillsByGroup = (user_id, group_id, callback) => {
        let query = 'SELECT users_bills.user_id AS user_id,bills.id AS bill_id, bills.category,bills.description,bills.created_at, split_amount,bills.paid_by_user_id AS payer_id,bills.amount,users.name AS payer_name FROM bills INNER JOIN users_bills ON ( bills.id = users_bills.bill_id) INNER JOIN users ON (bills.paid_by_user_id = users.id) WHERE bills.group_id = $1 AND users_bills.user_id = $2 ORDER BY bills.id DESC';
        let arr = [group_id, user_id];
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
    };

    return {
        createNewBillInGroup,
        createUserBillLink,
        getAllBillsByGroup,
        updateNetTable

    };
};