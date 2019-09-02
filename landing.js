
<<<<<<< HEAD
function validateForm() {
<<<<<<< HEAD
    var x = document.forms["myForm"]["fname"].value;
    var y = document.forms["myForm"]["userEmail"].value;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (x == "" || y == "") {
        $('#michell').text("All fields must be completed");
        console.log("test")
        return false;
    }
    else if (y.match(mailformat)) {
        return true;

    }
    else {
        $('#michell').text("Please submit a properly formactted email address");
        console.log("test")
        return false;

    }

}

$('#start').click(function () {
    validateForm();
    if (
=======
  var x = document.forms["myForm"]["fname"].value;
  var y = document.forms["myForm"]["userEmail"].value;
 
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
=======
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
>>>>>>> f8417e8960c2c26e34e0d2f9a11b20b18376a887

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

        var x = document.forms["myForm"]["fname"].value;
        var y = document.forms["myForm"]["userEmail"].value;

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (x == "" || y == "") {
            $('#michell').text("All fields must be completed");
            console.log("test");
            letsAnime2();
            return false;
        }
        //play spinning animation and direct user to main page
        else if (y.match(mailformat)) {
            Playsound();
            return true,
                Spin().done(winner());
        }
        else {
            $('#michell').text("Please submit a properly formatted email address");
            console.log("test")
            letsAnime2();
            return false;

        }

    }

});



<<<<<<< HEAD
$('#start').click(function() {
>>>>>>> bcaf7c453366fadb5e9ae80e913a3613b4a2ccb4
    window.location = "./request.html";
    
});


=======
>>>>>>> f8417e8960c2c26e34e0d2f9a11b20b18376a887








