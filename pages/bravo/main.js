const buttonContainer = document.getElementById("buttonDiv");
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

    buttonContainer.scrollIntoView({behavior: "smooth", block: "end"});
    
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
    receiptAmount.setAttribute("data-billnum", "0");
    

    const debitAmount = document.createElement("input");
    setMonitaryAttributes(debitAmount, "debitAmount");

    const tipDiv = document.createElement("div");
    tipDiv.style = "display: flex; flex-direction: column;";

    
    const billDiv = document.createElement("div");
    billDiv.style = "display: flex; flex-direction: column;";

    const extAmount = document.createElement("input");
    extAmount.setAttribute("class", "extAmount");
    extAmount.setAttribute("type", "hidden");
    extAmount.setAttribute("value", "0");

    const hiddenTipAmount = document.createElement("input");
    hiddenTipAmount.setAttribute("class", "hiddenTipAmount");
    hiddenTipAmount.setAttribute("type", "hidden");
    hiddenTipAmount.setAttribute("value", "0");

    const exterior = document.createElement("input");
    exterior.setAttribute("type", "checkbox");
    exterior.setAttribute("name", "exterior");
    exterior.setAttribute("class", "checkbox");

    exterior.addEventListener("input", () => {
        if(exterior.checked) {
            receiptAmount.disabled = false;
            setExterior(exterior, extAmount, receiptAmount);

            if(receiptAmount.dataset.billnum === "0") {
                createBillNumField().forEach(child => {
                    billDiv.appendChild(child);
                });

                billDiv.lastChild.addEventListener("input", () => {
                    receiptAmount.dataset.billnum = billDiv.lastChild.value;
                    setExterior(exterior, extAmount, receiptAmount);
                });

                receiptAmount.dataset.billnum = "N/A";
            }
        }
        else { 
            extAmount.value = 0;
            if(uber.checked){
                receiptAmount.disabled = true;
            }
            else {
                Array.from(billDiv.children).forEach(child => {
                    billDiv.removeChild(child);
                });
                receiptAmount.dataset.billnum = "0";
            }
        }
    });

    const uber = document.createElement("input");
    uber.setAttribute("type", "checkbox");
    uber.setAttribute("name", "uber");
    uber.setAttribute("class", "checkbox");

    uber.addEventListener("change", () => {
        if(uber.checked) {
            receiptAmount.dataset.countthis = "false"; 
            if(exterior.checked) {
                receiptAmount.disabled = false;
            }             
            else {
                receiptAmount.disabled = true;
            }             
            debitAmount.value = "0.00";
            debitAmount.disabled = true;

            createTipField().forEach(child => {
                tipDiv.appendChild(child);
            });

            tipDiv.lastChild.addEventListener("input", () => {
                hiddenTipAmount.value = receiptAmount.dataset.billnum + " - " + tipDiv.lastChild.value;
            });

            if(receiptAmount.dataset.billnum === "0") {
                createBillNumField().forEach(child => {
                    billDiv.appendChild(child);
                });

                billDiv.lastChild.addEventListener("input", () => {
                    receiptAmount.dataset.billnum = billDiv.lastChild.value;

                    hiddenTipAmount.value = receiptAmount.dataset.billnum + " - " + tipDiv.lastChild.value;

                    if (exterior.checked) 
                        setExterior(exterior, extAmount, receiptAmount);
                });

                receiptAmount.dataset.billnum = "N/A";
            }



        }
        else {
            receiptAmount.dataset.countthis = "true";  
            receiptAmount.disabled = false;
            debitAmount.disabled = false;
            hiddenTipAmount.value = "0";

            Array.from(tipDiv.children).forEach(child => {
                tipDiv.removeChild(child);
            });

            if(!exterior.checked) {
                Array.from(billDiv.children).forEach(child => {
                    billDiv.removeChild(child);
                });
                receiptAmount.dataset.billnum = "0";
            }
        }
    });

    

    receiptAmount.addEventListener("input", () => {
        setExterior(exterior, extAmount, receiptAmount);
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
        billDiv, document.createElement("br"), //bill numbers
        tipDiv, document.createElement("br"), //tip 
        checkBoxdDiv,//exterior, exteriorLabel, //exterior checkbox
        //uber, uberLabel, //uber checkbox
        extAmount, hiddenTipAmount
    ];

    return bill;
} //maybe make function for each new input element (pair label with input as child)

function createTipField() {
    const tipAmountLabel = document.createElement("label");
    tipAmountLabel.setAttribute("for", "tipAmount");
    tipAmountLabel.setAttribute("class", "amountLabel");
    tipAmountLabel.innerHTML = "Tip Amount<br>";

    const tipAmount = document.createElement("input");
    setMonitaryAttributes(tipAmount, "tipAmount");

    return [tipAmountLabel, tipAmount];
}

function createBillNumField() {
    const billNumLabel = document.createElement("label");
    billNumLabel.setAttribute("class", "amountLabel");
    billNumLabel.innerHTML = "Bill Number<br>";

    

    const billNumber = document.createElement("input");
    billNumber.setAttribute("class", "amountLabel");
    billNumber.setAttribute("type", "number");
    billNumber.setAttribute("step", "1");
    billNumber.setAttribute("value", "0");
    billNumber.setAttribute("min", "0");
    billNumber.setAttribute("onclick", "this.select()");

    return[billNumLabel, billNumber];


}

function setExterior(exterior, extAmount, receiptAmount) {
    const totalTax = 1.14975; //Need to remove tax before adding getting TVQ
    const TVQ = 0.09975; //9.975%
    if(exterior.checked) {
        extAmount.value = round(((parseFloat(receiptAmount.value) / totalTax) * TVQ), 2);
        extAmount.value = receiptAmount.dataset.billnum + " - " + extAmount.value;
    }
    else {
        extAmount.value = 0;
    }

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
    const MIN_BILLS = 1;

    form.removeChild(document.getElementById(--billNum));
    if(billNum === MIN_BILLS) {
        removeButton.style = "visibility: hidden;";
    }

    buttonContainer.scrollIntoView({behavior: "smooth", block: "end"});
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
    let tipElements = document.querySelectorAll(".hiddenTipAmount");
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
        const tipMoney = parseFloat(tip.value.split(" - ")[1])

        if(tipMoney > 0) {
            addToList(tips, tip.value);
            totalTip += tipMoney;
        }
    });

    extElements.forEach(exterior => {
        let exteriorMoney = parseFloat(exterior.value.split(" - ")[1]);

        if(exteriorMoney > 0) {
            if(exteriorMoney > 10) {
                exteriorMoney = 10;
                exterior.value = (exterior.value.split(" - ")[0]) + " - 10";
            }              
            addToList(exteriors, exterior.value);
            totalExterior += exteriorMoney; 
        }
    });

    balance = totalReceiptAmount - totalDebitAmount - (totalTip + parseFloat(totalExterior.toFixed(2)));

    //#endregion

    //#region print to screen
    const calculationButton = document.getElementById("calcButton");
    const resultContainer = document.getElementById("results");
    let resultDiv = document.getElementById("results");
    resultDiv.style = "visibility: visible;";

    let receiptHeader = document.getElementById("totalReceiptAmount");
    let debitHeader = document.getElementById("totalDebitAmount");
    let balanceHeader = document.getElementById("balance");
    let tipAndExtHeader = document.getElementById("tipAndExt");

    receiptHeader.innerText = "Total Receipt Amount: " + totalReceiptAmount.toFixed(2) + "$";
    debitHeader.innerText = "Total Debit Amount: " + totalDebitAmount.toFixed(2) + "$";
    tipAndExtHeader.innerText = "Total Tip & Exteriors: " + (totalExterior + totalTip).toFixed(2) + "$";
    balanceHeader.innerText = "Balance:  " + balance.toFixed(2) + "$";

    resultContainer.scrollIntoView({behavior: "smooth", block: "end"});

    calculationButton.innerText = "Recalculate Bills";

    //#endregion
}

function addToList(parent, value) {
    let newElement = document.createElement("li");
    newElement.innerText = value + "$";

    parent.appendChild(newElement);
}

//#endregion

function round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
}
