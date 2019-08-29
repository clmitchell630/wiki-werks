$(function () {



    $("#find-wiki").on("click", function (e) {
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


                newItem.append(
                    newDiv.addClass("card").attr("style", "background-color: #ffffff; width: 300px;").append(
                        $("<a>").attr("href", "https://www.youtube.com/watch?v=" + response.items[i].id.videoId).attr("target", "_blank").append(
                            $("<img>").attr("src", response.items[i].snippet.thumbnails.default.url).addClass("card-img-top").attr("alt", response.items[i].snippet.title),
                            $("<div>").addClass("card-body").append(
                            $("<h5>").addClass("card-text").html(response.items[i].snippet.title)
                            )
                        )
                    )
                );

                $("#ytList").append(newItem);
            }
        });
    });
})