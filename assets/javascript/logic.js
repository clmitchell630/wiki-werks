$(document).ready(function () {
/*
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
*/
    //Need to flesh out later to remove spaces between mutliword entries and replace with %20 which is the Unicode version of " ".
    function WikiSearchSpaceKiller(string) {
        
    }
    //When something with id wiki-form is clicked, perform the following function.
    $("#find-wiki").on("click", function() {
        //Defines a variable that takes the field text on the form and stores it.
        var WikiFormEntry = $(this).data("search");
        //Defines a variable that stores the strucutre of a Wikipedia API request. 
        var WikiQueryURL = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + WikiFormEntry + "&format=jsonfm"
        //Runs an AJAX call on an object that has a key value pair of url with our defined variable above. and the method paired with 'GET'
        $.ajax({ url:WikiQueryURL, method: 'GET' })
            //Once that is done do the following.
            .done(function (response) {
                /*Log out the response from the API Query. 
                This is for our benefit as we're coding. 
                We can remove it later to keep it hidden from the user if they go into the console. */
                console.log(response);
                /*Runs a for loop on the response we get back.
                Enumerates until we hit all the response we get back. 
                */
                for (var i=0; i < response.data.length; i++)
                    /*Variable that creates a new div with a class.
                    We can target this class later for formatting*/
                    var NewDiv = $("<div class='WikiReturn'>");
                    //Calls our NewDiv function and adds in information.
                    $(NewDiv).prepend("<h2>" + response.data[i].title + "</h2>")
                    $(NewDiv).prepend("<p>" + response.data[i].snippet + "</p>")
                    $("#wiki-view").prepend(NewDiv);
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