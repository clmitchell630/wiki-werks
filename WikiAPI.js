$(function(){
    //When the button with id find-wiki is clicked it takes in the search request and performs a function.
    $("#find-wiki").on("click", function (search) {
        //Prevents the default action and allows this to actually function.
        search.preventDefault();
        //Clears our previous entries.
        $("#WikiList").empty();
        //We take our search tearm from our wiki input form button.
        var Query = $("#wiki-input").val().trim();
        //Prebuilt Wikipedia URL for API requests. 
        var QueryURL = 
        //Basic call 
        "https://en.wikipedia.org/w/api.php?" + 
        //Wikipedia's request for a list of articles is titled opensearch
        "action=opensearch" + 
        //Return format as json, but guess what? It's not an object. It's an array. *shrug*. Took me forever to figure that out.
        "&format=json" + 
        //You need this part here, or else you get a CORS error, and that's a whole other rabbit hole. The double edged sword of no API key required.
        "&origin=*" + 
        //Yo, what you looking you to search?
        "&search=" + 
        //This, you're looking to search this. This is what was typed in to the request earlier. 
        Query + 
        //How many results do we want back? Let's list it at 15 and call it a day.
        "&limit=15"
        //AJAX baby!
        $.ajax({
            //What is our URL? It's QueryURL. What's QueryURL. Everything in our previous thing above starting at line 11.
            url: QueryURL,
            //What is GET? Getting data from Wikipedia *finger guns*
            method: "GET"
        //What do we do after we send the request? This stuff down below.
        }).then(function (response){
            /*Log that response back in the console. Gotta see what we get back in case stuff goes wrong.
            If we get shorted of data, then we've got some kneecaps to break. 
            Probably my own because it means I probably messed up.
            Please don't break my kneecaps. */
            console.log(response);
            /* The for loop that brings it all together.
            In our WikiList ID on our request page. Do the following:
            Make a new div.
            Make a new div in that div.
            Create a link to the wikipedia article.
            Everything done in the action=opensearch comes back as an array and needs to be formatted as such.
            [3][i]: The url for the page(s). The url of wherever we are in the for loop. 
            [1][i]: The title of the article(s). The title of wherever we are in the for loop.
            [2][i]: The excerpt of the page(s). The excerpt of whever we are in the for loop. */
            for(var i=0; i < response[1].length; i++){
                $("#WikiList").prepend("<div><div><a href="+response[3][i]+"><h2>" + response[1][i]+ "</h2>" + "<p>" + response[2][i] + "</p></a></div></div>");
            }
        })
    })
})