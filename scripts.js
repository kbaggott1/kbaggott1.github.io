let defaultButtonColor = "background-color: rgb(80, 79, 79);"
let selectedButtonColor = "background-color: rgb(121, 121, 121);"
let MenuButtons = ["1YearP", "2YearP", "3YearP", "aboutMe"]
let ShowPages = ["1YearPage", "2YearPage", "3YearPage", "abMePage"]



function select(idSel, pageToDisplay) {

    MenuButtons.forEach(element => {
        document.getElementById(element).style=defaultButtonColor; //sets all buttons to default color
    });
    document.getElementById(idSel).style=selectedButtonColor; //sets selected button to highlighted color 

    ShowPages.forEach(element => { 
        document.getElementById(element).style.display = "none"; //Hides all content
    });

    document.getElementById(pageToDisplay).style.display = "block";
    
}

