const btn = [
    document.getElementById("BtnA"),
    document.getElementById("BtnB"),
    document.getElementById("BtnC")
];
const status = [
    document.getElementById("A"),
    document.getElementById("B"),
    document.getElementById("C")
];
const char = ['A','B','C'];

btn[0].addEventListener("change", event => changeValue(0));
btn[1].addEventListener("change", event => changeValue(1));
btn[2].addEventListener("change", event => changeValue(2));

function changeValue(num) {
    var bntChecked = btn[num].checked;
    console.log(bntChecked);

    status[num].innerHTML = bntChecked ? "ON" : "OFF";
    console.log(`${char[num]}, ${btn[num].checked}`);

    // window.location.assign(`http://115.85.181.94:3000/arduino/${char[num]}/${btn[num].checked ? 1 : 0}`);
}

const setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

const getCookie = (key) => {
    let cookieKey = key + "="; 
    let result = "";
    const cookieArr = document.cookie.split(";");
    
    for(let i = 0; i < cookieArr.length; i++) {
        if(cookieArr[i][0] === " ") {
            cookieArr[i] = cookieArr[i].substring(1);
        }
        
        if(cookieArr[i].indexOf(cookieKey) === 0) {
            result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
            return result;
        }
    }
    return result;
}

var init = () => {
    // Get Value from Arduino Server
    console.log("init");
    for ( i = 0 ; i < 3; i++ ){
        if ( status[i].innerHTML="OFF" )   btn[i].checked = false;
        else btn[i].checked = true;
    }
}

init();