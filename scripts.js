let defaultButtonColor = "background-color: rgb(80, 79, 79);"
let selectedButtonColor = "background-color: rgb(121, 121, 121);"

function select(id) {
    document.getElementById(id).style=selectedButtonColor;
    if (id == "mbutton1") {
        displayDate();
    }
    
}

function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}