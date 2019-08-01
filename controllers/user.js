var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

var checkCookie = function(request) {
    return (sha256(request.cookies["user_id"] + 'logged_in' + SALT) === request.cookies["logged_in"]) ? true : false;
}

module.exports = (db) => {

    let loginControllerCallback = (request, response) => {
        if (checkCookie(request)) {
            response.send("YOU ARE ALREADY LOGGED IN")
        } else {
            data = {
                title: "Login"
            }
            response.render('views/login', data);
        }

    }

    let registerControllerCallback = (request, response) => {
        if (checkCookie(request)) {
            response.send("YOU ARE ALREADY LOGGED IN")
        } else {
            data = {
                title: "Register"
            }
            response.render('views/register', data);
        }

    }

    let registerPostControllerCallback = (request, response) => {
        if (request.body.password === request.body.confirmPassword) {
            request.body.password = sha256(request.body.password);
            db.user.registerPost(request.body, (error, result) => {
                if (error) {
                    console.log(error)
                    console.log("REGISTER UNSUCCESSFUL")
                } else {
                    if (result) {
                        console.log("register successful");
                        response.redirect("/blitt/login");
                    } else {
                        console.log("register null")
                    }
                }
            })
        } else {
            response.redirect("/blitt/register")
        }


    }

    let loginPostControllerCallback = (request, response) => {

        request.body.password = sha256(request.body.password);
        db.user.loginPost(request.body, (error, result) => {
            if (error) {
                console.log(error)
                console.log("LOGIN UNSUCCESSFUL")
            } else {
                if (result) {

                    if (request.body.password === result.password) {
                        response.cookie("user_id", result.id);
                        response.cookie("user_name", result.name);
                        response.cookie("logged_in", sha256(result.id + "logged_in" + SALT));
                        response.redirect("/blitt");
                    } else {
                        response.redirect("/blitt/login");

                    }
                } else {
                    console.log("NO SUCH USER")
                }
            }
        })
    }

    let listFriendsControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
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
                                        net: x.net
                                    }
                                });
                                let user_net = group_net.reduce((total, obj) => obj.net * -1 + total, 0)
                                user_total += user_net;
                                let temp = {
                                    friend_name: friends_details[i].name,
                                    friend_id: friends_details[i].pay_to_id,
                                    group_net: group_net,
                                    user_net: user_net

                                }
                                resultObj.push(temp);

                            }
                            let data = {
                                title: "Friend List",
                                cookieAvailable: cookieAvailable,
                                result: resultObj,
                                user_total:parseFloat(user_total).toFixed(2)
                            }

                            response.render('views/friends_list', data);
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
        listFriends: listFriendsControllerCallback

    };

}