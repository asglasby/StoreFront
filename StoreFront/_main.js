"use strict"
window.myUrl = "https://ebodycenter.firebaseio.com/.json";
window.myUsersUrl = "https://ebodycenter.firebaseio.com/Users.json";
window.myProductsUrl = "https://ebodycenter.firebaseio.com/Products.json";
window.listofUsers = [];
window.listOfUsersToFirebase=[];
window.username = "";
window.password = "";
window.newUser = "";

var userPrototype = {};
userPrototype["shoppingCart"] = [];

var User = function (username, password) {
    this["username"] = username;
    this["password"] = password;
};
User.prototype = userPrototype;

var productPrototype = {};
productPrototype["storeName"] = "EbodyCenter";


var Product = function (productName, productDescription, productPrice, productPicture, productCategory) {
    this["productName"] = productName;
    this["productDescription"] = productDescription;
    this["productPrice"] = productPrice;
    this["productPicture"] = productPicture;
    this["productCategory"] = productCategory;
};

Product.prototype = productPrototype;

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



