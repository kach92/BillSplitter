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

    let logoutControllerCallback = (request,response) => {
        response.cookie("logged_in","SALT")
        response.redirect("/blitt/login")
    }



    return {
        login: loginControllerCallback,
        loginPost: loginPostControllerCallback,
        register: registerControllerCallback,
        registerPost: registerPostControllerCallback,
        logout:logoutControllerCallback

    };

}