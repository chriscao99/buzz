var s = $('input'),
    f  = $('form'),
    a = $('.after'),
    m = $('h4'),
    p = $('p');
    chart = document.getElementById('container');
    img = document.getElementById('loading');

s.focus(function(){
  if( f.hasClass('open') ) return;
  f.addClass('in');
  setTimeout(function(){
    f.addClass('open');
    f.removeClass('in');
  }, 1300);
});

a.on('click', function(e){
  e.preventDefault();
  if( !f.hasClass('open') ) return;
   s.val('');
  f.addClass('close');
  f.removeClass('open');
  setTimeout(function(){
    f.removeClass('close');
  }, 1300);
});

var API = 'https://9cowd768ci.execute-api.us-east-1.amazonaws.com/prod/entries';
f.submit(function(e){
  p.html('');
  f.addClass('explode');

  setTimeout(function(){
    img.style.display = "block";
    
  }, 100);
  
  // img.src="progress.gif";
  

  
  
  $.ajax({
    type: 'POST',
    url: API,
    data: JSON.stringify({"user":s.val()}),
    contentType: "application/json",

    success: function(data){
      window.location.href = "user.html?user=" + s.val();
    }

  });

  e.preventDefault();

});
