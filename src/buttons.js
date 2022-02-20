//file meant to handle all of the button stuff
let button1 = document.querySelector("#button1");
button1.addEventListener("click", getData);

let button2 = document.querySelector("#button2");
button2.addEventListener("click", getData);

let button3 = document.querySelector("#button3");
button3.addEventListener("click", getData, false);

let button4 = document.querySelector("#button4");
button4.addEventListener("click", getData, false);

let button5 = document.querySelector("#button5");
button5.addEventListener("click", getData, false);

let button6 = document.querySelector("#button6");
button6.addEventListener("click", getData, false);

let button7 = document.querySelector("#button7");
button7.addEventListener("click", getData, false);

let button8 = document.querySelector("#button8");
button8.addEventListener("click", getData, false);

let jsData;

function getData(){
    $.get("https://pixel-land-backend.fly.dev/fetch_cubes", function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
        jsData = data;
    });
}




