document.querySelector("#input-file").addEventListener("change", getFile);

document.querySelector("#password").addEventListener("keydown", function() {
    if (event.keyCode == "13") enterPassword();
}, false);

document.querySelector("#search-bar").addEventListener("keydown", function() {
    if (event.keyCode == "13") search();
}, false);

document.querySelector(".remove-btn").addEventListener("mouseover", function() {
    hideElement(".remove-btn");
    showElement(".remove-btn-hover");
});

document.querySelector(".remove-btn").addEventListener("mouseout", function() {
    hideElement(".remove-btn-hover");
    showElement(".remove-btn");
});

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
    hideElement("#search");
    hideElement("#add-btn");
    showElement("#add-data");
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