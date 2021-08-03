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

    window.location.assign(`http://115.85.181.94:3000/arduino/${char[num]}/${btn[num].checked ? 1 : 0}`);
}

const init = () => {
    console.log("init");
    for ( i = 0 ; i < 3; i++ ){
        console.log(btn[i].checked);
        console.log(status[i].innerHTML);
        if ( status[i].innerHTML == "ON" )   btn[i].checked = true;
        else if ( status[i].innerHTML == "OFF" )     btn[i].checked = false;
    }
}

init();