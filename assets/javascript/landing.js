//Referencing firebase server to authenicate and initialize the application
var firebaseConfig = {
    apiKey: "AIzaSyBI99NPnup0E664hUhummmuSYKwX0p_UBA",
    authDomain: "project1-ebc4f.firebaseapp.com",
    databaseURL: "https://project1-ebc4f.firebaseio.com",
    projectId: "project1-ebc4f",
    storageBucket: "",
    messagingSenderId: "677210244714",
    appId: "1:677210244714:web:e074b7c2ed781fc8"
};

//Initializing firebase connection and passing through firebaseConfig for authentication
firebase.initializeApp(firebaseConfig);

var dataRef = firebase.database();

//Setting the storage variables
var Name = "";
var Email = "";

function Fireit() {
    Name = $("#nameIt").val().trim();
    Email = $("#emailIt").val().trim();
    console.log(Email);
    dataRef.ref().push({
        Name: Name,
        Email: Email,
    });

    //Resetting form values
    $("#enter").val("");
    return false;
}
//Creating listener for changes made to database
dataRef.ref().on("child_added", function (childSnapshot) {

    var Userinput = childSnapshot.val().Name;
    var Userinput = childSnapshot.val().Email;
    console.log(Userinput);
});

//Function for anime.js button shake upon failed UI validation
function letsAnime2() {
    const xMax = 16;
    anime({
        targets: '.bttn',
        easing: 'easeInOutSine',
        duration: 550,
        translateX: [
            {
                value: xMax * -1,
            },
            {
                value: xMax,
            },
            {
                value: xMax / -2,
            },
            {
                value: xMax / 2,
            },
            {
                value: 0
            }
        ],
    });

}

//directing to main page (request.html)
function winner() {
    window.location = "./request.html"
}

//on click, run validateForm() function

$('#start').click(function () {
    validateForm();
});

//checking UI validation/formatting
function validateForm() {

    var x = document.forms["myForm"]["fname"].value;
    var y = document.forms["myForm"]["userEmail"].value;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (x == "" || y == "") {
        $('#michell').text("All fields must be completed");
        console.log("test");
        letsAnime2();
        return false;
    }
    //directs user to main page upon successful UI pass
    else if (y.match(mailformat)) {
        Fireit();
        return true,
            winner();


    }
    else {
        $('#michell').text("Please submit a properly formatted email address");
        console.log("test")
        letsAnime2();
        return false;

    }

}













