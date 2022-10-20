const form = document.getElementById("form");
const removeButton = document.getElementById("removeButton");
let billNum = 0;
addBill();


//#region AddBills

function addBill() {
    const billDiv = document.createElement("div");

    billDiv.setAttribute("id", billNum);
    billDiv.setAttribute("class", "billDiv");


    createFormInputs().forEach(element => {
        billDiv.appendChild(element);
    });

    form.appendChild(billDiv);
    billNum++;

    if(billNum > 1) {
        removeButton.style = "visibility: visible;"
    }
}


function createFormInputs() { 

    //Title
    const billTitle = document.createElement("h2");
    billTitle.innerText = "Bill " + (billNum + 1);
    
    //#region Labels

    const receiptAmountLabel = document.createElement("label");
    receiptAmountLabel.setAttribute("for", "receiptAmount");
    receiptAmountLabel.setAttribute("class", "amountLabel");
    receiptAmountLabel.innerHTML = "Receipt Amount<br>";

    const debitAmountLabel = document.createElement("label");
    debitAmountLabel.setAttribute("for", "debitAmount");
    debitAmountLabel.setAttribute("class", "amountLabel");
    debitAmountLabel.innerHTML = "Debit Amount<br>";

    const tipAmountLabel = document.createElement("label");
    tipAmountLabel.setAttribute("for", "tipAmount");
    tipAmountLabel.setAttribute("class", "amountLabel");
    tipAmountLabel.innerHTML = "Tip Amount<br>";
    tipAmountLabel.style = "visibility: hidden;"

    const exteriorLabel = document.createElement("label");
    exteriorLabel.setAttribute("for", "exterior");
    exteriorLabel.setAttribute("class", "checkBoxLabel");
    exteriorLabel.innerHTML = "Exterior";

    const uberLabel = document.createElement("label");
    uberLabel.setAttribute("for", "uber");
    uberLabel.setAttribute("class", "checkBoxLabel");
    uberLabel.innerHTML = "Uber";

    //#endregion

    //#region Input

    const receiptAmount = document.createElement("input");
    setMonitaryAttributes(receiptAmount, "receiptAmount");
    receiptAmount.setAttribute("data-countthis", "true");

    const debitAmount = document.createElement("input");
    setMonitaryAttributes(debitAmount, "debitAmount");

    const tipAmount = document.createElement("input");
    setMonitaryAttributes(tipAmount, "tipAmount");
    tipAmount.style = "visibility: hidden;"

    const extAmount = document.createElement("input");
    extAmount.setAttribute("class", "extAmount");
    extAmount.setAttribute("type", "hidden");
    extAmount.setAttribute("value", "0");

    const exterior = document.createElement("input");
    exterior.setAttribute("type", "checkbox");
    exterior.setAttribute("name", "exterior");
    exterior.setAttribute("class", "checkbox");

    exterior.addEventListener("input", () => {
        if(exterior.checked) {
            receiptAmount.disabled = false;
            receiptAmount.dataset.countthis = "false"; 
            changeExterior(exterior, extAmount, receiptAmount);
        }
        else {
            receiptAmount.dataset.countthis = "true";  
            if(uber.checked){
                receiptAmount.disabled = true;
            }
        }
    });

    const uber = document.createElement("input");
    uber.setAttribute("type", "checkbox");
    uber.setAttribute("name", "uber");
    uber.setAttribute("class", "checkbox");

    uber.addEventListener("change", () => {
        if(uber.checked) {
            if(exterior.checked) {
                receiptAmount.disabled = false;
            }             
            else {
                receiptAmount.disabled = true;
            }             
            debitAmount.value = "0.00";
            debitAmount.disabled = true;
            tipAmount.style = "visibility: visible;"
            tipAmountLabel.style = "visibility: visible;"
        }
        else {
            receiptAmount.disabled = false;
            debitAmount.disabled = false;
            tipAmount.style = "visibility: hidden;"
            tipAmountLabel.style = "visibility: hidden;"
        }
    });

    receiptAmount.addEventListener("input", () => {
        changeExterior(exterior, extAmount, receiptAmount)
    });

    //#endregion

    const checkBoxdDiv = document.createElement("div");
    checkBoxdDiv.appendChild(exterior);
    checkBoxdDiv.appendChild(exteriorLabel);
    checkBoxdDiv.appendChild(document.createElement("br"));
    checkBoxdDiv.appendChild(document.createElement("br"));
    checkBoxdDiv.appendChild(document.createElement("br"));
    checkBoxdDiv.appendChild(uber);
    checkBoxdDiv.appendChild(uberLabel);
    //checkBoxdDiv.style = "margin: auto;"

    const bill = [
        billTitle, 
        receiptAmountLabel, receiptAmount, document.createElement("br"), //Receipt ammount
        debitAmountLabel, debitAmount, document.createElement("br"), //Debit
        tipAmountLabel, tipAmount, document.createElement("br"), //tip
        checkBoxdDiv,//exterior, exteriorLabel, //exterior checkbox
        //uber, uberLabel, //uber checkbox
        extAmount
    ];

    return bill;
} //maybe make function for each new input element (pair label with input as child)

function changeExterior(exterior, extAmount, receiptAmount) {
    const TVQ = 0.09975; //9.975%
    if(exterior.checked) {
        extAmount.value = round((parseFloat(receiptAmount.value) * TVQ), 2);
    }
    else
    extAmount.value = 0;
}

function setMonitaryAttributes(inputElement, name) {
    inputElement.setAttribute("class", name);
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("name", name);
    inputElement.setAttribute("step", "0.01");
    inputElement.setAttribute("value", "0.00");
    inputElement.setAttribute("min", "0");
    inputElement.setAttribute("onclick", "this.select()");
}

//#endregion

//#region Remove Bills

function removeBill() {
    const MIN_BILLS = 1
    form.removeChild(document.getElementById(--billNum));
    if(billNum === MIN_BILLS) {
        removeButton.style = "visibility: hidden;"
    }
}

//#endregion

//#region Calculation

function calculateBills() {

    //#region Clear lists if recalculation is done

    let exteriors = document.getElementById("exteriors");
    let tips = document.getElementById("tips");

    Array.from(exteriors.children).forEach(child => {
        exteriors.removeChild(child);
    })

    Array.from(tips.children).forEach(child => {
        tips.removeChild(child);
    })

    //#endregion

    //#region Calculation
    let receiptElements = document.querySelectorAll(".receiptAmount");
    let debitElements = document.querySelectorAll(".debitAmount");
    let tipElements = document.querySelectorAll(".tipAmount");
    let extElements = document.querySelectorAll(".extAmount");

    let totalReceiptAmount = 0;
    let totalDebitAmount = 0;
    let totalTip = 0;
    let totalExterior = 0;
    let balance;
    
    receiptElements.forEach(receipt => {
        if(receipt.dataset.countthis === "true") {
            totalReceiptAmount += parseFloat(receipt.value);
        }      
    });

    debitElements.forEach(debit => {
        totalDebitAmount += parseFloat(debit.value);
    });

    tipElements.forEach(tip => {
        if(parseFloat(tip.value) > 0) {
            addToList(tips, parseFloat(tip.value));
            totalTip += parseFloat(tip.value);
        }
    });

    extElements.forEach(exterior => {
        if(parseFloat(exterior.value) > 0) {
            addToList(exteriors, parseFloat(exterior.value));
            totalExterior += parseFloat(exterior.value); 
        }
    });

    balance = totalReceiptAmount - totalDebitAmount - (totalTip + parseFloat(totalExterior.toFixed(2)));

    //#endregion

    //#region print to screen
    let resultDiv = document.getElementById("results");
    resultDiv.style = "visibility: visible;";

    let receiptHeader = document.getElementById("totalReceiptAmount");
    let debitHeader = document.getElementById("totalDebitAmount");
    let balanceHeader = document.getElementById("balance");

    receiptHeader.innerText = "Total Receipt Amount: " + totalReceiptAmount.toFixed(2) + "$";
    debitHeader.innerText = "Total Debit Amount: " + totalDebitAmount.toFixed(2) + "$";
    balanceHeader.innerText = "Balance:  " + balance.toFixed(2) + "$";

    //#endregion
}

function addToList(parent, value) {
    let newElement = document.createElement("li");
    newElement.innerText = value.toFixed(2) + "$"

    parent.appendChild(newElement);
}

//#endregion

function round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
}
