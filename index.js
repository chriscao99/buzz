var s = $('input'),
    f  = $('form'),
    a = $('.after'),
		m = $('h4');

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

  $.ajax({
    type: 'POST',
    url: API,
    data: JSON.stringify({"user":s.val()}),
    contentType: "application/json",

    success: function(data){
      m.append('<b> Positive: ' + data.pos + ', ');
      m.append('Negative: ' + data.neg + ', ');
      m.append('Neutral: ' + data.ntrl + '</b>');
      m.addClass('show');
      // m.html(data.pos).addClass('show');
    }

  });

  e.preventDefault();
  // m.html(s.val()).addClass('show');
  f.addClass('explode');

  setTimeout(function(){
    s.val('');
    f.removeClass('explode');
    m.html('&nbsp;').removeClass('show');
  }, 10000);
});