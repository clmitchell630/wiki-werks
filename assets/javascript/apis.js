//Initializing function.
$(function () {
    // array that holds the topics the user has input
    var topics = [];
    // array of suggested topics for our user to search
    var sampleTopics = ["Cancer", "Electricity", "Human Memory", "Planets", "Robots", "Human Evolution", "Conservation", "Newtons Laws", "Gravity", "Binomial Nomenclature"];

    // generate buttons from items saved in local storage
    if (localStorage.getItem("Topics") != null) {

        //sets topics variable to the locally stored array that has been parsed out
        topics = JSON.parse(localStorage.getItem("Topics"));
        // console.log(topics);
        // loop that makes buttons and the reason we have an if statement that contains it.
            // if nothing is in local storage we will have a variable of topics that has nothing stored in it, AKA null.
            // if topics is null, the for loop cannot run because topics with a value of null doesn't have a length.
            // finally, if this breaks, the error will prevent any of the other code from working.
        for (var k = 0; k < topics.length; k++) {
            // add buttons for all of the topics stored in local storage
            addButton(topics[k]);
        }
    }

    // this click function referes to the search button
    $("#find-wiki").on("click", function (e) {

        // saving the user's input value in a variable
        var queryTopic = $("#wiki-input").val().trim();

        // the search button is a submit button, stopping it from being weird
        e.preventDefault();
        
        // validates search for empty, the placeholder text changes, if not it will run the call functions
        if (queryTopic === "") {

            $("#wiki-input").attr("placeholder", "You didn't type anything? Try again!");

            // console.log("PLEASE ENTER A TOPIC!");

        }
        //Entered something in to actually search? Great, we'll make it run this lovingly crafted function for you.
        else {

            // stores a random topic from the suggested topics in our sampleTopics array
            var placeHolderTopic = sampleTopics[Math.floor(Math.random() * sampleTopics.length)]
            // resets placeholder text back to default
            $("#wiki-input").attr("placeholder", placeHolderTopic);
            // calling the two functions below for the user's current input
            callYouTube(queryTopic);
            callWiki(queryTopic);
            // making a topic button for user's current input
            addTopic();

        }

    });

    //=================functions=================\\


    // takes the user's input and stores it into the topics variable for use elseware
    function addTopic() {

        // captures user's input
        var newTopic = $("#wiki-input").val().trim();

        // pushes user's input into the topics variable array
        topics.push(newTopic);

        // calls function to save on local storage
        pushLocalStorage();

        // calls function to add button with user's input
        addButton(newTopic);

        // resets user input field to blank
        $("#wiki-input").val("");

    }

    // removes topic from local storage
    function removeTopic() {

        // this stores the name of the button within a variable. Check below.
        // console.log($(this).parent().children(".primeBtn").text());
        // $(this) is the remove button
        // .parent() is the remove button's 'parent', the div element
        // .children() is all the children in the div element (both the topic button and the remove button)
        // ".primeBtn" is the selector that targets the topic button only
        // .text() looks at the text within the topic button
        var btnName = $(this).parent().children(".primeBtn").text();
        // this looks in the topics array and looks for the index of the stored name and saves it in a variable
        var topicIndex = topics.indexOf(btnName);

        // this if statement prevents weird things from happening if there are no items in the array and .indexOf returns null (-1)
        if (topicIndex > -1) {

            // this deletes the topic name from the array by targeting it's index and removing it
            topics.splice(topicIndex, 1);

            // removes the div element that contains the topic button and the remove button
            // $(this) is the remove button
            // .parent() is the remove button's 'parent', the div element
            // .empty() is the method that removes all child elements from the DOM but leaves behind the 'parent' div unfortunately
            $(this).parent().empty();

            // re-saves the topics array in the local storage
            pushLocalStorage();
        }
        // if it doesn't work, it's broken, this should help troubleshoot
        else {
            console.error("This is not the button name you're looking for!");
        }

    }

    // button adding function - will add a button that will store a searched topic and recall it when clicked. also makes a button to remove your search topic.
    // 'name' is a variable that is passed through this function. It is HUGELY important for two reasons
    // one: this is how we are able to add the topic to the button as text
    // two: this is our method for searching the APIs
    function addButton(name) {

        // topic button
        var newBtn = $("<button>");
        // remove button
        var rmBtn = $("<button>");

        // topic button - adding style and text
        newBtn.attr("type", "button");
        newBtn.addClass("btn btn-danger primeBtn");
        newBtn.text(name);

        // remove button - adding style and X
        rmBtn.attr("type", "button");
        rmBtn.addClass("btn btn-dark secBtn");
        rmBtn.text("X");

        // storing the buttons inside a parent div so that it displays correcty on the DOM
        $("#wiki-view").append($("<div>").addClass("btnWrapper").append(newBtn, rmBtn));

        // storing an on click function on the topic button to call the youtube and wiki functions
        $(newBtn).on("click", function () {
            callYouTube(name);
            callWiki(name);
        });

        // storing an on click function on the remove button to call the remove function to remove the topic from the DOM and also from local storage
        $(rmBtn).on("click", removeTopic);
    }

    // this function takes the topics array and saves it on the user's computer in local storage
    function pushLocalStorage() {

        // this puts the array in the local storage by giving it a key of Topics and a value of the whole topics array as an array.
        // if we do not use JSON.stringify here, it will be a whole string "red,green,blue" instead of an array ["red","green","blue"]
        // we parse this later to create our buttons using the information we saved in local storage
        localStorage.setItem("Topics", JSON.stringify(topics));

    }

    // calls the youtube api and pulls information from it
    // as you can see, 'name' is passed through this function. 'name' is incredibly important here as we use this variable to hold our query method
    function callYouTube(name) {

        // clears the video side of the page so that it doesn't append indefinately
        $("#ytList").empty();

        // the url we use to search youtube api using the name variable as the query method parameter
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + name + "+educational&maxResults=20&key=AIzaSyBQvvezTUhUfbNgZl4Xj5wJ7w1AImdnPKw";

        // ajax method that gets information from the youtube api
        $.ajax({
            url: queryURL,
            method: "GET"
        //What now? Is this the end? Do I just take in data and send it off?
        //No, you have a .then protocol aftewards to run a function. Take what they send back and do stuff to it.
        //Oh, thank God. I didn't know what to do with myself afterwards. 
        }).then(function (response) {
            //Log the response. 
            console.log(response);

            // the api returns a response within an array, this loop will look at each item in the array and build a card for it and put it on the DOM
            for (var j = 0; j < response.items.length; j++) {

                // creates a list item with styling to make it look good
                var newItem = $("<li>").addClass("media");
                // creates a div
                var newDiv = $("<div>");
                // declaring the variable for use in the conditionals
                var link;
                // youtube has three separate ways to get to the link. video, channel, and playlist.
                // these conditionals look at what kind of item the we have and returns a built url that is saved in the link variable
                if (response.items[j].id.kind === "youtube#video") {
                    link = "https://www.youtube.com/watch?v=" + response.items[j].id.videoId;
                }
                else if (response.items[j].id.kind === "youtube#channel") {
                    link = "https://www.youtube.com/channel/" + response.items[j].id.channelId;
                }
                else if (response.items[j].id.kind === "youtube#playlist") {
                    link = "https://www.youtube.com/playlist?list=" + response.items[j].id.playlistId;
                    // console.log("There's a playlist!");
                }
                // just in case something breaks or there is a fourth type of link
                else {
                    console.error("Hey something went wrong! " + "index " + j + " " + response.items[j].id.kind);
                }

                // packages up the youtube link inside of a card.
                // we build it as if we were building an html page, but with jquery
                // puts everything into a <li> tag
                newItem.append(
                    // puts everything into a <div> tag and is a child to the <li> tag
                    newDiv.addClass("card cardStyle").append(
                        // makes the whole thing a link and is a child to the <div> tag
                        $("<a>").attr("href", link).attr("target", "_blank").append(
                            // <a> tag has two children, the <img> tag and the <div> tag
                            // <img> holds the youtube api responses thumbnail and styles it to fit the card. adds alt text
                            $("<img>").attr("src", response.items[j].snippet.thumbnails.high.url).addClass("card-img-top").attr("alt", response.items[j].snippet.title),
                            // <div> holds a child <h5> tag which is the youtube api responses title
                            $("<div>").addClass("card-body").append(
                                $("<h5>").addClass("card-text").html(response.items[j].snippet.title)
                            )
                        )

                    ),

                );
                
                // attaches the <li> to the html written <ul> parent tag that has overflow styling and holds the entire youtube portion of the app
                $("#ytList").append(newItem);
                // adds a spacer to make it look nice. 
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
});
