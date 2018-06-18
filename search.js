var title = $('h1'),
    result = '';

window.onload = function() {
    var url = decodeURIComponent(document.location.href);
        user = url.split('=')[1].split('&');
    
    result = user[0];
    result = result.replace('+', ' ');
    document.title = result;
    title.html("Search Results for " + '"' + result + '"');

    // var nodes = document.getElementById('cardcontainer').childNodes;
    // for (var i = 1; i < nodes.length; i++) {
    //     if (nodes[i].nodeName.toLowerCase() == "div") {
    //         console.log(nodes[i]);
    //     }
    // }
    var images = document.getElementsByTagName("a");
    console.log(images);
    testChangeImages(images);

    var tags = document.getElementsByTagName("span");
    console.log(tags);
}

function testChangeImages(tag) {
    console.log(tag[1]);
    tag[1].innerHTML=('<img src="' + 'https://pbs.twimg.com/profile_images/2319279206/35bwnea39ntayq08qjpb_400x400.png' + '">');
}