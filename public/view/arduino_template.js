module.exports = {
  HTML:function(){
    return `
    <!DOCTYPE html>
    <html lang="EN">
      <head>
        <title>Test</title>
        <meta charset="utf-8">
        <link type="text/css" rel="stylesheet" href="/css/main.css" />
        <link type="text/css" rel="stylesheet" href="/css/button.css" />
        <link type="text/css" rel="stylesheet" href="/css/input.css" />
      </head>
      <body>
        <button class="button" onClick="location.href='http://115.85.181.94:3000/'">
          <img src="http://115.85.181.94:3000/image/home_icon.png" width="40px" height="40px" alt="Home">
        </button>
    
        <h2> Arudino Test Page </h2>

        <button class="button" onClick="location.href='/arduino/A/0'">
          A OFF
        </button>
        <button class="button" onClick="location.href='/arduino/A/1'">
          A ON
        </button>
        <br><br>

        <button class="button" onClick="location.href='/arduino/B/0'">
          B OFF
        </button>
        <button class="button" onClick="location.href='/arduino/B/1'">
          B ON
        </button>
        <br><br>

        <button class="button" onClick="location.href='/arduino/C/0'">
          C OFF
        </button>
        <button class="button" onClick="location.href='/arduino/C/1'">
          C ON
        </button>
        
      </body>
    </html>
    `
  }   
}