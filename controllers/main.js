var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

var checkCookie = function(request) {
    return (sha256(request.cookies["user_id"] + 'logged_in' + SALT) === request.cookies["logged_in"]) ? true : false;
}

module.exports = (db) => {

    let redirectControllerCallback = (request, response) => {
        response.redirect("/blitt");
    }
    let indexControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let data = {
                title: "Home",
                cookieAvailable:cookieAvailable
            }
            response.render("views/index",data)
        } else {
            response.redirect('/blitt/login')
        }


    };

    return {
        index: indexControllerCallback,
        redirect: redirectControllerCallback
    };

}