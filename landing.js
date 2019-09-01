
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
setTimeout(winner, 8300);

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











