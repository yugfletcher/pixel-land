//file meant to handle all of the button stuff
import './style.css';

let button = document.querySelector("#button1");
button.addEventListener("click", doSomething, false);

function doSomething(e){
    console.log("Mouse clicked on something!");
}
