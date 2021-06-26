var requestUrl = 'https://www.icalendar37.net/lunar/api/?';

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
 if (xhr.onreadystatechange == XMLHttpRequest.DONE) {
     console.log('XMHLttpRequest Response \n-------------');
     console.log(xhr.response);
 }
};
xhr.open('GET', requestUrl);
xhr.send();

$.ajax({
    url: requestUrl,
    method: 'GET',
}).then(function (response) {
    console.log('Ajax Response \n-------------');
    console.log(response);
})
