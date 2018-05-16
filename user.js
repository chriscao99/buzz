var m = $('h1'),
    chart = document.getElementById('container'),
    API = 'https://9cowd768ci.execute-api.us-east-1.amazonaws.com/prod/entries';

window.onload = function() {
    var url = document.location.href,
    user = url.split('=')[1].split('&');
    document.title = user;
    display(user[0]);
}

function display(user) {

 $.ajax({
    type: 'POST',
    url: API,
    data: JSON.stringify({"user":user}),
    contentType: "application/json",

    success: function(data){
        console.log('success');
      // globalvar.user = s.val();
        displayGraph(data.pos, data.neg, data.ntrl);
      //displayGraph(data.pos, data.neg, data.ntrl);
      // m.addClass('show');
      // 
      // m.append('Negative: ' + data.neg + '%, ');
      // m.append('Neutral: ' + data.ntrl + '%</b>');
    }

  });

  //e.preventDefault();

  setTimeout(function(){
    hideGraph();
  }, 20000);
};

function displayGraph(pos, neg, ntrl) {
    showGraph();
    Highcharts.chart('container', {
      chart: {
          type: 'pie',
          options3d: {
              enabled: true,
              alpha: 45
          }
      },
      title: {
          text: 'Sentiment of user\'s tweets'
      },
      // subtitle: {
      //     text: '3D donut in Highcharts'
      // },
      plotOptions: {
          pie: {
              innerSize: 100,
              depth: 45,
              colors: ['#30FA5E', '#F42C2C', '#959393']
          }
      },
      series: [{
          name: 'Percentage of Tweets',
          data: [
              ['Positive', pos],
              ['Negative', neg],
              ['Neutral', ntrl]
          ]
      }]
    });
  }

  function hideGraph() {
    chart.style.display = "none";
  }
  
  function showGraph() {
    chart.style.display = "block";
  }
