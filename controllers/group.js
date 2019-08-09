var sha256 = require('js-sha256');
var SALT = "whosyourdaddy";
var multer = require('multer');
var upload = multer({
    dest: './uploads/'
});
var cloudinary = require('cloudinary');
var configForCloudinary;
if( process.env.CLOUDINARY_URL ){
  configForCloudinary = process.env.CLOUDINARY_URL;
}else{
  configForCloudinary = require("../config.json");
}
cloudinary.config(configForCloudinary);
const format = require('pg-format');


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
        let user_name = request.cookies["user_name"];
        let user_id = request.cookies["user_id"]
        if (cookieAvailable) {
            db.user.getAllUsers((error, result) => {
                let data = {
                    title: "Create Group",
                    cookieAvailable: cookieAvailable,
                    allUsers: result,
                    user_name: user_name,
                    user_id: user_id
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
                let group_name = result.name;
                let user_id = request.cookies["user_id"];
                let user_name = request.cookies["user_name"]
                let valuesArr = [user_array]
                let valuesInBracs = format("%L", valuesArr);



                db.user.getSingleUserByName(valuesInBracs, (error, result2) => {
                    if(error){
                        console.log(error)
                    }
                    if (result2) {

                        let arrayOfId = []
                        result2.forEach(x=>{
                            let value = `(${x.id},${group_id})`
                            arrayOfId.push(value)
                        });
                        arrayOfId = arrayOfId.join(",")

                        db.group.userGroupLink(arrayOfId, (error, result3) => {

                            if (result3) {

                                db.main.updateActivityForCreateGroup(user_id,user_name,"created",group_id,group_name,(error,result4)=>{
                                    if(error){
                                        console.log(error)
                                    }
                                    if(result4){
                                        response.redirect("/blitt/groupList")
                                    }else{
                                        response.send("CANNOT UPDATE CREATE GROUP ACTIVITY")
                                    }
                                })

                            } else {
                                response.send("SOMETHING WRONG");
                            }
                        })
                    } else {
                        response.send("SOMETHING WRONG")
                    }
                })




            } else {
                response.send("ATTEND LATER");
            }

        })

    }

    let listAllGroupControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        let user_id = request.cookies["user_id"];
        let group_id = request.params.id;
        let user_name = request.cookies["user_name"];
        if (cookieAvailable) {

            db.group.getAllGroupsWithBillDetails(user_id, (error, result) => {
                if (result) {
                    let netDetails = result;
                    db.group.getGroupCount(user_id, (error, result2) => {
                        if (result2) {

                            let groupDetails = result2
                            let resultObj = []
                            let user_total = 0;
                            for (let i = 0; i < groupDetails.length; i++) {
                                let members_net = netDetails.filter(x => x.group_id === groupDetails[i].id).map(x => {
                                    return {
                                        name: x.name,
                                        net: x.net
                                    }
                                });
                                let user_net = members_net.reduce((total, obj) => obj.net * -1 + total, 0);
                                user_total += user_net;
                                let temp = {
                                    group_name: groupDetails[i].name,
                                    group_id: groupDetails[i].id,
                                    members_net: members_net,
                                    user_net: user_net,
                                    group_image: groupDetails[i].image
                                }
                                resultObj.push(temp);
                            }

                            resultObj.sort((b, a) => Math.abs(parseFloat(a.user_net)) - Math.abs(parseFloat(b.user_net)));


                            let data = {
                                title: "Group List",
                                cookieAvailable: cookieAvailable,
                                result: resultObj,
                                user_total: parseFloat(user_total).toFixed(2),
                                user_name: user_name
                            }

                            db.user.getUserDetail(user_id, (error, result) => {
                                if (result) {
                                    data["user_details"] = result;
                                    response.render('views/group_list', data);
                                } else {
                                    response.send("CANT GET USERT")
                                }
                            })



                        } else {
                            response.send("CANT GET GROUP COUNT")
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
            let group_id = request.params.id;
            let user_name = request.cookies["user_name"];

            db.bill.getAllBillsByGroup(user_id, request.params.id, (error, result) => {
                if (result) {
                    for (let i = 0; i < result.length; i++) {
                        result[i].created_at = timeConverted(result[i].created_at);
                    }

                    let data = {
                        cookieAvailable: cookieAvailable,
                        group_id: request.params.id,
                        billList: result,
                        user_name: user_name

                    }
                    db.group.getSingleGroup(group_id, (error, result) => {
                        if (result) {
                            data["group_details"] = result[0];
                            data["title"] = result[0].name;

                            db.bill.getPaidSplitAmountAsPayer(group_id, user_id, (error, result) => {
                                if (result) {
                                    data["settled_split_amount_as_payer"] = result;

                                    db.bill.getPaidSplitAmountAsPayee(group_id, user_id, (error, result) => {
                                        if (result) {
                                            data["settled_split_amount_as_payee"] = result;
                                            db.bill.checkTrueCountOfBillsByGroup(group_id, (error, result) => {
                                                if (result) {
                                                    let trueTable = result
                                                    let settledBill = []
                                                    for (let i = 0; i < data.billList.length; i++) {
                                                        for (let j = 0; j < trueTable.length; j++) {
                                                            if (data.billList[i].bill_id === trueTable[j].bill_id) {
                                                                if (parseInt(trueTable[j].true_count) === parseInt(trueTable[j].bill_count)) {
                                                                    data.billList[i]["settled"] = true;
                                                                    settledBill.push(data.billList.splice(i,1))
                                                                }
                                                                break;

                                                            }
                                                        }
                                                    }
                                                    let merged =[].concat.apply([], settledBill)
                                                    data.billList = data.billList.concat(merged)
                                                    response.render("views/single_group", data)
                                                } else {
                                                    response.send("FAIL TO GET TRUE COUNT")
                                                }
                                            })


                                        } else {
                                            response.send("CANT GET SPLIT AMOUNT BY GROUP ID")
                                        }
                                    })
                                } else {
                                    response.send("CANT GET SPLIT AMOUNT BY GROUP ID")
                                }
                            })

                        } else {
                            response.send("CANT GET SINGLE GROUP")
                        }

                    })

                } else {
                    response.send("QUERY FOR BILL LIST FAIL")
                }


            })

        } else {
            response.redirect('/blitt/login')
        }
    }

    let chooseSettleByGroupControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
            let group_id = request.params.id;
            let user_name = request.cookies["user_name"];

            db.group.getSingleGroupWithBillDetails(group_id, user_id, (error, result) => {
                if (result) {
                    let data = {
                        title: "Settle Bill",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        user_id: user_id,
                        group_id: group_id,
                        user_name: user_name
                    }

                    response.render('views/settlebill_select', data);

                } else {
                    response.send("QUERY FOR BILL LIST FAIL")
                }


            })

        } else {
            response.redirect('/blitt/login')
        }
    }

    let groupProfileControllerCallback = (request, response) => {
        let cookieAvailable = checkCookie(request);
        if (cookieAvailable) {
            let user_id = request.cookies["user_id"];
            let group_id = request.params.id;
            let user_name = request.cookies["user_name"];

            db.group.getSingleGroup(group_id, (error, result) => {
                if (result) {
                    let data = {
                        title: "Group Profile",
                        cookieAvailable: cookieAvailable,
                        result: result,
                        user_id: user_id,
                        group_id: group_id,
                        user_name: user_name
                    }

                    response.render('views/group_profile', data);

                } else {
                    response.send("QUERY FOR BILL LIST FAIL")
                }


            })

        } else {
            response.redirect('/blitt/login')
        }
    }

    let groupProfilePostControllerCallback = (request, response) => {
        let group_id = request.params.id
        cloudinary.uploader.upload(request.file.path, function(result) {
            db.group.updateGroupProfilePic(group_id, result.url, (error, result) => {
                if (result) {
                    response.redirect("/blitt/groupList/" + group_id + "/group_profile")
                } else {
                    response.send("FAIL TO UPDATE IMAGE")
                }
            })
        });
    }


    return {
        createGroup: createGroupControllerCallback,
        createGroupPost: createGroupPostControllerCallback,
        listAll: listAllGroupControllerCallback,
        singleGroup: singleGroupControllerCallback,
        chooseSettleByGroup: chooseSettleByGroupControllerCallback,
        groupProfile: groupProfileControllerCallback,
        groupProfilePost: groupProfilePostControllerCallback

    };

}