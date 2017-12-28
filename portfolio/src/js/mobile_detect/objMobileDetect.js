var md = new MobileDetect(window.navigator.userAgent);

console.log(md);

md.setStyle = function (x) {
    var a=document.createElement("link");
    a.rel="stylesheet";
    a.href=x;
    document.getElementsByTagName("head")[0].appendChild(a);
}

if (md.mobile() && md.phone()) {
    console.log('run setStyle for mobile');
    md.setStyle('css/m-main.css');
} else if (md.tablet()) {
    console.log('run setStyle for tablet');
    md.setStyle('css/t-main.css');
} else {
    console.log('run setStyle for desktop');
    md.setStyle('css/main.css');
}