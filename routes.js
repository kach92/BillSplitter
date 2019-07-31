module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const mainControllerCallbacks = require('./controllers/main')(allModels);
  const userControllerCallbacks = require('./controllers/user')(allModels);
  const groupControllerCallbacks = require('./controllers/group')(allModels);
  const billControllerCallbacks = require('./controllers/bill')(allModels)

  app.get('/', mainControllerCallbacks.redirect);
  app.get('/blitt', mainControllerCallbacks.index);
  app.get('/blitt/login', userControllerCallbacks.login);
  app.post('/blitt/login', userControllerCallbacks.loginPost);
  app.get('/blitt/register', userControllerCallbacks.register);
  app.post('/blitt/register', userControllerCallbacks.registerPost);
  app.get('/blitt/logout', userControllerCallbacks.logout);
  app.get('/blitt/create_group', groupControllerCallbacks.createGroup);
  app.post('/blitt/create_group',groupControllerCallbacks.createGroupPost);
  app.get('/blitt/groupList',groupControllerCallbacks.listAll);
  app.get('/blitt/groupList/:id',groupControllerCallbacks.singleGroup);
  app.get('/blitt/groupList/:id/newBill',billControllerCallbacks.newBill)
};
