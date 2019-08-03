let selections = document.getElementById("user_selections");
let user_takein = document.getElementById("user-takein");
let errorMessage = document.getElementById("alert-msg")
let buttonContainer = document.querySelector(".add-user-into-group-container");
let randomClass = ["btn btn-primary user-name-button","btn btn-secondary user-name-button","btn btn-success user-name-button","btn btn-danger user-name-button","btn btn-warning user-name-button","btn btn-info user-name-button","btn btn-dark user-name-button"]

selections.addEventListener("change", function(event) {

    if (user_takein.value === "") {
        user_takein.value += event.target.value;
    } else {
        if (user_takein.value.includes(event.target.value)) {
            errorMessage.removeAttribute("hidden");
        } else {
            user_takein.value += `,${event.target.value}`;
            createButtons(event.target.value);
            errorMessage.setAttribute("hidden",true);
        }

    }
})

let createButtons = function(name){
    let button = document.createElement("div");
    button.setAttribute("class",randomClass[Math.floor(Math.random()*8)])
    button.innerText=name;
    buttonContainer.appendChild(button);
}


