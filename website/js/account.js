var user = {};
function getAccounts()
{
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
      }

      $.ajax(settings).done(function (response) {
        response.forEach(object => {
            console.log(object);
            user[object.username] = object.password;
        });
    })
}

      

getAccounts()

loggedin = false;
function loginUser()
{
    username = $("#newUsername").val();
    password = $("#newPassword").val();
    
    if(username in user)
    {
        if(password === user[username])
        {   
            loggedin = true;
            refreshContent(username);
        }
        else
        {
            alert("Password incorrect");
        }
    }
    else
    {
        alert("Username incorrect");
    }

}

function registerUser()
{
    username = $("#newUsername").val();
    password = $("#newPassword").val();
    cPassword = $("#newCPassword").val();

    if(username != "" && password != "" && cPassword != "")
    {
        
        console.log(username);
        console.log(password);
        console.log(cPassword);
        if(username in user)
        {
            console.log('username taken');
        }
        else
        {
            if(password === cPassword)
            {
                let jsondata = {
                    "username": username,
                    "password": password
                };

                let settings = {
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
                    "data" : JSON.stringify(jsondata)
                }

                user[username] = password;

                $.ajax(settings).done(function(response) {
                    alert("Registration successfull!");
                    loggedin = true;
                    refreshContent(username);
                })
                
            }
            else
            {
                alert("Please make sure the passwords are the same!");
            }
        }
    }
    else
    {
        alert("Please make sure to input all information!")
    }
}

function refreshContent(name)
{
    if(loggedin)
    {
        
        $(".account-form").remove();
        $("#account-content").append("<div class='loggedin'>" +
        "<div class='loginPrompt'>Successfully Logged In!</div>" +
        `<div class='login-header'>You are currently logged in as ${name}</div>` +
        "<div class='login-content'>" +
        "<div class='login-options'><button onclick='logOut()' class='accountBtn'>Log Out</button></div>" + 
        "</div>" +
        "</div>");
    }
    else
    {
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

function logOut()
{
    loggedin = false;
    refreshContent();
}

var clicked;
var previous;
function register()
{
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
    applyChanges()
}

function login()
{

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
    applyChanges()

}

function applyChanges()
{
    clicked.style.color = "purple";
    clicked.style.borderBottom = "2px solid purple";
    clicked.style.position = "absolute";

    previous.style.color = "black";
    previous.style.borderBottom = "none";
    previous.style.position = "inherit";
}