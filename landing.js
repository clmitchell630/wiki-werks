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

  if (x == "" || y == "") {
    $('#michell').text("All fields must be completed");
    console.log ("test")
    return false;
}
else if (y.match(mailformat)){ 
    return true;

    //anime here?

} 
else {
    $('#michell').text("Please submit a properly formactted email address");
    console.log ("test")
    return false;

} 

}





$('#start').click(function() {
>>>>>>> bcaf7c453366fadb5e9ae80e913a3613b4a2ccb4
    window.location = "./request.html";
    
});










