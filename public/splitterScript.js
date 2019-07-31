let billInput = document.getElementById("billAmountInput");
let userSplitAmount = document.querySelectorAll(".user-split-amount");
let splitType = document.getElementById("split_type")

billInput.addEventListener("change", function() {
    if (splitType.value === "Split Equally") {
        let equalAmount = (parseInt(event.target.value) / userSplitAmount.length).toFixed(2);
        for (let i = 0; i < userSplitAmount.length; i++) {
            userSplitAmount[i].value = equalAmount
        }
    }


})

splitType.addEventListener("change", function() {
    if (event.target.value === "Split Unequally") {
        for (let i = 0; i < userSplitAmount.length; i++) {
            userSplitAmount[i].readOnly = false;
            userSplitAmount[i].style.border = "1px solid black"
        }
    } else if (event.target.value === "Split Equally") {
        for (let i = 0; i < userSplitAmount.length; i++) {
            userSplitAmount[i].readOnly = true;
            userSplitAmount[i].style.border = "none"
        }

        if (billInput.value !== "") {
            let equalAmount = (parseInt(billInput.value) / userSplitAmount.length).toFixed(2);
            for (let i = 0; i < userSplitAmount.length; i++) {
                userSplitAmount[i].value = equalAmount
            }
        }
    }
})