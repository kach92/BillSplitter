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

    let redirectControllerCallback = (request, response) => {
        response.redirect("/blitt");
    }
    let indexControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        let user_name = request.cookies["user_name"]
        let user_id = request.cookies["user_id"]
        if (cookieAvailable) {

            db.bill.getExpensesByUser(user_id, (error, result) => {
                if (result) {
                    let data = {
                        title: "Profile",
                        cookieAvailable: cookieAvailable,
                        user_name: user_name,
                        result: result
                    }

                    db.bill.getExpensesByCategory(user_id, (error, result) => {
                        if (result) {
                            data["category_expenses"] = result;

                            db.bill.get3TypesOfExpenses(user_id, (error, result) => {
                                if (result) {
                                    let totalExpenses = 0;
                                    let totalBorrowed = 0;
                                    let totalLent = 0;
                                    let details = result
                                    details.forEach(x => {
                                        if (x.user_id === x.paid_by_user_id) {
                                            totalExpenses += x.split_amount;
                                            totalLent += x.amount - x.split_amount;
                                        } else {
                                            totalExpenses += x.split_amount;
                                            totalBorrowed += x.split_amount;
                                        }
                                    })
                                    data["totalExpenses"] = totalExpenses;
                                    data["totalBorrowed"] = totalBorrowed;
                                    data["totalLent"] = totalLent;

                                    response.render("views/index", data)
                                } else {
                                    response.send("UNABLE TO GET 3 TYPES OF EXPENSES")
                                }
                            })



                        } else {
                            response.send("UNABLE TO QUERY BY CAT")
                        }

                    })


                } else {
                    response.send("UNABLE TO QUERY EXPENSES")
                }
            })

        } else {
            response.redirect('/blitt/login')
        }


    };

    let getAllActivitiesControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        let user_name = request.cookies["user_name"]
        let user_id = request.cookies["user_id"]
        if (cookieAvailable) {
            db.main.getAllActivities(user_id, (error, result) => {
                if (result) {
                    for (let i = 0; i < result.length; i++) {
                        result[i].created_at = timeConverted(result[i].created_at);
                    }

                    let data = {
                        title: "Activity",
                        cookieAvailable: cookieAvailable,
                        user_name: user_name,
                        result: result,
                        user_id:user_id
                    }
                    if(request.query.billErr){
                        data["billErr"] = true
                    }
                    response.render('views/activity',data)
                } else {
                    response.send("UNABLE TO FETCH ACTIVITIES")
                }
            })

        } else {
            response.redirect('/blitt/login')
        }
    }

    return {
        index: indexControllerCallback,
        redirect: redirectControllerCallback,
        getAllActivities: getAllActivitiesControllerCallback
    };

}