var btn = document.getElementById('bttn');

btn.onclick = function () {
    var morphing = anime({
        targets: '.polymorph',
        points: [
            { value: '215, 110 0, 110 0, 0 47.7, 0 67, 76'},
            { value: '215, 110 0, 110 0, 0 0, 0 67, 76'}
        ]
    })
}