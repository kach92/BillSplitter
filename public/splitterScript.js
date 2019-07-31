let billInput = document.getElementById("billAmountInput");
let userSplitAmount = document.querySelectorAll(".user-split-amount");
let splitType = document.getElementById("split_type");
let checkBoxes = document.querySelectorAll(".checkBox");
let boolTable = [];
let tickCount = 0;
let tempAmount = 0;

//initialise boolTable and tickCount
for (let i = 0; i < userSplitAmount.length; i++) {
    boolTable.push(true);
    tickCount++;
}
//update amount if checkboxes is clicked
let update = function() {
    if (splitType.value === "Split Equally") {
        for (let i = 0; i < userSplitAmount.length; i++) {
            userSplitAmount[i].readOnly = true;
            userSplitAmount[i].style.border = "none"
        }
        if (billInput.value === "") {
            tempAmount = 0
        } else {
            tempAmount = parseInt(billInput.value)
        }

        let equalAmount = (tempAmount / tickCount).toFixed(2);
        for (let i = 0; i < userSplitAmount.length; i++) {
            if (boolTable[i] === true) {
                userSplitAmount[i].value = equalAmount
            } else {
                userSplitAmount[i].value = 0
            }

        }
    } else if (splitType.value === "Split Unequally") {
        for (let i = 0; i < userSplitAmount.length; i++) {
            if (boolTable[i]) {
                userSplitAmount[i].readOnly = false;
                userSplitAmount[i].style.border = "1px solid black"
            } else {
                userSplitAmount[i].value = 0
                userSplitAmount[i].readOnly = true;
                userSplitAmount[i].style.border = "none";
            }

        }
    }


}
//when checkboxes clicked
for (let i = 0; i < checkBoxes.length; i++) {
    checkBoxes[i].addEventListener("change", function() {
        if (event.target.checked) {
            boolTable[parseInt(event.target.value)] = true
            console.log(boolTable)
            tickCount = boolTable.filter(v => v).length;
            console.log(tickCount)
            update();


        } else {
            boolTable[parseInt(event.target.value)] = false
            console.log(boolTable)
            tickCount = boolTable.filter(v => v).length;
            console.log(tickCount)
            update();
        }
    })
}

billInput.addEventListener("change",update);
splitType.addEventListener("change",update);


// //do change when bill amount is put
// billInput.addEventListener("change", function() {
//     if (splitType.value === "Split Equally") {
//         if (billInput.value === "") {
//             tempAmount = 0
//         } else {
//             tempAmount = parseInt(billInput.value)
//         }
//         let equalAmount = (tempAmount / tickCount).toFixed(2);
//         for (let i = 0; i < userSplitAmount.length; i++) {
//             if (boolTable[i] === true) {
//                 userSplitAmount[i].value = equalAmount
//             } else {
//                 userSplitAmount[i].value = 0
//             }
//         }
//     }


// })


// //do change when change split type
// splitType.addEventListener("change", function() {
//     if (event.target.value === "Split Unequally") {

//     } else if (event.target.value === "Split Equally") {
//         for (let i = 0; i < userSplitAmount.length; i++) {
//             userSplitAmount[i].readOnly = true;
//             userSplitAmount[i].style.border = "none"
//         }

//         if (billInput.value === "") {
//             tempAmount = 0
//         } else {
//             tempAmount = parseInt(billInput.value)
//         }
//         let equalAmount = (tempAmount / tickCount).toFixed(2);
//         for (let i = 0; i < userSplitAmount.length; i++) {
//             if (boolTable[i] === true) {
//                 userSplitAmount[i].value = equalAmount
//             } else {
//                 userSplitAmount[i].value = 0
//             }
//         }
//     }
// })