var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

module.exports = (dbPoolInstance) => {

    // `dbPoolInstance` is accessible within this function scope

    let createNewBillInGroup = (group_id,callback) => {

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

    return {
        createNewBillInGroup,
    };
};