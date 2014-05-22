// This page shows the available products for sale.
var productPage = function () {
    "use strict";
    document.getElementById("storeFront").innerHTML = "Hello" + username + "These are the available products for sale!" + '<br><button class="btn" onclick="logout();">Log Out of The Store</button>';    
    document.getElementById("userInfo").className = "hide";        
    getProducts(); 
};

// The admin page will load when the admin logs in.  The admin is the only user that can add new products.
var adminPage = function () {
    "use strict";
    document.getElementById("userInfo").innerHTML = "";
    document.getElementById("storeFront").innerHTML = '<input id="productName" placeholder="Enter Product" />' + '<input id="productDescription" placeholder="Enter Product Description" />' + '<input id="productPrice" placeholder="Enter Product Price" />' + '<input id="productPicture" placeholder="Enter Product Photo URL" />' + '<input id="productCategory" placeholder="Enter Product Category" />' + '<button class="btn" onclick="addProduct();">Add New Product</button>' + '<br><button class="btn" onclick="logout();">Log Out of The Store</button>';
};

// This function gets the products from the firebase database after the user has logged in.
var getProducts = function () {
    "use strict";
    localStorage.clear();
    document.getElementById("storeFront").innerHTML = "";
    var request = new XMLHttpRequest();
    request.open("GET", myProductsUrl, true);

    //the onload is what we want to happen when the request comes back from firebase.
    request.onload = function (event) {
        if (this.status >= 200 && this.status < 400) {
            //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
            var data = JSON.parse(this.response);

            // this is what will be pulled out of the get function
            var counter = 0;
            
            for (var products in data) {

                // This line creates a property in data object coming from firebase and with hold the firebase key in that property.
                data[products].productID = products;

                productList.push(data[products]);
                document.getElementById("productTable").innerHTML += '<tr title="' + data[products]["productName"] + '" id="' + counter + '" onclick="addToCart(' + counter + ');"><td><img height="60" width="60" src=' + data[products]["productPicture"] + '></td><td>' + data[products]["productName"] + '</td><td>' + data[products]["productPrice"] + '</td><td>' + data[products]["productDescription"] + '</td><td>' + data[products]["productCategory"] + '</td><td>'+ "ProductID:" + products + '</td></tr>';
                counter++;                                
            }
            document.getElementById("completeTransaction").innerHTML = '<button class="btn" onclick="completeOrder();">Complete Order</button>';
            writeProductTable();
        } else {
            //this is was happens when the request fails
            console.log(this.response);
        }
    };
    // This lets us know what to do when a connection error occurs
    request.onerror = function () {        
        console.log("Oh No, the connection failed!");
    }
    // What ever is put inside send is posted to the server.  If whatever we are sending is already a string, we do not need to JSON.stringify it.
    request.send();     
    document.getElementById("logoutButton").innerHTML = '<br><button class="btn" onclick="logout();">Log Out of The Store</button>'   
};

// This function will upload new products to the firebase Database
var addProduct = function () {
    "use strict";
    var productName = document.getElementById("productName").value;
    var productDescription = document.getElementById("productDescription").value;
    var productPrice = document.getElementById("productPrice").value;
    var productPicture = document.getElementById("productPicture").value;
    var productCategory = document.getElementById("productCategory").value;
    var newProduct = new Product(productName, productDescription, productPrice, productPicture, productCategory);

    // This opens a new XMLHttpRequest.
    var request = new XMLHttpRequest();

    // Post will send the information to firebase
    request.open("POST", myProductsUrl, true); 

    // the onload is what we want to happen when the request comes base from firebase.
    request.onload = function (event) {
        if (this.status >= 200 && this.status < 400) {
            //this is what happens when our request is successful later.
            var data = JSON.parse(this.response); //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
            console.log(data);
        } else {
            //this is was happens when the request fails
            console.log(this.response);
        }
        //getTweets();
    };
    // This lets us know what to do when an error occured.  Either you or the server is offline.
    request.onerror = function () {
        //This on error is for when the connection fails
        console.log("Oh no, connection failed!");
    }
    alert("Sending new user to Firebase!");
    // What ever is put inside send is posted to the server.  If whatever we are sending is already a string, we do not need to JSON.stringify it.
    request.send(JSON.stringify(newProduct));  
   
    // After the products are added, clear all the input fields to add new products.
    document.getElementById("productName").value = "";
    document.getElementById("productDescription").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productPicture").value = "";
    document.getElementById("productCategory").value = "";
};

var writeProductTable = function () {
    "use strict";
    document.getElementById("newProductTable").innerHTML = "";
    for (var prods = 0; prods < productList.length; prods++) {
        document.getElementById("newProductTable").innerHTML +=
        '<tr title="' + productList[prods]["productName"] + '" id="' + shoppingCartCounter + '" onclick="addToCart(' + shoppingCartCounter + ');"><td><img height="60" width="60" src=' + productList[prods]["productPicture"] + '></td><td>' + productList[prods]["productName"] + '</td><td>' + productList[prods]["productPrice"] + '</td><td>' + productList[prods]["productDescription"] + '</td><td>' + productList[prods]["productCategory"] + '</td><td>' + "ProductID:" + productList[prods]["productID"] + '</td></tr>';
        shoppingCartCounter++;
    }
};

//// This function controls adding products to the shopping cart.
//var addToCart = function (productKey) {
//    "use strict";
//    productKey = document.getElementById(productKey).innerHTML;
//    document.getElementById("localStorage").innerHTML = "";
//    document.getElementById("localStorage").innerHTML = '<table id="localStorage"><th>Shopping Cart</th></table>'
//    localStorage["Item" + itemcounter] = JSON.stringify(productKey);

//    for (var items in localStorage) {
//        document.getElementById("localStorage").innerHTML += '<tr id=' + itemcounter + ' onclick="removeFromCart(' + itemcounter + ');">' + localStorage[items] + '<button onclick="removeFromCart(' + shoppingCartCounter + ');">Delete</button></tr>';
//        itemcounter++;
//    }    
//};

// This function controls adding products to the shopping cart.
var addToCart = function (productKey) {
    "use strict";
    productKey = document.getElementById(productKey).innerText;
    document.getElementById("localStorage").innerHTML = "";
    document.getElementById("localStorage").innerHTML = '<table id="localStorage"><th>Shopping Cart</th></table>'
    localStorage["Item" + itemcounter] = JSON.stringify(productKey);

    for (var items in localStorage) {
        var newItem = JSON.parse(localStorage[items]);
        document.getElementById("localStorage").innerHTML += '<tr id=' + itemcounter + ' onclick="removeFromCart(' + itemcounter + ');">' + newItem + '<button onclick="removeFromCart(' + shoppingCartCounter + ');">Delete</button></tr>';
        itemcounter++;
    }
};

var removeFromCart = function () {
    "use strict";
    alert("This function is not working yet!");
}

var completeOrder = function () {
    "use strict";
    alert("This button will send the shopping cart items to firebase");
    var request = new XMLHttpRequest();
    request.open("POST", myOrdersUrl, true); // Post will send the information to firebase

    // The onload is what we want to happen when the request comes base from firebase.
    request.onload = function (event) {
        if (this.status >= 200 && this.status < 400) {
            //this is what happens when our request is successful later.
            var data = JSON.parse(this.response); //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
            console.log(data);
        } else {
            //this is was happens when the request fails
            console.log(this.response);
        }
    };
    // This lets us know what to do when an error occured.  Either you or the server is offline.
    request.onerror = function () {
        //This on error is for when the connection fails
        console.log("Oh no, connection failed!");
    }
    alert("Your Order has been processed!");
    request.send(JSON.stringify(localStorage));
    document.getElementById("localStorage").innerHTML = "";
    localStorage.clear();
};