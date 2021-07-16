module.exports = {
    HTML:function(weather_list){
        return `
        <!DOCTYPE html>
        <html lang="EN">
            <head>
                <title>Archive - weather</title>
                <meta charset="utf-8">
                <link type="text/css" rel="stylesheet" href="/css/main.css" />
                <link type="text/css" rel="stylesheet" href="/css/button.css" />
                <link type="text/css" rel="stylesheet" href="/css/table.css" />
            </head>
            <body>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
                    <img src="../image/home_icon.png" width="40px" height="40px" alt="Home">
                </button>

                <h2>Weather Archive</h2>
                <hr color="#89b0ae" width="40%" size="4px" align="center">
                <br>
                ${weather_list}
            </body>
        </html>
        `;   
    },

    weather_list:function(data){
        var list= '<table class="user-list" border="0" align="center">';
        list += '<th>Date</th>';

        for ( i = 0 ; i < 24 ; i++ ){
            list += `<th>h${i}</th>`;
        }
        
        var length = data.length;;
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
    }
}