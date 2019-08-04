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
                        title: "New Bill",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        group_id: group_id,
                        group_name: result[0].group_name,
                        user_name: user_name
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
        let user_id = request.cookies["user_id"];
        if (cookieAvailable) {
            let bill_information = request.body

            db.bill.createNewBillInGroup(group_id, bill_information, (error, result) => {
                if (result) {
                    let bill_id = result.id;
                    let bill_name = result.description;
                    let payer_id = result.paid_by_user_id;
                    db.bill.createUserBillLink(bill_id, group_id, bill_information, (error, result2) => {
                        if (result2) {
                            db.bill.updateNetTable(bill_id, group_id, split_array, payer_id, (error, result3) => {
                                if (result3) {

                                    db.main.updateActivity(user_id, user_name, bill_id, "added", group_id, bill_name, (error, result4) => {
                                        if (result4) {
                                            response.redirect("/blitt/groupList/" + group_id)
                                        } else {
                                            response.send("UNABLE TO UPDATE ACTIVITY")
                                        }

                                    })

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
                        user_name: user_name
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

    let settleGroupBillControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        let group_id = request.params.group_id;
        let settler_id = request.params.settler_id;
        let user_id = request.cookies["user_id"];
        let amountToShow = request.body.amount;
        let user_name = request.cookies["user_name"];
        if (cookieAvailable) {
            db.bill.settleNetTableForUserByGroup(user_id, group_id, settler_id, (error, result) => {
                if (result) {

                    db.bill.settleSplitAmountByGroup(user_id, group_id, settler_id, (error, result) => {
                        if (result) {
                            db.main.updateActivityForSettleByGroup(user_id, user_name, settler_id, "settled", group_id, amountToShow, (error, result) => {
                                if (result) {
                                    response.redirect("/blitt/groupList/" + group_id);
                                } else {
                                    response.send("UNABLE TO UPDATE ACTIVITY FOR SETTLING DEBT BY GROUP")
                                }
                            })

                        } else {
                            response.send("CANNOT UPDATE USERS_BILLS PAID BOOL")
                        }

                    })


                } else {
                    response.send("CANNOT UPDATE NET TABLE BOOL")
                }

            })
        } else {
            response.redirect('/blitt/login')
        }
    }

    let editBillControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
            let group_id = request.params.id;
            let bill_id = request.params.billId;
            let user_name = request.cookies["user_name"];

            db.bill.getBillFromBillTable(bill_id, (error, result) => {
                if (result) {

                    let data = {
                        cookieAvailable: cookieAvailable,
                        group_id: group_id,
                        bill_id: bill_id,
                        title: "Edit Bill",
                        user_id: user_id,
                        user_name: user_name,
                        singleBill: result
                    }
                    db.bill.getSplitDetailsByBill(bill_id, (error, result) => {
                        if (result) {
                            data["split_details"] = result;
                            response.render('views/edit_bill', data)
                        } else {
                            response.send("UNABLE TO GET SPLIT DETAILS")
                        }
                    })

                } else {
                    response.send("UNABLE TO GET SINGLE BILL")
                }
            })



        } else {
            response.redirect('/blitt/login')
        }
    }

    let editBillPostControllerCallback = (request, response) => {

        let user_id = request.cookies["user_id"];
        let group_id = request.params.id;
        let bill_id = request.params.billId;
        let billDetails = request.body;
        let bill_name = request.body.bill_description;
        let user_name = request.cookies["user_name"];
        let payer_id = parseInt(request.body.payer)

        db.bill.updateSingleBill(bill_id, billDetails, (error, result) => {
            if (result) {

                async function update1by1() {
                    for (let i = 0; i < billDetails.split_amount.length; i++) {
                        let waiter = await db.bill.updateSplitAmount(billDetails.user_id[i], bill_id, billDetails.split_amount[i], (error, result) => {
                            if (result) {
                                console.log("UPDATE EDIT SPLIT OK")
                            } else {
                                console.log("UPDATE EDIT SPLIT NOT OK")
                            }
                        })
                    }

                }

                async function updateNetTable() {
                    for (let i = 0; i < billDetails.split_amount.length; i++) {
                        if (payer_id !== parseInt(billDetails.user_id[i])) {
                            let waiter2 = await db.bill.updateNetTableForEdit(billDetails.user_id[i], billDetails.split_amount[i],payer_id, group_id, bill_id, (error, result) => {
                                if (result) {
                                    console.log("UPDATE NETTABLE FOR EDIT OK")
                                } else {
                                    console.log("UPDATE NETTABLE FOR EDIT NOT OK")
                                }
                            })
                            let negativeNet = billDetails.split_amount[i]*-1
                            let waiter3 = await db.bill.updateNetTableForEdit(payer_id, negativeNet,billDetails.user_id[i], group_id, bill_id, (error, result) => {
                                if (result) {
                                    console.log("UPDATE NETTABLE FOR EDIT OK")
                                } else {
                                    console.log("UPDATE NETTABLE FOR EDIT NOT OK")
                                }
                            })
                        }

                    }

                }

                update1by1();
                updateNetTable();
                db.main.updateActivityForEdit(user_id, user_name, "edited", group_id, bill_id,bill_name, (error, result) => {
                    if (result) {

                        setTimeout(function() {
                            response.redirect("/blitt/groupList/" + group_id + "/" + bill_id)
                        }, 2000);
                    } else {
                        console.log("UPDATE ACTIVITY FOR EDIT FAIL")
                    }
                })


            } else {
                response.send("UNABLE TO UPDATE SINGLE BILL")
            }
        })



    }

    let deleteBillControllerCallback = (request, response) => {

        let user_id = request.cookies["user_id"];
        let group_id = request.params.id;
        let bill_id = request.params.billId;
        let user_name = request.cookies["user_name"];
        let bill_name = request.body.bill_name

        db.bill.deleteSingleBill(bill_id, (error, result) => {
            if (result) {
                console.log("DELETE OK");

                db.main.updateActivityForDelete(user_id,user_name,"deleted",group_id,bill_id,bill_name,(error,result)=>{
                    if(result){
                        response.redirect(`/blitt/groupList/${group_id}`);
                    }else{
                        response.send("UNABLE TO UPDATE ACTIVTY FOR DELETE")
                    }
                })
            } else {
                response.send("UNABLE TO UPDATE SINGLE BILL")
            }
        })
    }

    return {
        newBill: newBillControllerCallback,
        newBillPost: newBillPostControllerCallback,
        singleBill: singleBillControllerCallback,
        settleGroupBill: settleGroupBillControllerCallback,
        editBill: editBillControllerCallback,
        editBillPost: editBillPostControllerCallback,
        deleteBill: deleteBillControllerCallback

    };

}