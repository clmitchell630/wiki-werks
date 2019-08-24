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

$('#start').click(function() {
    window.location = "./request.html";
 });





 
   



