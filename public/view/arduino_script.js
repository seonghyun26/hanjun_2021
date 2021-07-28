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
    setCookie(char[num], btn[num].checked, 1);

    window.location.assign(`http://115.85.181.94:3000/arduino/${char[num]}/${btn[num].checked ? 1 : 0}`);
}

const initValue = function() {
    // Get Value from Arduino Server
    for ( i = 0 ; i < 3; i++ ){
        var savedStatus = getCookie(char[i]);
        status[i].innerHTML = savedStatus ? "ON" : "OFF";
        btn[i].checked = savedStatus;
    }
}

const setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

const getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

initValue();