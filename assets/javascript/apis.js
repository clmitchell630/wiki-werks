//Initializing function.
$(function () {
    // topic save array
    var topics = [];
     
    //When you click on the search bar submit button perform the following.
    $("#find-wiki").on("click", function (e) {
        //Set query topic to whatever was entered into the search bar.
        var queryTopic = $("#wiki-input").val().trim();

        e.preventDefault();
        //Calls both the functions that handle the API calls to YouTube and Wikipedia respectively.
        callYouTube(queryTopic);
        callWiki(queryTopic);
        //If you enter nothing into a search bar than it asks you to type something in. 
        if (queryTopic === "") {

            //Alert message to inform them of a blank topic. 
            alert("PLEASE ENTER A TOPIC!");
            
        }
        //Entered something in to actually search? Great, we'll make it run this lovingly crafted function for you.
        else {
            growTopics(e);
        }

    });

    //------functions------
    //Our lovingly crafted add button function. This bad boy takes in your search topic and adds a button for it. 
    function addButton(name) {
        //Variable that demans JQuery create a button. 
        var newBtn = $("<button>");
        //Attribute is now set to button. 
        newBtn.attr("type", "button");
        //Attaches prebuilt bootstrap classes onto the button. 
        newBtn.addClass("btn btn-danger btn-block");
        //Name it the same thing as the search request. 
        newBtn.text(name);
        //Add it to the div with id of wiki-view. 
        $("#wiki-view").append(newBtn);
        //When we click on those buttons, let's also have it actually do stuff. Runs the API calls when the button is clicked.
        $(newBtn).on("click", function () {
            callYouTube(name);
            callWiki(name);
        });

    }
    //Another artisinal function that adds to our topic list. 
    function growTopics(e) {
        
        e.preventDefault();
        //Adds an element to our soon to be created button that is set to the search bar value. 
        var newTopic = $("#wiki-input").val().trim();
        topics.push(newTopic);
        //Calls our addButton function from above. 
        addButton(newTopic);
        //Resets our search bar.
        $("#wiki-input").val("");

    }
    //YouTube API. *Slaps roof of API* This bad boy can fit so many requests inside of it. 
    function callYouTube(name) {
        //Clears out the video section. 
        $("#ytList").empty();
        //Prebuilt YouTube API request complete with our API key. Plz, no steal API key.
        /*Also a sneaky little bit that adds educational to your search request. 
        Who'd have thought that there's pretty much a song for every educational topic out there
        that's vastly more popular than the educational content with the same name. 
        */
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + name + "+educational&maxResults=20&key=AIzaSyAPSES2I3JvLza-Ox2Rzta8_jnEJvgBj7U"
        //AJAX call. 
        $.ajax({
            url: queryURL,
            method: "GET"
        //What now? Is this the end? Do I just take in data and send it off?
        //No, you have a .then protocol aftewards to run a function. Take what they send back and do stuff to it.
        //Oh, thank God. I didn't know what to do with myself afterwards. 
        }).then(function (response) {
            //Log the response. 
            console.log(response);

            //For loop that adds each returned video into our ytlist div. 
            for (var i = 0; i < response.items.length; i++) {
                var newItem = $("<li>").addClass("media");
                var newDiv = $("<div>");
                //Hey, you know that API call to YouTube? It likes to send back channels and videos. We need to separate those out. 
                if (response.items[i].id.kind === "youtube#video") {
                    newItem.append(
                        //Give that response a Bootstrap card, cause I ain't gonna write CSS. 
                        newDiv.addClass("card cardStyle").append(
                            //Sets the card to actually link to the video, and open it in a new tab if you click on it.
                            $("<a>").attr("href", "https://www.youtube.com/watch?v=" + response.items[i].id.videoId).attr("target", "_blank").append(
                                //Hey, do we need art for these videos? Yeah, probably. Slap that thumbnail on there.
                                $("<img>").attr("src", response.items[i].snippet.thumbnails.high.url).addClass("card-img-top").attr("alt", response.items[i].snippet.title),
                                //More Bootstrap stuff for high-end fashion.
                                $("<div>").addClass("card-body").append(
                                    //Make that title POP. 
                                    $("<h5>").addClass("card-text").html(response.items[i].snippet.title)
                                )
                            )

                        ),

                    );
                }
                //Hey, did you give us back a YouTube channel on the response? Do the same as above, except with the knowledge you're a channel. 
                else if (response.items[i].id.kind === "youtube#channel") {
                    newItem.append(
                        newDiv.addClass("card cardStyle").append(
                            $("<a>").attr("href", "https://www.youtube.com/channel/" + response.items[i].id.channelId).attr("target", "_blank").append(
                                $("<img>").attr("src", response.items[i].snippet.thumbnails.high.url).addClass("card-img-top").attr("alt", response.items[i].snippet.title),
                                $("<div>").addClass("card-body").append(
                                    $("<h5>").addClass("card-text").html(response.items[i].snippet.title)
                                )
                            )

                        ),

                    );
                }
                //Stuff's on fire, yo. 
                else {
                    console.error("Hey something went wrong!");
                }
                //Add our new itmes onto our ytList div.
                $("#ytList").append(newItem);
                //Add a blank space between videos so they don't bleed together. 
                $("#ytList").append($("<div>").attr("style", "height: 10px;"));
            }

        });
    // end of callYouTube
    }
    //Wikipedia API. You know it, you love it. You've most certianly plagarized from it at some point in time. 
    function callWiki(name) {
        //Clear our list of previous Wikipedia articles from previous searches. 
        $("#WikiList").empty();
        //We take our search tearm from our wiki input form button.

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
            name +
            //How many results do we want back? Let's list it at 20 and call it a good enough.
            //More than 20 leads to articles that while informative would be too niche to be relevent.
            //*Glares at Electricity Sector in New Dehli from search for Electricity*.
            "&limit=20"
        //AJAX baby!
        $.ajax({
            //What is our URL? It's QueryURL. What's QueryURL. Everything in our previous thing above starting at line 144.
            url: QueryURL,
            //What is GET? Getting data from Wikipedia *finger guns*
            method: "GET"
            //What do we do after we send the request? This stuff down below.
        }).then(function (response) {
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
            for (var i = 0; i < response[1].length; i++) {
                $("#WikiList").append("<div class='card cardStyle'><div class='card-body'><a href=" + response[3][i] + " target='_blank'><h2 class='card-title'>" + response[1][i] + "</h2>" + "<p class='card-text'>" + response[2][i] + "</p></a></div></div>");
                $("#WikiList").append($("<div>").attr("style", "height: 10px;"));
            }
        });
    // end of callWiki
    }
})