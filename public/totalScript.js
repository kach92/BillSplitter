window.addEventListener('DOMContentLoaded', (event) => {
    let mainValue = querySelectorAll(".main-value")
    let sum = 0;
    for (let i=0;i<mainValue.length;i++){
        sum += parseFloat(mainValue[i].innerText);
    }

    document.getElementById("total").innerText = sum;
});