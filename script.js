document.querySelector("#input-file").addEventListener("change", getFile);
document.querySelector("#password").addEventListener("keydown", checkKeyPressed, false);

function alreadyHaveFile() {
    hideElement("#enter-password");
    showElement("#access-file");
}

function makeNewFile() {
    hideElement("#access-file");
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

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

function download2() {
    
    var out = new Blob(["Hello, world!"], {type: 'text/plain'});
    link.href = URL.createObjectURL(out);

link.click();

URL.revokeObjectURL(link.href);
}

function checkKeyPressed(event) {
    if (event.keyCode == "13") enterPassword();
    else;
}

function enterPassword() {
    var pass = document.querySelector("#password").value;
    if (validation(pass) == true) {
        hideElement("#password-warning-block");
    }
    else showElement("#password-warning-block");
}

function validation(str) {
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

function showElement(id) {
    document.querySelector(id).style.display = 'inline-block';
}

function hideElement(id) {
    document.querySelector(id).style.display = 'none';
}