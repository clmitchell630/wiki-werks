// $(function () {
     $("form").on("submit", function (e) {
       e.preventDefault();
function searchByKeyword() {
        var results = YouTube.Search.list('id,snippet', {q: 'dogs', maxResults: 25});

    for(var i in results.items) {
              var item = results.items[i];
     Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);   }
    }
//         var request = gapi.client.youtube.search.list({
//             part: "snippet",
//             type: "video",
//             q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
//             maxResults: 10,
//             orderd: "viewCount",
//             publishedAfter: "2014-01-01T00:00:00Z"
//         });

         request.execute(function (response) {             var results = response.result;
           $.each(results, function (index, item) {                 console.log(item)
          });
       });
   });
 });

function init() {
    gapi.client.setApiKey("AIzaSyAeOh-8ropCxba54NvDcjmfIpOd_0vQ1kk");
    gapi.client.load("youtube", "v3", function () {

    })
}
