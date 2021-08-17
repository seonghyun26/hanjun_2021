module.exports = {
    HTML:function(user_list, graph){
        return `
        <!DOCTYPE html>
        <html lang="EN">
            <head>
                <title>Users</title>
                <meta charset="utf-8">
                <link type="text/css" rel="stylesheet" href="/css/main.css" />
                <link type="text/css" rel="stylesheet" href="/css/button.css" />
                <link type="text/css" rel="stylesheet" href="/css/table.css" />
                <link rel="shortcut icon" href="/image/user-list.png" type="image/x-icon">
                <link rel="icon" href="/image/user-list.png" type="image/x-icon">
            </head>
            <body>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
                    <img src="../image/home_icon.png" width="40px" height="40px" alt="Home">
                </button>

                <h2>User Status</h2>
                <hr color="#89b0ae" width="40%" size="4px" align="center">
                <br>
                ${user_list}
                ${graph}
            </body>
        </html>
        `;
    },
    
    user_list:function(data){
        var list= '<table class="user-list" border="0" align="center">';
        list += '<th>Name</th>';
        list += '<th>Charge Type</th>';
        list += '<th>Charger</th>';
        list += '<th>Start Battery</th>';
        list += '<th>Current Battery</th>';
        list += '<th>Goal Battery/price</th>';
        list += '<th>Exit Time</th>';
        {
            // console.log(data);
            var length = data.length;
            for ( i = 0 ; i < length ; i++){
                list += `<tr>`;
                list += `<td>${data[i].name}</td>`;
                list += `<td>${data[i].charge_type}</td>`;
                list += `<td>${data[i].charger}</td>`;
                list += `<td>${data[i].start_battery}</td>`;
                list += `<td>${data[i].current_battery}</td>`;
                list += `<td>${data[i].goal_battery_or_price}</td>`;
                list += `<td>${data[i].exit_time}</td>`;
                list += `</tr>`;
            }
        }
        list += '</table><br><br>';
        return list;
    },

    price_graph:function(data) {
        return `
        <div>
            <canvas id="priceChart" responsive="true" style="position: relative; height:30vh; width:80vw"></canvas>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
        const labels = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
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
                    text: 'Today Price',
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
                },
                y: {
                    min: 30,
                    max: 320,
                }
            }
        }

        const config = {
            type: 'line',
            data,
            options
        };
        
        const smpChart = new Chart(
            document.getElementById('priceChart'),
            config
        );

        </script>
        `
    }
}