var title = $('h1'),
    result = '';

window.onload = function() {
    var url = decodeURIComponent(document.location.href);
        user = url.split('=')[1].split('&');
    
    result = user[0];
    result = result.replace('+', ' ');
    document.title = result;
    title.html("Search Results for " + '"' + result + '"');

    var nodes = document.getElementById('cardcontainer').childNodes;
    for (var i = 1; i < nodes.length; i++) {
        if (nodes[i].nodeName.toLowerCase() == "div") {
            console.log(nodes[i]);
        }
    }

}

function populateCards(user) {
    var images = document.getElementById("card").getElementsByTagName();
}