/*  1. Add a delete button to remove items from the product list when logged in as admin
    2. Add a delete button to remove items from the shopping cart when logged in as a regular user.
    3. Send Items correctly to the firebase server so that items are displayed correctly in firebase.
    4. Add a quantity input field to the product list and shopping cart.
    5. Automatically wrap photo links around image tags for insertion into the database if possible.
    6. Add a drop down list in the admin section to add different categories.
    7. Change the addToShoppingCart function to come from the Array which should be stored in local storage.
*/

"use strict"
window.myUrl = "https://ebodycenter.firebaseio.com/.json";
window.myUsersUrl = "https://ebodycenter.firebaseio.com/Users.json";
window.myProductsUrl = "https://ebodycenter.firebaseio.com/Products.json";
window.myOrdersUrl ="https://ebodycenter.firebaseio.com/Orders.json";
window.listofUsers = [];
window.listOfUsersToFirebase=[];
window.username = "";
window.password = "";
window.newUser = "";
window.loggedInUser = "";
window.itemcounter = 1;
window.productID = "";
window.productList = [];
window.shoppingCartCounter = 0;

var userPrototype = {};
userPrototype.shoppingCart = [];

var User = function (username, password, shoppingCart) {
    this["username"] = username;
    this["password"] = password;    
};

User.prototype = userPrototype;

var productPrototype = {};
productPrototype["storeName"] = "Body Center";

var Product = function (productName, productDescription, productPrice, productPicture, productCategory) {
    "use strict";
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
    "use strict";
    document.getElementById("userInfo").innerHTML = '<input id="username" placeholder="Enter Username to Login" />' + '<input id="password" placeholder="Enter Password" />' + '<button class="btn" onclick="authenticateUser();">Login</button>'; 
};



