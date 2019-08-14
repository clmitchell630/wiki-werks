$(document).ready(function () {
    
    $('button').on("click", function () {
    var x = $(this).data("search")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=jk92ejWlxe2OrTcIMoR8D5thfcuJyakh&limit=10";
    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var newdiv = $("<div style='display:inline-block; margin-right: 10px; '>");
                $(newdiv).prepend("<p>Rating: " + response.data[i].rating + "</p>");
                $(newdiv).prepend("<img src='" + response.data[i].images.fixed_height.url + "'>");
                $("#wiki-view").prepend(newdiv);
            }
        })
    })

    

        $("#sidebar").mCustomScrollbar({
             theme: "minimal"
        });
    
        $('#sidebarCollapse').on('click', function () {
            // open or close navbar
            $('#sidebar').toggleClass('active');
            // close dropdowns
            $('.collapse.in').toggleClass('in');
            // and also adjust aria-expanded attributes we use for the open/closed arrows
            // in our CSS
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    
    });