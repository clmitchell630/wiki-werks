$(function () {

    $("#find-wiki").on("click", function (e) {
        
        $("#ytList").empty();

        e.preventDefault();

        var queryTopic = $("#wiki-input").val().trim();
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + queryTopic + "&maxResults=20&key=AIzaSyAPSES2I3JvLza-Ox2Rzta8_jnEJvgBj7U"

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
                else{
                    console.error("Hey something went wrong!");
                }

                $("#ytList").append(newItem);
                $("#ytList").append($("<div>").attr("style", "height: 10px;"));
            }
        });

    });
})