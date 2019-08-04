window.onload = function() {
    let qrButton = document.querySelectorAll(".qr-button");
    let qrContainer = document.querySelectorAll(".qr-container")
    let qrPhone = document.querySelectorAll(".qr-phone")

    let qrRequest = function(num) {
        return function() {
            let qrCode = document.createElement("img");
            qrCode.setAttribute("class","qr-image");
            let phone = qrPhone[num].value;
            let url = "http://api.qrserver.com/v1/create-qr-code/?data="+phone+"&size=100x100"
            qrCode.setAttribute("src",url)
            qrContainer[num].appendChild(qrCode);
        }

    }

    for (let i = 0; i < qrButton.length; i++) {
        qrButton[i].addEventListener("click", qrRequest(i))
    }
}