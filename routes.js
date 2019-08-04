var multer = require('multer');
var upload = multer({
    dest: './uploads/'
});
var cloudinary = require('cloudinary');
var configForCloudinary = require("./config.json");
cloudinary.config(configForCloudinary);

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
  app.get('/blitt/friendList',userControllerCallbacks.listFriends);
  app.get('/blitt/friendList/:friend_id',userControllerCallbacks.getFriendBills);
  app.post('/blitt/friendList/:friend_id/settleByUser',userControllerCallbacks.settleByUser);
  app.get('/blitt/groupList/:id',groupControllerCallbacks.singleGroup);
  app.get('/blitt/groupList/:id/chooseWhoToSettleInGroup',groupControllerCallbacks.chooseSettleByGroup)
  app.get('/blitt/groupList/:id/newBill',billControllerCallbacks.newBill)
  app.get('/blitt/groupList/:id/group_profile',groupControllerCallbacks.groupProfile)
  app.post('/blitt/groupList/:id/groupProfilePost',upload.single('myFile'),groupControllerCallbacks.groupProfilePost)
  app.post('/blitt/groupList/:id/addInBill',billControllerCallbacks.newBillPost);
  app.post('/blitt/groupList/:group_id/chooseWhoToSettleInGroup/:settler_id',billControllerCallbacks.settleGroupBill);
  app.get('/blitt/groupList/:id/:billId',billControllerCallbacks.singleBill);

  app.get('/blitt/groupList/:id/:billId/editBill',billControllerCallbacks.editBill);
  app.post('/blitt/groupList/:id/:billId/editBill',billControllerCallbacks.editBillPost);
  app.post('/blitt/groupList/:id/:billId/deleteBill',billControllerCallbacks.deleteBill)
  app.get('/blitt/user_profile',userControllerCallbacks.userProfile);
  app.post('/blitt/user_profile/postProfilePic',upload.single('myFile'),userControllerCallbacks.postProfilePic),
  app.get('/blitt/activityList',mainControllerCallbacks.getAllActivities)
};

