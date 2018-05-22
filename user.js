var user_chart = document.getElementById('user_container'),
    ext_chart = document.getElementById('ext_container'),
    user_box = document.getElementById('banner'),
    avi = document.getElementById('avi'),
    nameField = $('h1'),
    handleField = $('h2'),
    API = 'https://9cowd768ci.execute-api.us-east-1.amazonaws.com/prod/entries';
    handle = ''

window.onload = function() {
    var url = decodeURIComponent(document.location.href);
        user = url.split('=')[1].split('&');
    handle = user[0];
    document.title = handle;
    display(handle);
}

function display(user) {
 $.ajax({
    type: 'POST',
    url: API,
    data: JSON.stringify({"user":user}),
    contentType: "application/json",

    success: function(data){
        user_box.src= data.banner;
        
        avi.src=data.avi;
        avi.style.display="block";
        displayUserGraph(data.user_pos, data.user_neg, data.user_ntrl);
        if (data.valid == 1) {
            displayExtGraph(data.ext_pos, data.ext_neg, data.ext_ntrl);
        }
        nameField.html(data.name)
        handleField.html(data.handle)
    }

  });
};

function displayUserGraph(pos, neg, ntrl) {
    showUserGraph();
    Highcharts.chart('user_container', {
      chart: {
          type: 'pie',
          options3d: {
              enabled: true,
              alpha: 45
          }
      },
      title: {
          text: 'Sentiment of ' + handle + '\'s tweets'
      },
      credits: {
          enabled: false
      },
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
  function displayExtGraph(pos, neg, ntrl) {
    showExtGraph();
    Highcharts.chart('ext_container', {
      chart: {
          type: 'pie',
          options3d: {
              enabled: true,
              alpha: 45
          }
      },
      title: {
          text: 'Sentiment of tweets about ' + handle
      },
      credits: {
          enabled: false
      },
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
  function hideUserGraph() {
    user_chart.style.display = "none";
    
  }
  
  function showUserGraph() {
    user_chart.style.display = "block";
  }

  function hideExtGraph() {
    ext_chart.style.display = "none";
  }
  function showExtGraph() {
    ext_chart.style.display = "block";
  }