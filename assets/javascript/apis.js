$(function () {

    // topic save array
    var topics = [];

    if (localStorage.getItem("Topics") != null) {
        topics = JSON.parse(localStorage.getItem("Topics"));
        console.log(topics);
        for (var k = 0; k < topics.length; k++) {
            addButton(topics[k]);
        }
    }


    $("#find-wiki").on("click", function (e) {

        var queryTopic = $("#wiki-input").val().trim();

        e.preventDefault();

        callYouTube(queryTopic);
        callWiki(queryTopic);

        if (queryTopic === "") {

            //modal goes here
            console.log("modal will go here, but for now, PLEASE ENTER A TOPIC!");

        }
        else {
            addTopic(e);
        }

    });

    //------functions------
    function addButton(name) {

        var newBtn = $("<button>");
        var rmBtn = $("<button>");

        newBtn.attr("type", "button");
        newBtn.addClass("btn btn-danger primeBtn");
        newBtn.text(name);

        rmBtn.attr("type", "button");
        rmBtn.addClass("btn btn-dark secBtn");
        rmBtn.text("X");

        $("#wiki-view").append($("<div>").addClass("btnWrapper").append(newBtn, rmBtn));
        $(newBtn).on("click", function () {
            callYouTube(name);
            callWiki(name);
        });

        $(rmBtn).on("click", removeTopic);
    }

    function addTopic(e) {

        e.preventDefault();

        var newTopic = $("#wiki-input").val().trim();
        topics.push(newTopic);

        pushLocalStorage();

        addButton(newTopic);

        $("#wiki-input").val("");

    }
    
    function removeTopic() {

        // console.log($(this).parent().children(".primeBtn").text());
        var btnName = $(this).parent().children(".primeBtn").text();
        var topicIndex = topics.indexOf(btnName);

        if (topicIndex > -1) {

            topics.splice(topicIndex, 1);
            $(this).parent().empty();
            pushLocalStorage();
        }
        else {
            console.error("This is not the button name you're looking for!");
        }

    }

    function pushLocalStorage() {

        localStorage.setItem("Topics", JSON.stringify(topics));

    }

    function callYouTube(name) {

        $("#ytList").empty();

        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + name + "+educational&maxResults=20&key=AIzaSyAPSES2I3JvLza-Ox2Rzta8_jnEJvgBj7U"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);


            for (var j = 0; j < response.items.length; j++) {
                var newItem = $("<li>").addClass("media");
                var newDiv = $("<div>");
                var link;
                if (response.items[j].id.kind === "youtube#video") {
                    link = "https://www.youtube.com/watch?v=" + response.items[j].id.videoId;
                }
                else if (response.items[j].id.kind === "youtube#channel") {
                    link = "https://www.youtube.com/channel/" + response.items[j].id.channelId;
                }
                else if (response.items[j].id.kind === "youtube#playlist") {
                    link = "https://www.youtube.com/playlist?list=" + response.items[j].id.playlistId;
                    console.log("There's a playlist!");
                }
                else {
                    console.error("Hey something went wrong! " + "index " + j + " " + response.items[j].id.kind);
                }
                newItem.append(
                    newDiv.addClass("card cardStyle").append(
                        $("<a>").attr("href", link).attr("target", "_blank").append(
                            $("<img>").attr("src", response.items[j].snippet.thumbnails.high.url).addClass("card-img-top").attr("alt", response.items[j].snippet.title),
                            $("<div>").addClass("card-body").append(
                                $("<h5>").addClass("card-text").html(response.items[j].snippet.title)
                            )
                        )

                    ),

                );

                $("#ytList").append(newItem);
                $("#ytList").append($("<div>").attr("style", "height: 10px;"));
            }

        });
        // end of callYouTube
    }

    function callWiki(name) {
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
            //You need this part here, or else you get a CORS request, and that's a whole other rabbit hole. The double edged sword of no API key required.
            "&origin=*" +
            //Yo, what you looking you to search?
            "&search=" +
            //This, you're looking to search this. This is what was typed in to the request earlier. 
            name +
            //How many results do we want back? Let's list it at 15 and call it a day.
            "&limit=20"
        //AJAX baby!
        $.ajax({
            //What is our URL? It's QueryURL. What's QueryURL. Everything in our previous thing above starting at line 11.
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
                $("#WikiList").append("<div class='card cardStyle'><div class='card-body'><a href=" + response[3][i] + "><h2 class='card-title'>" + response[1][i] + "</h2>" + "<p class='card-text'>" + response[2][i] + "</p></a></div></div>");
                $("#WikiList").append($("<div>").attr("style", "height: 10px;"));
            }
        });
        // end of callWiki
    }
})