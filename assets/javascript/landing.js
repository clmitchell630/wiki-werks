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
        //How long we want the effect to last in milliseconds.
        duration: 550,
        //Shake that thang (Controls movement animation.)
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

//Directing to main page (request.html)
function winner() {
    window.location = "./request.html"
}

//on click, run validateForm() function

$('#start').click(function () {
    validateForm();
});

//checking UI validation/formatting
function validateForm() {
    // This is the variable for the name field
    var x = document.forms["myForm"]["fname"].value;

    // This is the variable for the email field
    var y = document.forms["myForm"]["userEmail"].value;
    //What does an email address have? Typically this stuff. 
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //Checks to make sure it ain't blank. 
    if (x == "" || y == "") {
        $('#michell').text("All fields must be completed");
        console.log("test");
        letsAnime2();
        return false;
    }

    //This allows pass through to second page if everything is formatted/entered correctly
    //Directs user to main page upon successful UI pass.
    else if (y.match(mailformat)) {
        Fireit();
        return true,
            winner();


    }
    //Directs user to the screen. Then to their internal monologue where they think: "How did I mess it up this time?""
    else {
        $('#michell').text("Please submit a properly formatted email address");
        console.log("test")
        letsAnime2();
        return false;

    }

}













