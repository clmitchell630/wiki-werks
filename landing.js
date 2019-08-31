anime({
    targets: '.bttn',
    loop: true,
    translateY: [
        { value: -100, duration: 800 },
        { value: 0, duration: 4000 },
    ],
    rotate: {
        value: '2turn',
        easing: 'easeInOutSine'
    }

});

//on click, run validateForm() function
$('#start').click(function () {
    validateForm();
});

//creating function to take user to request.html
function letsGo() {
    window.location = "./request.html";
}

//checking UI validation/formatting
function validateForm() {

    var x = document.forms["myForm"]["fname"].value;
    var y = document.forms["myForm"]["userEmail"].value;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (x == "" || y == "") {
        $('#michell').text("All fields must be completed");
        console.log("test")
        return false;
    }

    //added letsGo() function here to direct user to main page if UI validates correctly
    else if (y.match(mailformat)) {
        letsGo();
        return true;

    }
    else {
        $('#michell').text("Please submit a properly formatted email address");
        console.log("test")
        return false;

    }

}











