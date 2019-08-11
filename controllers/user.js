var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";
var multer = require('multer');
var upload = multer({
    dest: './uploads/'
});
var cloudinary = require('cloudinary');
var configForCloudinary;
if (process.env.CLOUDINARY_URL) {
    configForCloudinary = process.env.CLOUDINARY_URL;
} else {
    configForCloudinary = require("../config.json");
}
cloudinary.config(configForCloudinary);
const format = require('pg-format');

var checkCookie = function(request) {
    return (sha256(request.cookies["user_id"] + 'logged_in' + SALT) === request.cookies["logged_in"]) ? true : false;
}

module.exports = (db) => {

    let loginControllerCallback = (request, response) => {
        if (checkCookie(request)) {
            response.send("YOU ARE ALREADY LOGGED IN")
        } else {
            data = {
                title: "Login",
                failLogin: false
            }

            if (request.query.failLogin === "true") {
                data.failLogin = true
            }

            if (request.query.register) {
                data["register"] = true
            }

            response.render('views/login', data);
        }

    }

    let registerControllerCallback = (request, response) => {
        if (checkCookie(request)) {
            response.send("YOU ARE ALREADY LOGGED IN")
        } else {

            data = {
                title: "Register",
                exists: false,
                password: false
            }

            if (request.query.exists === "true") {
                data.exists = true
            }

            if (request.query.password === "false") {
                data.password = true
            }
            response.render('views/register', data);

        }

    }

    let registerPostControllerCallback = (request, response) => {
        if (request.body.password === request.body.confirmPassword) {
            request.body.password = sha256(request.body.password);

            db.user.checkIfUserExist(request.body, (error, result) => {
                if (result) {
                    if (result.exists) {
                        response.redirect("/blitt/register?exists=true")
                    } else {
                        db.user.registerPost(request.body, (error, result) => {
                            if (error) {
                                console.log(error)
                                console.log("REGISTER UNSUCCESSFUL")
                            } else {
                                if (result) {
                                    console.log("register successful");
                                    response.redirect("/blitt/login?register=true");
                                } else {
                                    console.log("register null")
                                }
                            }
                        })
                    }
                } else {
                    response.send("CANT CHECK EXISTS")
                }
            })



        } else {
            response.redirect("/blitt/register?password=false")
        }


    }

    let loginPostControllerCallback = (request, response) => {

        request.body.password = sha256(request.body.password);
        db.user.loginPost(request.body, (error, result) => {
            if (error) {
                console.log(error)
                response.redirect("/blitt/login?failLogin=true");
            } else {
                if (result) {

                    if (request.body.password === result.password) {
                        response.cookie("user_id", result.id);
                        response.cookie("user_name", result.name);
                        response.cookie("logged_in", sha256(result.id + "logged_in" + SALT));
                        response.redirect("/blitt");
                    } else {
                        response.redirect("/blitt/login?failLogin=true");

                    }
                } else {
                    response.redirect("/blitt/login?failLogin=true");
                }
            }
        })
    }

    let listFriendsControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
            let user_name = request.cookies["user_name"];
            db.user.getAllRelatedFriends(user_id, (error, result) => {
                if (result) {
                    let friends_owe_details = result
                    db.user.getAllFriendsRelatedToUser(user_id, (error, result2) => {
                        if (result2) {

                            friends_details = result2;
                            let user_total = 0;
                            let resultObj = []
                            for (let i = 0; i < friends_details.length; i++) {
                                let group_net = friends_owe_details.filter(x => x.pay_to_id === friends_details[i].pay_to_id).map(x => {
                                    return {
                                        group_name: x.group_name,
                                        net: x.net,
                                        group_id: x.group_id
                                    }
                                });
                                let user_net = group_net.reduce((total, obj) => obj.net * -1 + total, 0)
                                user_total += user_net;
                                let temp = {
                                    friend_name: friends_details[i].name,
                                    friend_id: friends_details[i].pay_to_id,
                                    group_net: group_net,
                                    user_net: user_net,
                                    friend_image: friends_details[i].image

                                }
                                resultObj.push(temp);


                            }

                            resultObj.sort((b, a) => Math.abs(parseFloat(a.user_net)) - Math.abs(parseFloat(b.user_net)));

                            let data = {
                                title: "Friend List",
                                cookieAvailable: cookieAvailable,
                                result: resultObj,
                                user_total: parseFloat(user_total).toFixed(2),
                                user_name: user_name
                            }
                            db.user.getUserDetail(user_id, (error, result) => {
                                if (result) {
                                    data["user_details"] = result;
                                    response.render('views/friends_list', data);
                                } else {
                                    response.send("CANT GET USER DETAIL")
                                }
                            })

                        } else {
                            response.send("CANT GET ALL FRIENDS RELATED TO")
                        }
                    })
                } else {
                    response.send("CANT QUERY FOR FRIENDS DETAILS")
                }
            })
        } else {
            response.redirect('/blitt/login')
        }
    }


    let getFriendBillsControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let friend_id = request.params.friend_id;
            let user_id = request.cookies["user_id"];
            let user_name = request.cookies["user_name"];
            db.user.getAllFriend1to1Bills(user_id, friend_id, (error, result) => {
                if (result) {

                    let user_net = 0;
                    for (let i = 0; i < result.length; i++) {
                        user_net += parseFloat(result[i].net * -1)
                    }
                    let data = {
                        title: "Friend Bill",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        user_id: user_id,
                        friend_id: friend_id,
                        user_net: parseFloat(user_net).toFixed(2),
                        user_name: user_name
                    }

                    db.user.getSingleUser(friend_id, (error, result) => {
                        if (result) {
                            data["friend_details"] = result;
                            response.render('views/single_friend', data);
                        } else {
                            response.send("CANT GET FRIENDS DETAILS")
                        }
                    })

                } else {
                    response.send("CANT GET FRIENDS BILLS DETAILS")
                }
            })
        } else {
            response.send("YOU ARE NOT LOGGED IN")
        }
    }

    let settleByUserControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let friend_id = request.params.friend_id;
            let user_id = request.cookies["user_id"];
            let amountToShow = request.body.amount;
            let user_name = request.cookies["user_name"]
            db.bill.settleNetTableForUserOnly(user_id, friend_id, (error, result) => {
                if (result) {
                    db.bill.settleSplitAmountByUser(user_id, friend_id, (error, result) => {
                        if (result) {
                            db.main.updateActivityForSettle(user_id, user_name, friend_id, "settled", amountToShow, (error, result) => {

                                if (result) {
                                    response.redirect("/blitt/friendList")
                                } else {
                                    response.send("UNABLE TO UPDATE ACTIVITY FOR SETTLING DEBT")
                                }
                            })


                        } else {
                            response.send("UNABLE TO UPDATE SPLIT TABLE")
                        }

                    })
                } else {
                    response.send("UNABLE TO UPDATE NET TABLE")
                }

            })
        } else {
            response.send("YOU ARE NOT LOGGED IN")
        }
    }

    let userProfileControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
            let user_name = request.cookies["user_name"]
            db.user.getUserDetail(user_id, (error, result) => {
                if (result) {
                    let data = {
                        title: "User Profile",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        user_id: user_id,
                        user_name: user_name
                    }
                    if(request.query.password === "true"){
                        data["password"] = true
                    }
                    if(request.query.edit === "true"){
                        data["edit"] = true
                    }
                    response.render('views/user_profile', data)
                } else {
                    response.send("CANT GET USER DETAILS");
                }
            })
        } else {
            response.send("YOU ARE NOT LOGGED IN")
        }
    }

    let postProfilePicControllerCallback = (request, response) => {
        let user_id = request.cookies["user_id"]
        cloudinary.uploader.upload(request.file.path, function(result) {
            db.user.updateProfilePic(user_id, result.url, (error, result) => {
                if (result) {
                    response.redirect("/blitt/user_profile")
                } else {
                    response.send("FAIL TO UPDATE IMAGE")
                }
            })
        });

    }

    let editProfileControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
            let user_name = request.cookies["user_name"]
            db.user.getUserDetail(user_id, (error, result) => {
                if (result) {
                    let data = {
                        title: "Edit Profile",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        user_id: user_id,
                        user_name: user_name
                    }
                    response.render('views/edit_profile', data)
                } else {
                    response.send("CANT GET USER DETAILS");
                }
            })
        } else {
            response.send("YOU ARE NOT LOGGED IN")
        }
    }

    let editProfilePostControllerCallback = (request, response) => {
        let user_id = request.cookies["user_id"];
        let newDetail = request.body
        db.user.updateUserProfile(user_id, newDetail,(error, result) => {
            if (result) {
                response.cookie("user_name", result.name);
                response.redirect('/blitt/user_profile?edit=true')
            } else {
                response.send("CANT UPDATE USER PROFILE");
            }
        })
    }

    let changePasswordControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
            let user_name = request.cookies["user_name"]
            db.user.getUserDetail(user_id, (error, result) => {
                if (result) {
                    let data = {
                        title: "Edit Profile",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        user_id: user_id,
                        user_name: user_name
                    }

                    if(request.query.oriPassword==="true"){
                        data["oriPassword"] = true
                    }
                    response.render('views/change_password', data)
                } else {
                    response.send("CANT GET USER DETAILS");
                }
            })
        } else {
            response.send("YOU ARE NOT LOGGED IN")
        }
    }

    let changePasswordPostControllerCallback = (request, response) => {
        if (sha256(request.body.oldPassword) === request.body.originalPassword) {
            if(request.body.password === request.body.confirmPassword){
                let user_id = request.cookies["user_id"];
                db.user.updatePassword(sha256(request.body.password),user_id,(error,result)=>{
                    if(result){
                        response.redirect("/blitt/user_profile?password=true")
                    }else{
                        response.send("UNABLE TO UPDATE PASSWORD")
                    }
                })

            }else{
                response.redirect("/blitt/user_profile/change_password?oriPassword=true")
            }

        }else{
            response.redirect("/blitt/user_profile/change_password?oriPassword=true")
        }
    }




    let logoutControllerCallback = (request, response) => {
        response.cookie("logged_in", "SALT")
        response.redirect("/blitt/login")
    }



    return {
        login: loginControllerCallback,
        loginPost: loginPostControllerCallback,
        register: registerControllerCallback,
        registerPost: registerPostControllerCallback,
        logout: logoutControllerCallback,
        listFriends: listFriendsControllerCallback,
        getFriendBills: getFriendBillsControllerCallback,
        settleByUser: settleByUserControllerCallback,
        userProfile: userProfileControllerCallback,
        postProfilePic: postProfilePicControllerCallback,
        editProfile: editProfileControllerCallback,
        editProfilePost: editProfilePostControllerCallback,
        changePassword: changePasswordControllerCallback,
        changePasswordPost: changePasswordPostControllerCallback

    };

}