let domainName;
const time = document.querySelector('.time');
const TIME = "time"

function getCurrentTabUrl(callback){
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    
    chrome.tabs.query(queryInfo, function(tabs){
        var tab = tabs[0];
        var url = tab.url;
        callback(url);
    });
}

function ValidUrl(str){
    var pattern = new RegExp('^(http(s)?:\/\/)(www.youtube.com)+');
    var pattern2 = new RegExp('^(http(s)?:\/\/)(www.netflix.com)+');
    if(pattern.test(str)){
        domainName = 'Youtube';
        return true;
    } else if(pattern2.test(str)){
        domainName = 'Neflix';
        return true;
    } else{
        return false;
    }
}

function timeView(times){
    let a;
    const days = Math.floor(times / (1000 * 60 * 60 * 24));
    a = times % (1000 * 60 * 60 * 24);
    const hours = Math.floor(a / (1000 * 60 * 60));
    a = a % (1000 * 60 * 60);
    const minutes = Math.floor(a / (1000 * 60));
    a = a % (1000 * 60);
    const seconds = Math.floor(a / 1000);

    time.innerText = `${days}d ${hours < 10 ? `0${hours}h` : `${hours}h`} ${minutes < 10 ? `0${minutes}m` : `${minutes}m`} ${seconds < 10 ? `0${seconds}s` : `${seconds}s`}`;
}

function getTime(){
    const date = new Date();
    time.innerText = date;
//    console.log(times);
//    timeView(times);
//    localStorage.setItem(TIME, times);
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

//init();
document.addEventListener('DOMContentLoaded', function(){
   getCurrentTabUrl(function(url){
      if(ValidUrl(url)){
        const day = new Date();
        localStorage(TIME, day.getTime());
        init();
        document.querySelector('.span').innerText = domainName;
      }
   });
});