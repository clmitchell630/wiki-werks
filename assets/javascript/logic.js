$(document).ready(function () {
    //When button is clicked perform the following actions:
    $('button').on("click", function () {
    //Defines the text within the search bar as a variable called x.
    var x = $(this).data("search")
    //Defines the QueryURL as the start of the Wikipedia API and adds the search term at the end.
    var queryURL = "https://www.en.wikipedia.org/w/api.php?action=query&" + x;
    //Start of the AJAX call as an object. URL has a key pair of our defined QueryURL above, and the method with a value of 'GET'.
    $.ajax({ url: queryURL, method: 'GET' })
        //Once it is completed do the following.
        .done(function (response) {
            //Logs the respone we receive back in the console, for our sake as the coders. Can be removed later if you want to keep it secret from users for some reason.
            console.log(response);
            //Runs a for loop on the returned response. 
            for (var i = 0; i < response.data.length; i++) {
                //Establisihng a variable that creates a new div with some predefined styling. Would probably make more sense to assign it a class and style that class with CSS.
                var NewDiv = $("<div style='display:inline-block; margin-right: 10px; '>");
                //Use our NewDiv and prepend  
                $(NewDiv).prepend("<p>Rating: " + response.data[i].rating + "</p>");
                $(NewDiv).prepend("<img src='" + response.data[i].images.fixed_height.url + "'>");
                $("#wiki-view").prepend(newdiv);
            }
        })
    })

    $.ajax({ url: queryURL, method: 'GET'})
        .done(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                var NewDiv = $("<div style='display:inline-block; margin-right: 10px; '>");
                $(NewDiv).prepend(response.data[i].title)
            }
        })

    function WikiSearchSpaceKiller(string) {
        if
    }

    $("#wiki-form").on("click", function() {
        var WikiFormEntry = $(this).data("search");
        var WikiQueryURL = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0

        
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