module.exports = {
  HTML:function(a, b, c){
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

        <b class="title" id="A">OFF</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <b class="title">A</b>&nbsp&nbsp
        <label class="switch">
          <input type="checkbox" id="BtnA">
          <span class="slider round"></span>
        </label>
        
        <br><br>

        <b class="title" id="B">OFF</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <b class="title">B</b>&nbsp&nbsp
        <label class="switch">
          <input type="checkbox" id="BtnB">
          <span class="slider round"></span>
        </label>
        
        <br><br>

        <b class="title" id="C">OFF</b> &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
        <b class="title">C</b>&nbsp&nbsp
        <label class="switch">
          <input type="checkbox" id="BtnC">
          <span class="slider round"></span>
        </label>
        
        <br><br>
        
        <br>
        


        <button class="button_small" onClick="location.href='/arduino/A/1'">
          ON
        </button>
        <button class="button_small" onClick="location.href='/arduino/A/0'">
          OFF
        </button>
        <br>
        <button class="button_small" onClick="location.href='/arduino/B/1'">
          ON
        </button>
        <button class="button_small" onClick="location.href='/arduino/B/0'">
          OFF
        </button>
        <br>
        <button class="button_small" onClick="location.href='/arduino/C/1'">
          ON
        </button>
        <button class="button_small" onClick="location.href='/arduino/C/0'">
          OFF
        </button>

        <script type="text/javascript" src="/view/arduino_script.js"></script>

      </body>
    </html>
    `
  }   
}