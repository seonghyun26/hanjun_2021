module.exports = {
    HTML_weather:function(information_list){
        return `
        <!DOCTYPE html>
        <html lang="EN">
            <head>
                <title>Archive - weather</title>
                <meta charset="utf-8">
                <link type="text/css" rel="stylesheet" href="/css/main.css" />
                <link type="text/css" rel="stylesheet" href="/css/button.css" />
                <link type="text/css" rel="stylesheet" href="/css/table.css" />
                <link rel="shortcut icon" href="/image/archive-filled-box.png" type="image/x-icon">
                <link rel="icon" href="/image/archive-filled-box.png" type="image/x-icon">
            </head>
            <body>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
                    <img src="../image/home_icon.png" width="40px" height="40px" alt="Home">
                </button>

                <h2>Weather Archive</h2>
                <button disabled="disabled" class="button_selected" onClick="location.href='http://115.85.181.94:3000/archive/'">
                    Weather
                </button>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/smp'">
                    SMP
                </button>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/load'">
                    Load
                </button>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/price'">
                    Price
                </button>
                <hr color="#89b0ae" width="40%" size="4px" align="center">
                <br>
                ${information_list}
            </body>
        </html>
        `;   
    },

    HTML_smp:function(information_list){
        return `
        <!DOCTYPE html>
        <html lang="EN">
            <head>
                <title>Archive - smp</title>
                <meta charset="utf-8">
                <link type="text/css" rel="stylesheet" href="/css/main.css" />
                <link type="text/css" rel="stylesheet" href="/css/button.css" />
                <link type="text/css" rel="stylesheet" href="/css/table.css" />
                <link rel="shortcut icon" href="/image/archive-filled-box.png" type="image/x-icon">
                <link rel="icon" href="/image/archive-filled-box.png" type="image/x-icon">
            </head>
            <body>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
                    <img src="../image/home_icon.png" width="40px" height="40px" alt="Home">
                </button>

                <h2>SMP Archive</h2>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/'">
                    Weather
                </button>
                <button disabled class="button_selected" onClick="location.href='http://115.85.181.94:3000/archive/smp'">
                    SMP
                </button>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/load'">
                    Load
                </button>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/price'">
                    Price
                </button>
                <hr color="#89b0ae" width="40%" size="4px" align="center">
                <br>
                ${information_list}
            </body>
        </html>
        `;   
    },

    HTML_load:function(information_list){
        return `
        <!DOCTYPE html>
        <html lang="EN">
            <head>
                <title>Archive - load</title>
                <meta charset="utf-8">
                <link type="text/css" rel="stylesheet" href="/css/main.css" />
                <link type="text/css" rel="stylesheet" href="/css/button.css" />
                <link type="text/css" rel="stylesheet" href="/css/table.css" />
                <link rel="shortcut icon" href="/image/archive-filled-box.png" type="image/x-icon">
                <link rel="icon" href="/image/archive-filled-box.png" type="image/x-icon">
            </head>
            <body>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
                    <img src="../image/home_icon.png" width="40px" height="40px" alt="Home">
                </button>

                <h2>Load Archive</h2>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/'">
                    Weather
                </button>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/smp'">
                    SMP
                </button>
                <button disabled class="button_selected" onClick="location.href='http://115.85.181.94:3000/archive/load'">
                    Load
                </button>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/price'">
                    Price
                </button>
                <hr color="#89b0ae" width="40%" size="4px" align="center">
                <br>
                ${information_list}
            </body>
        </html>
        `;   
    },

    HTML_price:function(graph){
        return `
        <!DOCTYPE html>
        <html lang="EN">
            <head>
                <title>Archive - load</title>
                <meta charset="utf-8">
                <link type="text/css" rel="stylesheet" href="/css/main.css" />
                <link type="text/css" rel="stylesheet" href="/css/button.css" />
                <link type="text/css" rel="stylesheet" href="/css/table.css" />
                <link rel="shortcut icon" href="/image/archive-filled-box.png" type="image/x-icon">
                <link rel="icon" href="/image/archive-filled-box.png" type="image/x-icon">
            </head>
            <body>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
                    <img src="../image/home_icon.png" width="40px" height="40px" alt="Home">
                </button>

                <h2>Price Archive</h2>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/'">
                    Weather
                </button>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/smp'">
                    SMP
                </button>
                <button  class="button" onClick="location.href='http://115.85.181.94:3000/archive/load'">
                    Load
                </button>
                <button disabled class="button_selected" onClick="location.href='http://115.85.181.94:3000/archive/price'">
                    Price
                </button>
                <hr color="#89b0ae" width="40%" size="4px" align="center">
                <br>
                ${graph}
                <button class="button" onClick="location.href='http://115.85.181.94:3000/archive/price/data'">
                    More Data
                </button>
            </body>
        </html>
        `;
    },

    HTML_price_data:function(graph_data){
        return `
        <!DOCTYPE html>
        <html lang="EN">
            <head>
                <title>Archive - load</title>
                <meta charset="utf-8">
                <link type="text/css" rel="stylesheet" href="/css/main.css" />
                <link type="text/css" rel="stylesheet" href="/css/button.css" />
                <link type="text/css" rel="stylesheet" href="/css/table.css" />
                <link rel="shortcut icon" href="/image/archive-filled-box.png" type="image/x-icon">
                <link rel="icon" href="/image/archive-filled-box.png" type="image/x-icon">
            </head>
            <body>
                ${graph_data}
            </body>
        </html>
        `;
    },

    information_list:function(data){
        var list= '<table class="user-list" border="0" align="center">';
        list += '<th>Date</th>';

        for ( i = 0 ; i < 24 ; i++ ){
            list += `<th>h${i}</th>`;
        }
        
        const length = data.length;;
        for ( i = 0 ; i < length ; i++){
            var day = data[i];
            var hour_data = Object.values(day).slice(3);
            list += `<tr>`;
            list += `<td>${day.month}-${day.day}</td>`;
            for ( j = 0 ; j < 24 ; j++ ) {
                list += `<td>${hour_data[j]}</td>`;
            }
            list += `</tr>`;
        }

        list += '</table><br><br>';
        return list;
    },

    information_list_using_date:function(data) {
        var list= '<table class="user-list" border="0" align="center">';
        list += '<th>Date</th>';

        for ( i = 0 ; i < 24 ; i++ ){
            list += `<th>h${i}</th>`;
        }
        
        const length = data.length;;
        for ( i = 0 ; i < length ; i++){
            var day = data[i];
            var hour_data = Object.values(day).slice(1);
            list += `<tr>`;
            list += `<td>${parseInt((day.date%10000)/100)}-${day.date%100}</td>`;
            for ( j = 0 ; j < 24 ; j++ ) {
                list += `<td>${hour_data[j]}</td>`;
            }
            list += `</tr>`;
        }

        list += '</table><br><br>';
        return list;
    },

    graph:function(data) {
        return `
            <div>
                <canvas id="priceChart" responsive="true" style="position: relative; height:40vh; width:80vw"></canvas>
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
    },

    graph_price:function (data1, data2, data3 ) {
        return `
            <div>
                <canvas id="priceChart" responsive="true" style="position: relative; height:75vh; width:80vw"></canvas>
            </div>

            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <script>
            const labels = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
            ];
            
            const data = {
                labels: labels,
                datasets: [
                    {
                        label: '7월 9일',
                        backgroundColor: '#ff7f00',
                        borderColor: '#ff7f00',
                        data: [${data1}],
                        tension: 0.1
                    }, 
                    {
                        label: '7월 17일',
                        backgroundColor: '#000',
                        borderColor: '#000',
                        data: [${data2}],
                        tension: 0.1
                    }, 
                    {
                        label: '7월 20일',
                        backgroundColor: '#f04',
                        borderColor: '#f04',
                        data: [${data3}],
                        tension: 0.1
                    },
                    {
                        label: '현재 가격',
                        backgroundColor: '#00f',
                        borderColor: '#00f',
                        data: [
                            52.6, 52.6, 52.6, 52.6, 52.6, 52.6,
                            52.6, 52.6, 52.6, 140.3, 227.5, 227.5, 
                            140.3, 227.5, 227.5, 227.5, 227.5, 140.3,
                            140.3, 140.3, 140.3, 140.3, 140.3, 52.6
                        ],
                        tension: 0
                    }
                ]
            };
            
            const options = {
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparing Price',
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
                        title: {
                            display: true,
                            text: "원 / kWh",
                            font : {
                                weight: 'bold',
                                size: 16
                            }
                        },
                        min: 40,
                        max: 310,
                        ticks: {
                            minRotation: 90
                        }
                        
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