
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

//function for button spinning animation for UI success (optional)
function letsAnime() {

    anime({

        targets: '.bttn',
        loop: false,
        translateY: [
            { value: -100, duration: 800 },
            { value: 0, duration: 4000 },
        ],
        rotate: {
            value: '2turn',
            easing: 'easeInOutSine',

        }

    });

}


//function to direct to main page
function winner() {
    window.location = "./request.html";
}

//on click, run validateForm() function
$(document).ready(function () {
    $('#start').click(function () {
        validateForm();
    });

    //creating function to spin anime.js and take user to request.html


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

        //added letsGo() function here to direct user to main page if UI validates
        else if (y.match(mailformat)) {
            letsAnime();
            return true;


        }
        else {
            $('#michell').text("Please submit a properly formatted email address");
            console.log("test")
            letsAnime2();
            return false;

        }

    }

});









