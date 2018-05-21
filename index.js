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
  f.addClass('explode');
  p.html('');
  // img.src="progress.gif";
  
  img.style.display = "block";
  
  
  $.ajax({
    type: 'POST',
    url: API,
    data: JSON.stringify({"user":s.val()}),
    contentType: "application/json",

    success: function(data){
      // globalvar.user = s.val();
      window.location.href = "user.html?user=" + s.val();
      //displayGraph(data.pos, data.neg, data.ntrl);
      // m.addClass('show');
      // m.append('<b> Positive: ' + data.pos + '%, ');
      // m.append('Negative: ' + data.neg + '%, ');
      // m.append('Neutral: ' + data.ntrl + '%</b>');
    }

  });

  e.preventDefault();
  

  // setTimeout(function(){
  //   hideGraph();
  //   s.val('');
  //   f.removeClass('explode');
  //   m.html('&nbsp;').removeClass('show');
  //   p.html('Click to enter a Twitter handle, Enter to submit');
  // }, 20000);
});

// function displayGraph(pos, neg, ntrl) {
//   showGraph();
//   Highcharts.chart('container', {
//     chart: {
//         type: 'pie',
//         options3d: {
//             enabled: true,
//             alpha: 45
//         }
//     },
//     title: {
//         text: 'Sentiment of user\'s tweets'
//     },
//     // subtitle: {
//     //     text: '3D donut in Highcharts'
//     // },
//     plotOptions: {
//         pie: {
//             innerSize: 100,
//             depth: 45,
//             colors: ['#30FA5E', '#F42C2C', '#959393']
//         }
//     },
//     series: [{
//         name: 'Percentage of Tweets',
//         data: [
//             ['Positive', pos],
//             ['Negative', neg],
//             ['Neutral', ntrl]
//         ]
//     }]
//   });
// }

// function hideGraph() {
//   chart.style.display = "none";
// }

// function showGraph() {
//   chart.style.display = "block";
// }