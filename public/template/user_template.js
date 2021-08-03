module.exports = {
    HTML:function(user_list){
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
            </body>
        </html>
        `;
    },
    
    user_list:function(data){
        var list= '<table class="user-list" border="0" align="center">';
        list += '<th>Name</th>';
        list += '<th>Charger</th>';
        list += '<th>Charge Type</th>';
        list += '<th>Current Battery</th>';
        list += '<th>Goal Battery/price</th>';
        {
            // console.log(data);
            var length = data.length;
            for ( i = 0 ; i < length ; i++){
                list += `<tr>`;
                list += `<td>${data[i].name}</td>`;
                list += `<td>${data[i].charger}</td>`;
                list += `<td>${data[i].charge_type}</td>`;
                list += `<td>${data[i].current_battery}</td>`;
                list += `<td>${data[i].goal_battery_or_price}</td>`;
                list += `</tr>`;
            }
        }
        list += '</table><br><br>';
        return list;
    }
}