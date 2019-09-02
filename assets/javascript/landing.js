
//function for anime.js button shake upon failed UI validation
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
    window.location.href = "./request.html";
}

//adding delay before request.html page load to allow for spin
setTimeout(winner, 8500);

//function for button spinning animation seen on UI pass
function Spin() {

    anime({

        targets: '.bttn',
        loop: false,
        translateY: [
            { value: -100, duration: 800 },
            { value: 0, duration: 4000, },
        ],
        rotate: {
            value: '2turn',
            easing: 'easeInOutSine',
        }
    });
}

//adding sound clip for UI validation success
function Playsound() {
    var audio = new Audio('magic.mp3');
    audio.loop = false;
    audio.play();
}

//on click, run validateForm() function
$(document).ready(function () {
    $('#start').click(function () {
        validateForm();
    });

    //checking UI validation/formatting
    function validateForm() {
        // This is the variable for the name field
        var x = document.forms["myForm"]["fname"].value;
        // This is the variable for the email field
        var y = document.forms["myForm"]["userEmail"].value;
        // this is the variable that estabishes the email format
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // this establishes that the neither fields can be empty otherwise a text message is generated
        if (x == "" || y == "") {
            $('#michell').text("All fields must be completed");
            console.log("test");
            letsAnime2();
            return false;
        }
        //This allows pass through to second page if everything is formatted/entered correctly
        //play spinning animation and direct user to main page
        else if (y.match(mailformat)) {
            Playsound();
            return true,
                Spin().done(winner());
        }
        // This enters a text message if the email is not formatted correctly
        else {
            $('#michell').text("Please submit a properly formatted email address");
            console.log("test")
            letsAnime2();
            return false;

        }

    }

});




// $('#start').click(function() {

//     window.location = "./request.html";

// });









