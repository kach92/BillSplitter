var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

var checkCookie = function(request) {
    return (sha256(request.cookies["user_id"] + 'logged_in' + SALT) === request.cookies["logged_in"]) ? true : false;
}

module.exports = (db) => {

    let createGroupControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            db.user.getAllUsers((error, result) => {
                let data = {
                    title: "Create Group",
                    cookieAvailable: cookieAvailable,
                    allUsers: result
                }
                response.render('views/create_group', data);
            })
        } else {
            response.redirect('/blitt/login')
        }
    }

    let createGroupPostControllerCallback = (request, response) => {
        db.group.newGroup(request.body, (error, result) => {

            if (result) {
                let group_id = result.id;
                let user_array = request.body.selected_users.split(",")

                for (let i = 0; i < user_array.length; i++) {
                    db.user.getSingleUserByName(user_array[i], (error, result2) => {

                        if (result2) {
                            let user_id = result2.id
                            db.group.userGroupLink(group_id, user_id, (error, result3) => {

                                if (result3) {
                                    console.log("OK")

                                } else {
                                    response.send("SOMETHING WRONG");
                                }
                            })
                        } else {
                            response.send("SOMETHING WRONG")
                        }
                    })


                }

                setTimeout(function() {
                    response.redirect("/blitt")
                }, 1000)

            } else {
                response.send("ATTEND LATER");
            }

        })

    }

    let listAllGroupControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            db.group.getAllGroups((error, result) => {
                let data = {
                    title: "Group List",
                    cookieAvailable: cookieAvailable,
                    allGroups: result
                }
                response.render('views/group_list', data);
            })
        } else {
            response.redirect('/blitt/login')
        }
    }

    let singleGroupControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            db.group.getAllGroups((error, result) => {
                let data = {
                    title: "Group List",
                    cookieAvailable: cookieAvailable,
                    allGroups: result
                }
                response.render('views/group_list', data);
            })
        } else {
            response.redirect('/blitt/login')
        }
    }


    return {
        createGroup: createGroupControllerCallback,
        createGroupPost: createGroupPostControllerCallback,
        listAll: listAllGroupControllerCallback,
        singleGroup:singleGroupControllerCallback

    };

}