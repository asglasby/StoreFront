"use strict"
window.myUrl = "https://ebodycenter.firebaseio.com/.json";
window.myUsersUrl = "https://ebodycenter.firebaseio.com/Users.json";
window.listofUsers = [];
window.listOfUsersToFirebase=[];
window.username = "";
window.password = "";
window.newUser = "";

var User = function (username, password) {
    this["username"] = username;
    this["password"] = password;
};

var productPrototype = {};
productPrototype["storeName"] = "EbodyCenter";

var Products = function (productName, productDescription, productPrice, productPicture) {
    this["productName"] = productName;
    this["productDescription"] = productDescription;
    this["productPrice"] = productPrice;
    this["productPicture"] = productPicture;
};

Products.prototype = productPrototype;

var login = function () {
    "use strict";    
    loginScreen();
};

var loginScreen = function () {
    document.getElementById("userInfo").innerHTML = '<input id="username" placeholder="Enter Username to Login" />' + '<input id="password" placeholder="Enter Password" />' + '<button class="btn" onclick="authenticateUser();">Login</button>';
    //onclick get the list of usernames and check to see if the username exists, if not, set the username and password.  Then store in firebase and local storage.  

    //if (typeof (Storage) !== "undefined") {
    //    localStorage.setItem(username, "");
    //    localStorage.setItem(password, "");

    //    //check to see if the username already exists.  If the username does not exist, set the username.
    //    var username = document.getElementById("username").value;
    //    var password = document.getElementById("password").value;
    //}
    //else {
    //    // Sorry! No Web Storage support..
    //}
};



