let defaultButtonColor = "background-color: rgb(160, 155, 169)"
let selectedButtonColor = "background-color: rgb(123, 116, 131);"
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

    document.getElementById(pageToDisplay).style.display = "block"; //shows selected content
    
}

function downloadProject(ProjectID) {
    switch (ProjectID) {
        case "GamesLabProj":
            location.href="https://github.com/kbaggott1/Assignments-and-projects/raw/main/Year1/ConsoleGamesLAB3.zip";
            break;
        case "RainfallSProject":
            location.href="https://github.com/kbaggott1/Assignments-and-projects/raw/main/Year1/Rainfall%20Statistics%20LAB4.zip";
            break;
        case "FinalY1Project":
            location.href="https://github.com/kbaggott1/Assignments-and-projects/raw/main/Year1/GameLab5.zip";
            break;
        case "FinalY1Exe":
            location.href="https://github.com/kbaggott1/kbaggott1.github.io/raw/main/Resources/Alien's%20Attack.zip";
            break;
    }
    
}

