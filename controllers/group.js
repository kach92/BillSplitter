var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

var checkCookie = function(request) {
    return (sha256(request.cookies["user_id"] + 'logged_in' + SALT) === request.cookies["logged_in"]) ? true : false;
}

let timeConverted = function(time) {
    let curretTime = new Date();
    let timeAgo = curretTime - time;

    var day, hour, minute, seconds;
    seconds = Math.floor(timeAgo / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;

    let date = time.getDate();
    let monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let month = monthArray[time.getMonth()]
    if (day > 0) {
        return `${date} ${month}`
    } else {
        if (hour > 0) {
            return `${hour} hours ago`;
        } else {
            return `${minute} mins ago`;
        }
    }


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
        let user_id = request.cookies["user_id"];
        if (cookieAvailable) {
            db.group.getAllGroupsWithBillDetails(user_id, (error, result) => {
                if (result) {
                    let billsByGroup = result;
                    db.group.getAllGroups(user_id, (error, result2) => {
                        if (result2) {

                            let groupDetails = result2;
                            let resultArray = []

                            for(let i=0;i<groupDetails.length;i++){
                                let group_id = groupDetails[i].group_id
                                for(let j=0;j<billsByGroup.length;j++){
                                    if(billsByGroup[i].group_id === group_id){
                                        if(billsByGroup[i].)
                                    }
                                }

                                let obj = {
                                    group_id: group_id,
                                    group_name:groupDetails[i].group_name,

                                }

                                resultArray.push(obj);
                            }






                            response.render('views/group_list', data);
                            let data = {
                                title: "Group List",
                                cookieAvailable: cookieAvailable,
                                result: result
                            }
                        } else {
                            response.send("CANT GET GROUPS")
                        }

                    })
                } else {
                    response.send("CANT GET BILLS")
                }

            })
        } else {
            response.redirect('/blitt/login')
        }
    }

    let singleGroupControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];

            db.bill.getAllBillsByGroup(user_id, request.params.id, (error, result) => {
                if (result) {
                    for (let i = 0; i < result.length; i++) {
                        result[i].created_at = timeConverted(result[i].created_at);
                    }

                    let data = {
                        title: "Group List",
                        cookieAvailable: cookieAvailable,
                        group_id: request.params.id,
                        billList: result
                    }

                    response.render("views/single_group", data)
                } else {
                    response.send("QUERY FOR BILL LIST FAIL")
                }


            })

        } else {
            response.redirect('/blitt/login')
        }
    }


    return {
        createGroup: createGroupControllerCallback,
        createGroupPost: createGroupPostControllerCallback,
        listAll: listAllGroupControllerCallback,
        singleGroup: singleGroupControllerCallback

    };

}