let selections = document.getElementById("user_selections");
let user_takein = document.getElementById("user-takein")

selections.addEventListener("change",function(event){
    console.log("HEY")
    if(user_takein.value===""){
        user_takein.value += event.target.value;
    }else{
        user_takein.value += `,${event.target.value}`;
    }
})
