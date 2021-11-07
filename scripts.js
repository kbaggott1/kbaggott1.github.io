let defaultButtonColor = "background-color: rgb(80, 79, 79);"
let selectedButtonColor = "background-color: rgb(121, 121, 121);"
let MenuButtons = ["mbutton1", "mbutton2", "mbutton3"]
function select(idSel) {
    
    MenuButtons.forEach(element => {
        document.getElementById(element).style=defaultButtonColor; //sets all buttons to default color
    });

    if (idSel == "mbutton1") {
        displayDate();
    } 
    document.getElementById(idSel).style=selectedButtonColor; //sets selected button to highlighted color   
}

function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}