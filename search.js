var title = $('h1'),
    result = '';

window.onload = function() {
    var url = decodeURIComponent(document.location.href);
        user = url.split('=')[1].split('&');
    
    result = user[0];
    result = result.replace('+', ' ');
    document.title = result;
    title.html("Search Results for " + result);
}