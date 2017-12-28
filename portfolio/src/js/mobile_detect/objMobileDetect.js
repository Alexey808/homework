var md = new MobileDetect(window.navigator.userAgent);

console.log(md);

md.setStyle = function (x) {
    var a=document.createElement("link");
    a.rel="stylesheet";
    a.href=x;
    document.getElementsByTagName("head")[0].appendChild(a);
}

// console.log( md.mobile() );          // 'Sony'
// console.log( md.phone() );           // 'Sony'
// console.log( md.tablet() );          // null
// console.log( md.userAgent() );       // 'Safari'
// console.log( md.os() );              // 'AndroidOS'
// console.log( md.is('iPhone') );      // false
// console.log( md.is('bot') );         // false
// console.log( md.version('Webkit') );         // 534.3
// console.log( md.versionStr('Build') );       // '4.1.A.0.562'
// console.log( md.match('playstation|xbox') ); // false

// console.log( md.userAgent() ); 
// console.log( md.phone() );
// console.log( md.tablet() ); 
// console.log( md.mobileGrade() );



// location.href = (md.mobileGrade() === 'A') ? '/mobile/' : '/lynx/';

if (md.mobile()) {
	console.log('run setStyle for mobile');
	md.setStyle('css/m-main.css');
} else if (md.tablet()) {
	console.log('run setStyle for tablet');
	md.setStyle('css/t-main.css');
} else {
	console.log('run setStyle for desktop');
    md.setStyle('css/main.css');
}