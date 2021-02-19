// jshint esversion: 6
// jshint esversion: 8
var user = {};

function getAccounts() {/*function to retrieve account information from database*/
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://idassignment3-a174.restdb.io/rest/account",
        "method": "GET",
        "headers": {
            "content-type": "application/json",
            "x-apikey": "602a380e5ad3610fb5bb6020",
            "cache-control": "no-cache"
        }
    };

    $.ajax(settings).done(function (response) {
        response.forEach(object => {
            console.log(object);
            user[object.username] = object.password;
        });
    });
}



getAccounts();

loggedin = false;
function loginUser()/*checking login credentials*/ {
    username = $("#newUsername").val();
    password = $("#newPassword").val();

    if (username in user) {
        if (password === user[username])/*checking if passwords are the same*/ {
            loggedin = true;
            refreshContent(username);
        }
        else {
            alert("Password incorrect");
        }
    }
    else {
        alert("Username incorrect");
    }

}

function registerUser()/*checking registering credentials*/ {
    username = $("#newUsername").val();
    password = $("#newPassword").val();
    cPassword = $("#newCPassword").val();

    if (username != "" && password != "" && cPassword != "")/*checking id values are not blank*/ {

        console.log(username);
        console.log(password);
        console.log(cPassword);
        if (username in user)/*checking if username is taken*/ {
            console.log('username taken');
        }
        else {
            if (password === cPassword)/*checking if password and confirm passswords are the same*/ {
                let jsondata = {
                    "username": username,
                    "password": password
                };

                let settings = {/*posting account username and password to database ( registering ) */
                    "async": true,
                    "crossDomain": true,
                    "url": "https://idassignment3-a174.restdb.io/rest/account",
                    "method": "POST",
                    "headers": {
                        "content-type": "application/json",
                        "x-apikey": "602a380e5ad3610fb5bb6020",
                        "cache-control": "no-cache"
                    },
                    "processData": false,
                    "data": JSON.stringify(jsondata)
                };

                user[username] = password;

                $.ajax(settings).done(function (response) {
                    alert("Registration successfull!");
                    loggedin = true;
                    refreshContent(username);
                });

            }
            else {
                alert("Please make sure the passwords are the same!");
            }
        }
    }
    else {
        alert("Please make sure to input all information!");
    }
}

function refreshContent(name)/*refresh content depending on the login status*/ {
    if (loggedin)/*appends this if user is logged in*/ {

        $(".account-form").remove();
        $("#account-content").append("<div class='loggedin'>" +
            "<div class='loginPrompt'>Successfully Logged In!</div>" +
            `<div class='login-header'>You are currently logged in as ${name}</div>` +
            "<div class='login-content'>" +
            "<div class='login-options'><button onclick='logOut()' class='accountBtn'>Log Out</button></div>" +
            "</div>" +
            "</div>");
    }
    else/*appends this if user is not logged in*/ {
        $(".loggedin").remove();
        $("#account-content").append("<form class='account-form'>" +
            "<h1 class='account-header' id='account'>Register</h1>" +
            "<div class='form-header'>" +
            "<div class='tab-container'><a class='form-tabs' id='regTab' href='#' onclick='register()'>Register</a></div>" +
            "<div class='tab-container'><a class='form-tabs' id='loginTab' href='#' onclick='login()'>Login</a></div>" +
            "</div><p><label>Username</label>" +
            "<input class='textbox' id='newUsername' type='text' required></p><p><label>Password</label>" +
            "<input class='textbox' id='newPassword' type='password' required></p><p>" +
            "<label>Confirm Password</label>" +
            "<input class='textbox' id='newCPassword' type='password' required></p>" +
            "<p class='btn-container'>" +
            "<button type='button' onclick='registerUser()' id='regBtn'>Register</button></p>" +
            "</form>");
    }
}

function logOut()/*changed login status to false*/ {
    loggedin = false;
    refreshContent();
}

var clicked;
var previous;
function register()/*appends registering form to page*/ {
    var x = document.getElementById("account-content");
    x.innerHTML = "";
    $("#account-content").append("<form class='account-form'>" +
        "<h1 class='account-header' id='account'>Register</h1>" +
        "<div class='form-header'>" +
        "<div class='tab-container'><a class='form-tabs' id='regTab' href='#' onclick='register()'>Register</a></div>" +
        "<div class='tab-container'><a class='form-tabs' id='loginTab' href='#' onclick='login()'>Login</a></div>" +
        "</div>" +

        "<p>" +
        "<label>Username</label>" +
        "<input class='textbox' id='newUsername' type='text' required>" +
        "</p>" +

        "<p>" +
        "<label>Password</label>" +
        "<input class='textbox' id='newPassword' type='password' required>" +
        "</p>" +
        "<p>" +
        "<label>Confirm Password</label>" +
        "<input class='textbox' id='newCPassword' type='password' required>" +
        "</p>" +
        "<p class='btn-container'>" +
        "<button type='button' onclick='registerUser()' id='regBtn'>Register</button>" +
        "</p>");
    clicked = document.getElementById("regTab");
    previous = document.getElementById("loginTab");
    applyChanges();
}

function login()/*appends login form to page*/ {

    var x = document.getElementById("account-content");
    x.innerHTML = "";
    $("#account-content").append("<form class='account-form'>" +
        "<h1 class='account-header' id='account'>Login</h1>" +
        "<div class='form-header'>" +
        "<div class='tab-container'><a class='form-tabs' id='regTab' href='#' onclick='register()'>Register</a></div>" +
        "<div class='tab-container'><a class='form-tabs' id='loginTab' href='#' onclick='login()'>Login</a></div>" +
        "</div>" +

        "<p>" +
        "<label>Username</label>" +
        "<input class='textbox' id='newUsername' type='text' required>" +
        "</p>" +

        "<p>" +
        "<label>Password</label>" +
        "<input class='textbox' id='newPassword' type='password' required>" +
        "</p>" +
        "<p class='btn-container'>" +
        "<button type='button' onclick='loginUser()' id='loginBtn'>Login</button>" +
        "</p>");
    clicked = document.getElementById("loginTab");
    previous = document.getElementById("regTab");
    applyChanges();

}

function applyChanges()/*changes css when login/register tab is clicked*/ {
    clicked.style.color = "purple";
    clicked.style.borderBottom = "2px solid purple";
    clicked.style.position = "absolute";

    previous.style.color = "black";
    previous.style.borderBottom = "none";
    previous.style.position = "inherit";
}