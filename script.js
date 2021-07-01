var requestUrl = 'https://www.icalendar37.net/lunar/api/?';
var sunriseUrl = 'https://openweathermap.org/current';
var zipInput = document.querySelector('#userzip-input');

var xhr = new XMLHttpRequest();

//used code from: "http://www.wdisseny.com/lluna/?lang=en#ex_04"
function moonphase(moon){
    phMax = []
    for (var nDay in moon.phase){
        if (moon.phase[nDay].isPhaseLimit){
            phMax.push(
                '<div>'+
                '<span>'+ nDay + '</span>'+
                moon.phase[nDay].svg +
                '<div>' + moon.phase[nDay].phaseName + '</div>'+
                '</div>'
            )
        }
    }
    var width = 100 / phMax.length
    var html = "<b>"+ moon.monthName+ ""+ moon.year + "</b>"
    phMax.forEach(function(element){
        html += '<div style="width:'+width+'%">' + element + '</div>' 
    })
    document.getElementById("moon-phase").innerHTML = html
}

xhr.onreadystatechange = function () {
 if (xhr.onreadystatechange == XMLHttpRequest.DONE) {
     console.log('XMHLttpRequest Response \n-------------');
     console.log(xhr.response);
 }
};
xhr.open('GET', requestUrl, true);
xhr.send();
var configMoon ={
    lang: 'en',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    size: "100%",
    lightColor: "rgb(255,255,230)",
    shadeColor: "transparent",
    texturize: true,
}
var gets=[]
 for (var i in configMoon) {
     gets.push(i + "=" + encodeURIComponent(configMoon[i]))
 }
 gets.push("LDZ=" + new Date(configMoon.year,configMoon.month-1,1)/1000)
$.ajax({
    url: requestUrl + gets.join("&"),
    method: 'GET',
}).then(function (response) {    console.log('Ajax Response \n-------------');
    console.log(response);
    moonphase(JSON.parse(response))
})


//Sunrise and Sunset tracking code
var riseSetTracker = function (event) {
    event.preventDefault();

    var zipcode = zipInput

    if (zipcode) {
        getSunTracker(zipcode);
    }
    console.log(zipcode)
}

var getSunTracker = function (zipcode) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' + zipcode + 'us&appid={c0d5f49124cf4cdbd7436b6982c9b2fe}';
    
    fetch(apiUrl)
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayTracker(data, zipcode);
            });
        } else {
            alert('Error' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to retrieve data');
    })
}

zipInput.addEventListener('submit', riseSetTracker);