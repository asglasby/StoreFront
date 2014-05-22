// This is the starter page for creating a new account.
var createAccount = function () {
    "use strict";
    document.getElementById("userInfo").innerHTML = '<input id="username" placeholder="Enter Username to Login" />' + '<input id="password" placeholder="Enter Password" />' + '<button class="btn" onclick="createNewUser();">Create Account</button>';
};

// This function gets the existing users from the firebase database to check to see if a username already exists.
var createNewUser = function () {
    "use strict";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    newUser = new User(username, password);

    var request = new XMLHttpRequest();
    request.open("GET", myUsersUrl, true);
    //the onload is what we want to happen when the request comes base from firebase.
    request.onload = function (event) {
        if (this.status >= 200 && this.status < 400) {
            //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
            var data = JSON.parse(this.response);

            if (data === null) {
                sendUsers();
            } else {
                var userExists = false;
                for (var propName in data) {
                    if (data[propName]["username"] === username) {
                        alert("That username already exists");
                        userExists = true;
                        document.getElementById("username").value = "";
                        document.getElementById("password").value = "";
                        //break;              
                    } //continue;
                }
                if (userExists === false) {
                    sendUsers();
                    productPage();
                }
            }
        } else {
            //this is was happens when the request fails
            console.log(this.response);
        }
    };
    // This lets us know what to do when an error occured.  Either you or the server is offline.
    request.onerror = function () {
        //This on error is for when the connection fails
        console.log("Oh No, the connection failed!");
    }
    //what ever is put inside send is posted to the server.  If whatever we are sending is already a string, we do not need to JSON.stringify it.  If we are getting information from the server, the parameter for the request.send() will be empty. 
    request.send();
};

// This function will send new users to the firebase Database if the user does not already exist.
var sendUsers = function () {
    "use strict";
    alert("Sending new user to Firebase!");
    var request = new XMLHttpRequest();
    request.open("POST", myUsersUrl, true); // Post will send the information to firebase

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
    request.send(JSON.stringify(newUser));//what ever is put inside send is posted to the server.  Since our tweet is an object, the JSON stringify will turn it into a string.  If whatever we are sending is already a string, we do not need to JSON.stringify it.
    //localStorage.setItem(newUser, "");
    //sendTweetsArray.push(tweet);
    //alert(JSON.stringify(newTweetArray));
    //sendTweetPost();
};

var authenticateUser = function () {
    "use strict";
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    //get the list of userNames from firebase and check to see if the user exists
    var request = new XMLHttpRequest();
    request.open("GET", myUsersUrl, true);

    //the onload is what we want to happen when the request comes base from firebase.
    request.onload = function (event) {
        if (this.status >= 200 && this.status < 400) {
            //this will parse my response which will be a key that will be retuned as an object, which can be used.  The key is letting me know how to access my key later.
            var data = JSON.parse(this.response);

            if (data === null) {
                creatNewUser();
            } else {
                var loginSuccess = false;
                for (var propName in data) {
                    if (data[propName]["username"] == username && data[propName]["password"] == password) {
                        // go to the product page and begin shopping
                        loginSuccess = true;
                        loggedInUser = username;
                        alert("login Successful");
                    }
                }
                if (loginSuccess === true && loggedInUser === "Admin") {
                    adminPage();
                } else {
                    if (loginSuccess === true && data[propName]["username"] !== ["Admin"]) {
                        productPage();
                    }
                }

                if (loginSuccess === false) {
                    alert("Either your username or password was not correct, Please try again!");
                    document.getElementById("storeFront").innerHTML = "";
                    loginScreen();
                }
            }
        } else {
            // This is was happens when the request fails due to server errors.
            console.log(this.response);
        }
    };
    // This lets us know what to do when a connection error occurs
    request.onerror = function () {
        console.log("Oh No, the connection failed!");
    }
    request.send();//what ever is put inside send is posted to the server.  Since our tweet is an object, the JSON stringify will turn it into a string.  If whatever we are sending is already a string, we do not need to JSON.stringify it.    
};