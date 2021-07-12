const fs = require('fs');

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
            </head>
            <body>
                <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
                    <img src="../image/home_icon.png" width="40px" height="40px" alt="Home">
                </button>
                <h1> User </h1>

                <form method="POST" action="/user/new_user" align="center">
                    <br>ID
                    <input type="text" name="name">
                    <br>Car
                    <input type="text" name="car">
                    <br>Current Battery
                    <input type="number" name="battery">
                    <br>Goal Battery
                    <input type="number" name="battery">
                    <br><br><input type="submit" value="ADD">
                </form>

                <br><br>
                <hr color="#89b0ae" width="60%" size="4px" align="center">
                <h2>User Info</h2>
                ${user_list}
            </body>
        </html>
        `;
    },
    
    user_list:function(data){
        var list= '<table class="user-list" border="0" align="center">';
        list += '<th>Name</th>';
        list += '<th>Car</th>';
        list += '<th>Battery</th>';
        {
            console.log(data);
            var length = data.length;;
            for ( i = 0 ; i < length ; i++){
                list += `<tr>`;
                list += `<td>${data[i].name}</td>`;
                list += `<td>${data[i].car}</td>`;
                list += `<td>${data[i].battery}</td>`;
                list += `</tr>`;
            }
        }
        list += '</table><br><br>';
        return list;
    }
}