let defaultButtonColor = "background-color: rgb(80, 79, 79);"
let selectedButtonColor = "background-color: rgb(121, 121, 121);"
let MenuButtons = ["1YearP", "2YearP", "3YearP", "aboutMe"]
function select(idSel) {
    
    MenuButtons.forEach(element => {
        document.getElementById(element).style=defaultButtonColor; //sets all buttons to default color
    });

    if (idSel == "mbutton1") {
        displayDate();
    } //this was just a test
    document.getElementById(idSel).style=selectedButtonColor; //sets selected button to highlighted color   
}

function displayDate() {
    document.getElementById("demo").innerHTML = Date();
}