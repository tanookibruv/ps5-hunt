function locationdata() {
    var url = api + input.value();
    loadJSON(url, gotData);

    document.getElementById('sunrise').textContent = sunrise;
}

async function locationData() {
    var zipInput = document.getElementById("zipInput").value
    console.log("zipInput", zipInput);
    const apiUrl = 'https://api.ipgeolocation.io/astronomy?apiKey=38de070d74f34c7988c15e48ffb7fab5&location=' + zipInput
    const response = await fetch(apiUrl);
    console.log(response);
    const data = await response.json();
    console.log(data);
    const {
        location,
        date,
        current_time,
        sunrise,
        sunset,
        solar_noon,
        day_length,
        sun_altitude,
        sun_distance,
        sun_azimuth,
        moonrise,
        moonset,
        moon_status,
        moon_altitude,
        moon_distance,
        moon_azimuth,
        moon_parallactic_angle
    } = data

    const {
        country_name,
        state_prov,
        city,
        zipcode,
    } = location


    document.getElementById('country_name').textContent = country_name;
    document.getElementById('state_prov').textContent = state_prov;
    document.getElementById('city').textContent = city;
    document.getElementById('zipcode').textContent = zipcode;
    document.getElementById('date').textContent = date;
    document.getElementById('current_time').textContent = current_time;
    document.getElementById('sunrise').textContent = sunrise;
    document.getElementById('sunset').textContent = sunset;
    document.getElementById('solar_noon').textContent = solar_noon;
    document.getElementById('day_length').textContent = day_length;
    document.getElementById('sun_altitude').textContent = sun_altitude;
    document.getElementById('sun_distance').textContent = sun_distance;
    document.getElementById('sun_azimuth').textContent = sun_azimuth;
    document.getElementById('moonrise').textContent = moonrise;
    document.getElementById('moonset').textContent = moonset;
    document.getElementById('moon_status').textContent = moon_status;
    document.getElementById('moon_altitude').textContent = moon_altitude;
    document.getElementById('moon_distance').textContent = moon_distance;
    document.getElementById('moon_azimuth').textContent = moon_azimuth;
    document.getElementById('moon_parallactic_angle').textContent = moon_parallactic_angle;

}

locationData()

var submitbutton = document.getElementById("submitbutton");

submitbutton.addEventListener("click", locationData);


var requestUrl = 'https://www.icalendar37.net/lunar/api/?';
var sunriseUrl = 'https://openweathermap.org/current';
var zipInput = document.querySelector('#userzip-input');

var xhr = new XMLHttpRequest();

//used code from: "http://www.wdisseny.com/lluna/?lang=en#ex_04"
function moonphase(moon) {
    phMax = []
    for (var nDay in moon.phase) {
        if (moon.phase[nDay].isPhaseLimit) {
            phMax.push(
                '<div>' +
                '<span>' + nDay + '</span>' +
                moon.phase[nDay].svg +
                '<div>' + moon.phase[nDay].phaseName + '</div>' +
                '</div>'
            )
        }
    }
    var width = 100 / phMax.length
    var html = "<b>" + moon.monthName + "" + moon.year + "</b>"
    phMax.forEach(function(element) {
        html += '<div style="width:' + width + '%">' + element + '</div>'
    })
    document.getElementById("moon-phase").innerHTML = html
}

xhr.onreadystatechange = function() {
    if (xhr.onreadystatechange == XMLHttpRequest.DONE) {
        console.log('XMHLttpRequest Response \n-------------');
        console.log(xhr.response);
    }
};
xhr.open('GET', requestUrl, true);
xhr.send();
var configMoon = {
    lang: 'en',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    size: "100%",
    lightColor: "rgb(255,255,230)",
    shadeColor: "transparent",
    texturize: true,
}
var gets = []
for (var i in configMoon) {
    gets.push(i + "=" + encodeURIComponent(configMoon[i]))
}
gets.push("LDZ=" + new Date(configMoon.year, configMoon.month - 1, 1) / 1000)
$.ajax({
    url: requestUrl + gets.join("&"),
    method: 'GET',
}).then(function(response) {
    console.log('Ajax Response \n-------------');
    console.log(response);
    moonphase(JSON.parse(response))
})






function load_moon_phases(obj, callback) {
    var gets = []
    for (var i in obj) {
        gets.push(i + "=" + encodeURIComponent(obj[i]))
    }
    gets.push("LDZ=" + new Date(obj.year, obj.month - 1, 1) / 1000)
    var xmlhttp = new XMLHttpRequest()
    var url = "https://www.icalendar37.net/lunar/api/?" + gets.join("&")
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(JSON.parse(xmlhttp.responseText))
        }
    }
    xmlhttp.open("GET", url, true)
    xmlhttp.send()
}

function example_3(moon) {
    var lunar_day, i, inc = 0
    var containsCalendar = document.getElementById("ex3")
    const first_day_week_sunday = false // canvia el valor d'aquesta constant a true perquè el primer dia de la setmana sigui Diumenge
    if (first_day_week_sunday) {
        inc = 1
        moon.nameDay.unshift(moon.nameDay.pop())
    }
    var empty_initial_boxes = Number(moon.phase[1].dayWeek) + inc
    var number_days_month = Number(moon.daysMonth)
    var total_boxes = Math.ceil((empty_initial_boxes + number_days_month) / 7) * 7
    var html = '<div>' +
        '<button value="-1" class="buttonCalendar">\u276E</button>' +
        '<div class="titleCalendar">' + moon.monthName + " " + moon.year + '</div>' +
        '<button value="1" class="buttonCalendar">\u276F</button>' +
        '</div>'
    for (i = 0; i < 7; i++) {
        html += '<div class="name_day">' + moon.nameDay[i] + '</div>'
    }
    containsCalendar.innerHTML = html
    for (i = 0; i < total_boxes; i++) {
        var day = i - empty_initial_boxes
        var box = document.createElement("DIV")
        box.className = "day_box"
        if (day >= 0 && day < number_days_month) {
            lunar_day = day + 1
            if (moon.year == (new Date).getFullYear() && moon.month == (new Date).getMonth() + 1 && lunar_day == (new Date).getDate()) box.id = "isToDay"
            box.innerHTML = '<div>' +
                '<span>' + lunar_day + '</span>' +
                '<div>' + moon.phase[lunar_day].svg + '</div>' +
                '</div>'
            if (moon.phase[lunar_day].isPhaseLimit) {
                var url = "data:image/svg+xml;utf8, " + moon.phase[lunar_day].svgMini
                box.firstChild.style.backgroundImage = 'url("' + url + '")'
                box.title = moon.phase[lunar_day].phaseName
            }
        }
        containsCalendar.appendChild(box)
    }

    document.querySelectorAll(".buttonCalendar").forEach(function(button) {
        button.onclick = function() {
            var date_to_show = new Date(moon.year, moon.month + Number(this.getAttribute("value") - 1), 1)
            var configMoon = moon.receivedVariables
            configMoon.month = date_to_show.getMonth() + 1
            configMoon.year = date_to_show.getFullYear()
            load_moon_phases(configMoon, example_3)
            this.style.visibility = "hidden"
        }
    })
}
var configMoon = {
    lang: 'en',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    size: "100%",
    lightColor: "white",
    shadeColor: "black",
    texturize: true,
}
load_moon_phases(configMoon, example_3)
