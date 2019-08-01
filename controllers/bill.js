var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";

var checkCookie = function(request) {
    return (sha256(request.cookies["user_id"] + 'logged_in' + SALT) === request.cookies["logged_in"]) ? true : false;
}

module.exports = (db) => {

    let newBillControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        let group_id = request.params.id
        if (cookieAvailable) {
            db.group.getUsersInGroup(group_id, (error, result) => {
                if (result) {
                    let data = {
                        title: "Group List",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        group_id: group_id
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
        if (cookieAvailable) {
            let bill_information = request.body
            console.log(bill_information);
            db.bill.createNewBillInGroup(group_id, bill_information, (error, result) => {
                if (result) {
                    let bill_id = result.id;
                    let payer_id = result.paid_by_user_id;
                    db.bill.createUserBillLink(bill_id, group_id, bill_information, (error, result2) => {
                        if (result2) {
                            db.bill.updateNetTable(group_id,split_array,payer_id,(error,result3)=>{
                                if(result3){
                                    response.redirect("/blitt/groupList/"+group_id)
                                }else{
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

    return {
        newBill: newBillControllerCallback,
        newBillPost: newBillPostControllerCallback

    };

}