module.exports = {
  HTML:function(label, data, date){
    return `
    <!DOCTYPE HTML>
      <html lang="EN">
        <head>
          <meta charset="utf-8">
          <title>Daily SMp</title>
        </head>
        <body>
            <h1>Daily SMP Chart</h1>
            <button  onClick="location.href='./'">
              Home
            </button>
            <br><br>
            
            <div>
              <canvas id="myChart" responsive="true" style="position: relative; height:40vh; width:80vw"></canvas>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script>
            const labels = [
              ${label}
            ];
          
            const data = {
                labels: labels,
                datasets: [{
                    label: '${date}',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [${data}],
                }]
            };
            
            const config = {
                type: 'line',
                data,
                options: {}
            };
            
            var myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
            </script>
        </body>
      </html>
    `;
  }
}