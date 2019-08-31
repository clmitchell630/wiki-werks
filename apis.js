$(function () {
    // topic save array
    var topics = [];
     

    $("#find-wiki").on("click", function (e) {

        var queryTopic = $("#wiki-input").val().trim();

        e.preventDefault();

        callYouTube(queryTopic);
        callWiki(queryTopic);

        if (queryTopic === "") {

            //modal goes here
            alert("modal will go here, but for now, PLEASE ENTER A TOPIC!");
            
        }
        else {
            growTopics(e);
        }

    });

    //------functions------
    function addButton(name) {

        var newBtn = $("<button>");
        newBtn.attr("type", "button");
        newBtn.addClass("btn btn-danger btn-block");
        newBtn.text(name);
        $("#wiki-view").append(newBtn);
        $(newBtn).on("click", function () {
            callYouTube(name);
            callWiki(name);
        });

    }

    function growTopics(e) {

        e.preventDefault();

        var newTopic = $("#wiki-input").val().trim();
        topics.push(newTopic);

        addButton(newTopic);

        $("#wiki-input").val("");

    }

    function callYouTube(name) {

        $("#ytList").empty();

        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + name + "&maxResults=20&key=AIzaSyAPSES2I3JvLza-Ox2Rzta8_jnEJvgBj7U"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);


            for (var i = 0; i < response.items.length; i++) {
                var newItem = $("<li>").addClass("media");
                var newDiv = $("<div>");

                if (response.items[i].id.kind === "youtube#video") {
                    newItem.append(
                        newDiv.addClass("card cardStyle").append(
                            $("<a>").attr("href", "https://www.youtube.com/watch?v=" + response.items[i].id.videoId).attr("target", "_blank").append(
                                $("<img>").attr("src", response.items[i].snippet.thumbnails.high.url).addClass("card-img-top").attr("alt", response.items[i].snippet.title),
                                $("<div>").addClass("card-body").append(
                                    $("<h5>").addClass("card-text").html(response.items[i].snippet.title)
                                )
                            )

                        ),

                    );
                }
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
                else {
                    console.error("Hey something went wrong!");
                }

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