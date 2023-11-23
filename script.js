
function openLink(url) {
    window.open(url, '_blank');
}

function copyEmailToClipBoard() {
    const email = document.getElementById('email').innerText;

    navigator.clipboard.writeText(email);

    alert("Email copied to clipboard");
}

function toggleImages(buttonName, imageDivName) {
    const button = document.getElementById(buttonName);
    const imagesDiv = document.getElementById(imageDivName);
    const buttonShow = "Show Screenshots"
    const buttonHide = "Hide Screenshots"

    if(button.innerText == buttonShow) {
        button.innerText = buttonHide;
        imagesDiv.style.display = "flex"
    } 
    else {
        button.innerText = buttonShow;
        imagesDiv.style.display = "none"
    }
}