function loadData() {

    /*
    The $ that shows up in variable names, like $body for example, is just a character like any other. In this case, it refers to the fact that the variable referenced by $body is a jQuery collection, not a DOM node.
    */

    var WikiBox = $('#wiki-view');


    // clear out old data before new request
    WikiBox.text("");


    var WikiSearch = $('#wiki-input').val().trim();
 

    // load wikipedia data
    var WikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + WikiSearch + "&format-json&callback=wikiCallback";
    $.ajax({
        url: WikiURL,
        dataType: "jsonp",

        success: function(response){
            var ArticleList = response[1];

            for (var i=0; i < ArticleList.length; i++) {
                ArticleString = ArticleList[i];
                var URL = "https://en.wikipedia.org/wiki/" + ArticleString;
                $wikiElem.append("<li><a href='" + URL + "'>" + ArticleString + "</a></li>")
            };
        }
    })

    return false;
};

$('#form-container').submit(loadData);
