var addRowCount = 0;

document.querySelector("#input-file").addEventListener("change", getFile);

document.querySelector("#password").addEventListener("keydown", function() {
    if (event.keyCode == "13") enterPassword();
}, false);

document.querySelector("#search-bar").addEventListener("keydown", function() {
    if (event.keyCode == "13") search();
}, false);

function alreadyHaveFileBtn() {
    hideElement("#enter-password");
    showElement("#upload-file");
}

function makeNewFileBtn() {
    hideElement("#upload-file");
    showElement("#enter-password");
}

function getFile(event) {
	const input = event.target;
    if ("files" in input && input.files.length > 0)
        readFileContent(input.files[0]).then(content => {
            document.querySelector("#content-target").value = content;
            save("pojs.txt", content);
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

function save(filename, data) {
    var blob = new Blob([data], {type: 'text/csv'});
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}

function enterPassword() {
    var pass = document.querySelector("#password").value;
    if (passwordValidation(pass) == true) {
        hideElement("#password-warning-block");
        hideElement("#start");
        hideElement("#enter-password");
        showElement("#password-access");
        // Search bar is auto selected
        document.querySelector("#search-bar").select();
        document.querySelector("#search-bar").setSelectionRange(0, 99999);
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
}

function addDataRow() {
    addRowCount++;
    var dataRow = document.querySelector(".data-row").cloneNode(true);

    var dataTextArr = dataRow.querySelectorAll(".form-control");
    dataTextArr[0].id = "data-title-textarea" + addRowCount;
    dataTextArr[0].value = "";
    dataTextArr[1].id = "data-textarea" + addRowCount;
    dataTextArr[1].value = "";

    var labelArr = dataRow.querySelectorAll("label");
    labelArr[0].setAttribute("for", "data-title-textarea" + addRowCount);
    labelArr[1].setAttribute("for", "data-textarea" + addRowCount);

    dataRow.querySelector(".dropdown-toggle").setAttribute("for", "data-textarea" + addRowCount);

    document.querySelector("#add-data").appendChild(dataRow);
}

function saveToFile() {

}

function cancelAddData() {
    hideElement("#add-data");
    showElement("#password-access");
}

function deleteDataRow(element) {
    if ((addRowCount + 1) >= 2) {
        addRowCount--;
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

function showElement(id) {
    document.querySelector(id).style.display = 'inline-block';
}

function hideElement(id) {
    document.querySelector(id).style.display = 'none';
}