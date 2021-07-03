const fs = require('fs');

module.exports = {
    HTML:function(user_list){
        // fs.readFile(__dirname + '/user.html', 'utf8', (err, data) => {
        //     if (err) throw err;
        //     console.log("makr2");
        //     console.log(data);
        //     // return data;
        //   });
        return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>Users</title>
            </head>
            <body>
                <button  onClick="location.href='./'">
                Home
                </button>
                <h1> User </h1>
                <form method="POST" action="/new_user">
                Name : <input type="text" name="name">
                <br>Car : <input type="text" name="car">
                <br>Battery : <input type="number" name="battery">
                <br><input type="submit" value="add">
                </form>
                <br>
                <h3>User Info</h3>
                ${user_list}
            </body>
        </html>
        `;
    },
    
    user_list:function(data){
        var list= '<table class="user-list" border="0">';
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
        list += '</table>';
        return list;
    }
}