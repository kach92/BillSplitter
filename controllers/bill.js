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

    let newBillControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        let group_id = request.params.id;
        let user_name = request.cookies["user_name"];
        if (cookieAvailable) {
            db.group.getUsersInGroup(group_id, (error, result) => {
                if (result) {
                    let data = {
                        title: "Group List",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        group_id: group_id,
                        group_name: result[0].group_name,
                        user_name :user_name
                    }
                    response.render('views/create_bill', data);
                }

            })
        } else {
            response.redirect('/blitt/login')
        }
    }

    let newBillPostControllerCallback = (request, response) => {

        let cookieAvailable = checkCookie(request);
        let group_id = request.params.id;
        let split_array = request.body.split_amount;
        let payer_id = request.body.payer;
        let user_name = request.cookies["user_name"];
        if (cookieAvailable) {
            let bill_information = request.body

            db.bill.createNewBillInGroup(group_id, bill_information, (error, result) => {
                if (result) {
                    let bill_id = result.id;
                    let payer_id = result.paid_by_user_id;
                    db.bill.createUserBillLink(bill_id, group_id, bill_information, (error, result2) => {
                        if (result2) {
                            db.bill.updateNetTable(group_id, split_array, payer_id, (error, result3) => {
                                if (result3) {
                                    response.redirect("/blitt/groupList/" + group_id)
                                } else {
                                    response.send("HABIS")
                                }
                            })
                            // response.redirect(`/blitt/groupList/${group_id}`)
                        } else {
                            response.send("INSERT USER BILL LINK FAIL")
                        }
                    })
                } else {
                    response.send("INSERT FAIL")
                }

            })
        } else {
            response.redirect('/blitt/login')
        }
    }

    let singleBillControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
            let group_id = request.params.id;
            let bill_id = request.params.billId;
            let user_name = request.cookies["user_name"];
            db.bill.getSingleBillSplitDetail(group_id, bill_id, (error, result) => {
                if (result) {



                    let data = {
                        cookieAvailable: cookieAvailable,
                        splitDetails: result,
                        group_id: group_id,
                        bill_id: bill_id,
                        user_id: user_id,
                        user_name :user_name
                    }

                    db.bill.getSingleBillDetail(group_id, bill_id, (error, result2) => {
                        if (result2) {
                            result2.created_at = timeConverted(result2.created_at)
                            data["title"] = result2.description
                            data["billDetails"] = result2;
                            response.render('views/single_bill', data);
                        } else {
                            response.send("CANT GET SINGLE BILL")
                        }

                    })



                } else {
                    response.send("CANT GET SINGLE BILL")
                }

            })
        } else {
            response.redirect('/blitt/login')
        }
    }

    let settleGroupBillControllerCallback = (request,response)=>{
        let cookieAvailable = checkCookie(request);
        let group_id = request.params.group_id;
        let settler_id = request.params.settler_id;
        let user_id = request.cookies["user_id"];
        if (cookieAvailable) {
            db.bill.settleNetTableForUserByGroup(user_id,group_id,settler_id, (error, result) => {
                if (result) {

                    db.bill.settleSplitAmountByGroup(user_id,group_id,settler_id,(error,result)=>{
                        if(result){
                            console.log("UPDATE BY GROUP OK")
                            response.redirect("/blitt/groupList");
                        }else{
                            response.send("CANNOT UPDATE USERS_BILLS PAID BOOL")
                        }

                    })


                }else{
                    response.send("CANNOT UPDATE NET TABLE BOOL")
                }

            })
        } else {
            response.redirect('/blitt/login')
        }
    }

    return {
        newBill: newBillControllerCallback,
        newBillPost: newBillPostControllerCallback,
        singleBill: singleBillControllerCallback,
        settleGroupBill: settleGroupBillControllerCallback

    };

}