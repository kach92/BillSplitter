/*
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 * ======             CONFIGURATION          =========
 * ===================================================
 * ===================================================
 * ===================================================
 * ===================================================
 */



const pg = require('pg');
const url = require('url');

var configs;

if( process.env.DATABASE_URL ){

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  configs = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };

}else{
  configs = {
    user: 'kach92',
    host: '127.0.0.1',
    database: 'blitt',
    port: 5432,
    password:"Kenny Ang"
  };
}


const pool = new pg.Pool(configs);

pool.on('error', function (err) {
  console.log('idle client error', err.message, err.stack);
});

const allMainModelsFunction = require('./models/main');
const allUserModelsFunction = require('./models/user');
const allGroupModelsFunction = require('./models/group');
const mainModelsObject = allMainModelsFunction( pool );
const userModelsObject = allUserModelsFunction( pool );
const groupModelsObject = allGroupModelsFunction(pool)

module.exports = {

  queryInterface: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
  pool:pool,

  main: mainModelsObject,
  user: userModelsObject,
  group: groupModelsObject
};
