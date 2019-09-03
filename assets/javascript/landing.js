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
<<<<<<< HEAD

    // this is the variable that estabishes the email format
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    // this establishes that the neither fields can be empty otherwise a text message is generated
=======
    //What does an email address have? Typically this stuff. 
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //Checks to make sure it ain't blank. 
>>>>>>> 813d991d2a2f71e66ec6dbb4cd208c1dd4c93e75
    if (x == "" || y == "") {
        $('#michell').text("All fields must be completed");
        console.log("test");
        letsAnime2();
        return false;
    }
<<<<<<< HEAD
<<<<<<< HEAD
    //This allows pass through to second page if everything is formatted/entered correctly

    //play spinning animation and direct user to main page
=======
    //directs user to main page upon successful UI pass
>>>>>>> 89973425f14cd42b8688031eac4f75fc1834b916
=======
    //Directs user to main page upon successful UI pass.
>>>>>>> 813d991d2a2f71e66ec6dbb4cd208c1dd4c93e75
    else if (y.match(mailformat)) {
        Fireit();
        return true,
            winner();


    }
<<<<<<< HEAD
    // This enters a text message if the email is not formatted correctly

=======
    //Directs user to the screen. Then to their internal monologue where they think: "How did I mess it up this time?""
>>>>>>> 813d991d2a2f71e66ec6dbb4cd208c1dd4c93e75
    else {
        $('#michell').text("Please submit a properly formatted email address");
        console.log("test")
        letsAnime2();
        return false;

    }

}













