const EOS = "{endofservice}", EODT = "{endofdatatitle}", EOD = "{endofdata}", EOB = "{endofblock}";
var passStr = "", addRowIndex = 0;

document.querySelector("#input-file").addEventListener("change", getFile);

document.querySelector("#enter-password-input").addEventListener("keydown", function() {
    if (event.keyCode == "13") enterPassword();
}, false);

document.querySelector("#create-password-input").addEventListener("keydown", function() {
    if (event.keyCode == "13") createPassword();
}, false);

document.querySelector("#search-bar").addEventListener("keydown", function() {
    if (event.keyCode == "13") search();
}, false);

function alreadyHaveFileBtn() {
    hideElement("#create-password");
    showElement("#upload-file");
}

function makeNewFileBtn() {
    hideElement("#upload-file");
    showElement("#create-password");
    autoSelect("#create-password-input");
}

function getFile(event) {
	const input = event.target;
    if ("files" in input && input.files.length > 0)
        readFileContent(input.files[0]).then(content => {
            if (validateFile())
                showElement("#enter-password");
            else;
        }).catch(error => console.log(error));
    else;
}

function readFileContent(file) {
	const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

// function save(filename, data) {
//     var blob = new Blob([data], {type: 'text/csv'});
//     if (window.navigator.msSaveOrOpenBlob) {
//         window.navigator.msSaveBlob(blob, filename);
//     }
//     else {
//         var elem = window.document.createElement('a');
//         elem.href = window.URL.createObjectURL(blob);
//         elem.download = filename;        
//         document.body.appendChild(elem);
//         elem.click();        
//         document.body.removeChild(elem);
//     }
// }

function validateFile() {
    // Check if file has correct paarsing
    if (true) {
        return true;
    }
    else {
        showElement("#file-warning-block");
        return false;
    }
}

function enterPassword() {

}

function createPassword() {
    var pass = document.querySelector("#create-password-input").value;
    if (passwordValidation(pass) == true) {
        hideElement("#password-warning-block");
        hideElement("#start");
        hideElement("#create-password");
        showElement("#password-access");
        // Search bar is auto selected
        autoSelect("#search-bar");
    }
    else showElement("#password-warning-block");
}

function passwordValidation(str) {
    if (str.length < 4 || str.length > 12) return false;
    else;
    var validChar = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (var i = 0; i <= (str.length - 1); i++) {
        if (!(validChar.includes(str.charAt(i))))
            return false;
        else;
    }
    return true;
}

function addService() {
    hideElement("#password-access");
    showElement("#add-data");
    autoSelect("#service-textarea");
}

function saveAndDownload() {
    
}

function addDataRow() {
    addRowIndex++;
    var dataRow = document.querySelector(".data-row").cloneNode(true);

    var dataTextArr = dataRow.querySelectorAll(".form-control");
    dataTextArr[0].id = "data-title-textarea" + addRowIndex;
    dataTextArr[0].value = "";
    dataTextArr[1].id = "data-textarea" + addRowIndex;
    dataTextArr[1].value = "";

    var labelArr = dataRow.querySelectorAll("label");
    labelArr[0].setAttribute("for", "data-title-textarea" + addRowIndex);
    labelArr[1].setAttribute("for", "data-textarea" + addRowIndex);

    document.querySelector("#add-data-card").appendChild(dataRow);
}

function saveToFile() {
    if (document.querySelector("#service-textarea").value.trim() == "") {
        var modal = new bootstrap.Modal(document.querySelector("#save-data-modal"), { keyboard: true });
        modal.show();
        return;
    }
    else;
    
    var str = document.querySelector("#service-textarea").value.trim() + EOS;
    var dataTextArr = document.querySelectorAll(".add-data-textarea");
    for (var i = 0; i <= (dataTextArr.length - 1); i+=2) {
        if (!(dataTextArr[i].value == "" && dataTextArr[i + 1].value == "")) {
            str += dataTextArr[i].value + EODT;
            str += dataTextArr[i + 1].value + EOD;
        } 
        else;
    }
    str += EOB;
    getServiceArray();
}

function getServiceArray() {
    var serviceArr = [], serviceArrIndexes = [0];
    // Example string
    passStr  = "service1{endofservice}title1{endofdatatitle}data1{endofdata}title2{endofdatatitle}data2{endofdata}title3{endofdatatitle}data3{endofdata}title4{endofdatatitle}data4{endofdata}{endofblock}service2{endofservice}title1{endofdatatitle}data1{endofdata}title2{endofdatatitle}data2{endofdata}title3{endofdatatitle}data3{endofdata}title4{endofdatatitle}data4{endofdata}{endofblock}service3{endofservice}title1{endofdatatitle}data1{endofdata}title2{endofdatatitle}data2{endofdata}title3{endofdatatitle}data3{endofdata}title4{endofdatatitle}data4{endofdata}{endofblock}";
    var i = -1;
    while((i = passStr.indexOf(EOS, i + 1)) >= 0) 
        serviceArrIndexes.push(i);
    
    i  = -1;
    while((i = passStr.indexOf(EOB, i + 1)) >= 0) 
        serviceArrIndexes.push(i + 12);

    serviceArrIndexes.sort(function(a, b){return a - b});
    
    for (var j = 0; j <= (serviceArrIndexes.length - 2); j+=2) {
        serviceArr.push(passStr.slice(serviceArrIndexes[j], serviceArrIndexes[j + 1]));
    }
    console.log(serviceArr);
    return serviceArr;
}

function cancelAddData() {
    for (var i = 0; i <= (addRowIndex - 1); i++) 
        document.querySelector("#add-data-card").lastChild.remove();

    document.querySelector("#service-textarea").value = "";
    document.querySelector("#data-title-textarea0").value = "Password";
    document.querySelector("#data-textarea0").value = "";
    hideElement("#add-data");

    showElement("#password-access");
    document.querySelector("#search-bar").value = "";
    autoSelect("#search-bar");

    addRowIndex = 0;
}

function deleteDataRow(element) {
    if ((addRowIndex + 1) >= 2) {
        addRowIndex--;
        element.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    }
    else {
        var modal = new bootstrap.Modal(document.querySelector("#add-data-modal"), { keyboard: true });
        modal.show();
    }
}

function generateRandomPassword(element) {
    const SAFE_CHARS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", PASS_MIN = 12, PASS_MAX = 18;
    var password = "";

    for (var i = 0; i <= (Math.floor(Math.random() * PASS_MAX) + PASS_MIN - 1); i++)
        password += SAFE_CHARS.charAt(Math.floor(Math.random() * SAFE_CHARS.length));
   
    element.parentElement.parentElement.parentElement.parentElement.querySelector(".form-control").value = password;
}

function copyContent(element) {
    var textArea = element.parentElement.parentElement.parentElement.parentElement.querySelector(".form-control");
    textArea.select();
    textArea.setSelectionRange(0, 99999);

    document.execCommand("copy");
}

function search() {
    var searchPhrase = document.querySelector("#search-bar").value;
}

// function download(filename, text) {
//     var element = document.createElement('a');
//     element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//     element.setAttribute('download', filename);
  
//     element.style.display = 'none';
//     document.body.appendChild(element);
  
//     element.click();
  
//     document.body.removeChild(element);
// }

function download(filename, text) {
    var reader = new FileReader();
    var out = new Blob([text], { type: 'text/plain' });
    reader.onload = function(e) {
        window.location.href = reader.result;
    }
    reader.readAsDataURL(out);

    var fileURL = URL.createObjectURL(out);
    var a = document.createElement('a');
    a.href = fileURL;
    a.target = '_blank';
    a.download = filename;
    document.body.appendChild(a);
    a.click();
}

function autoSelect(element) {
    document.querySelector(element).select();
    document.querySelector(element).setSelectionRange(0, 99999);
}

function showElement(id) {
    document.querySelector(id).style.display = 'inline-block';
}

function hideElement(id) {
    document.querySelector(id).style.display = 'none';
}