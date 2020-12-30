document.querySelector("#password").addEventListener("keydown", checkKeyPressed, false);

function alreadyHaveFile() {
    hideElement("#enter-password");
    showElement("#access-file");
}

function makeNewFile() {
    hideElement("#access-file");
    showElement("#enter-password");
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