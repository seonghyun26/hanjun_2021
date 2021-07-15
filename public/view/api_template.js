module.exports = {
  HTML:function(label, data, date){
    return `
    <!DOCTYPE HTML>
      <html lang="EN">
        <head>
          <meta charset="utf-8">
          <link type="text/css" rel="stylesheet" href="/css/main.css" />
          <link type="text/css" rel="stylesheet" href="/css/button.css" />
          <title>API Chart</title>
        </head>
        <body align="center">
          <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
            Home
          </button>

          <h1>API Chart</h1>

          <div>
            <canvas id="smpChart" responsive="true" style="position: relative; height:40vh; width:80vw"></canvas>
          </div>

          <button class="button" onClick="location.href='http://115.85.181.94:3000/apiInfo'">
            Weather
          </button>

          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <script>
          const labels = [
            ${label}
          ];
        
          const data = {
              labels: labels,
              datasets: [{
                label: '원(\₩)',
                backgroundColor: '#555b6e',
                borderColor: '#89b0ae',
                data: [${data}],
                tension: 0.1
              }]
          };
          
          const options = {
            plugins: {
              title: {
                display: true,
                text: '${date[0]}${date[1]}${date[2]}${date[3]}년 ${date[4]}${date[5]}월 ${date[6]}${date[7]}일 SMP',
                font : {
                  wight: 'bold',
                  size: 20
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "HOUR",
                  font : {
                    weight: 'bold',
                    size: 16
                  }
                }
              }
            }
          }

          const config = {
              type: 'line',
              data,
              options
          };
          
          var smpChart = new Chart(
              document.getElementById('smpChart'),
              config
          );


          </script>
        </body>
      </html>
    `;
  },

  HTML_weather:function(label, data, date, max, min, diff){
    return `
    <!DOCTYPE HTML>
      <html lang="EN">
        <head>
          <meta charset="utf-8">
          <link type="text/css" rel="stylesheet" href="/css/main.css" />
          <link type="text/css" rel="stylesheet" href="/css/button.css" />
          <title>API Chart</title>
        </head>
        <body align="center">
          <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
            Home
          </button>

          <h1>API Chart</h1>

          <div>
            <canvas id="smpChart" responsive="true" style="position: relative; height:40vh; width:80vw"></canvas>
          </div>

          <button class="button" onClick="location.href='http://115.85.181.94:3000/apiInfo/smp'">
            SMP Chart
          </button>

          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <script>
          const labels = [
            ${label}
          ];
        
          const data = {
              labels: labels,
              datasets: [{
                label: '도(\℃)',
                backgroundColor: '#555b6e',
                borderColor: '#89b0ae',
                data: [${data}],
                tension: 0.1
              }]
          };
          
          const options = {
            plugins: {
              title: {
                display: true,
                text: '${date[4]}${date[5]}월 ${date[6]}${date[7]}일 ${date[8]}${date[9]}시 기준 예상 체감 온도',
                font : {
                  wight: 'bold',
                  size: 20
                }
              }
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Hours Later",
                  font : {
                    weight: 'bold',
                    size: 16
                  }
                }
              },
              y: {
                min: ${min - diff*2/5},
                max: ${max + diff*2/5},
                ticks: {
                  stepSize: 1
                }
              }
            }
          }
          const config = {
              type: 'line',
              data,
              options
          };
          
          var smpChart = new Chart(
              document.getElementById('smpChart'),
              config
          );
          </script>
        </body>
      </html>
    `;
  },

  API_error:function(){
    
  }
}