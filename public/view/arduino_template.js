module.exports = {
  HTML:function(status, a, b, c){
    return `
    <!DOCTYPE html>
    <html lang="EN">
      <head>
        <title>Arduino</title>
        <meta charset="utf-8">
        <link type="text/css" rel="stylesheet" href="/css/main.css" />
        <link type="text/css" rel="stylesheet" href="/css/button.css" />
        <link type="text/css" rel="stylesheet" href="/css/input.css" />
        <link type="text/css" rel="stylesheet" href="/css/toggle.css" />
      </head>

      <body>
        <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
          <img src="http://115.85.181.94:3000/image/home_icon.png" width="40px" height="40px" alt="Home">
        </button>
    
        <h2> Arudino Control Page </h2>

        ${status}
        ${a}
        ${b}
        ${c}

        
        <br>
        <button class="button_small" onClick="location.href='/arduino/A/1'">ON</button>
        <button class="button_small" onClick="location.href='/arduino/A/0'">OFF</button>
        <br>
        <button class="button_small" onClick="location.href='/arduino/B/1'">ON</button>
        <button class="button_small" onClick="location.href='/arduino/B/0'">OFF</button>
        <br>
        <button class="button_small" onClick="location.href='/arduino/C/1'">ON</button>
        <button class="button_small" onClick="location.href='/arduino/C/0'">OFF</button>

        <script type="text/javascript" src="/view/arduino_script.js"></script>

      </body>
    </html>
    `
  },
  
  button_format: function(name, status) {
    return `
      <b class="title">${name}</b>&nbsp&nbsp
      <b class="title" id="${name}">${status}</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
      <label class="switch">
        <input type="checkbox" id="Btn${name}">
        <span class="slider round"></span>
      </label>
      <br><br>
    `
  }
}