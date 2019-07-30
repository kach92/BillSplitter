let selections = document.getElementById("selections");
let user_takein = document.getElementById("user-takein")

selections.addEventListener("change",function(event){
    if(user_takein.value===""){
        user_takein.value += event.target.value;
    }else{
        user_takein.value += `,${event.target.value}`;
    }
})