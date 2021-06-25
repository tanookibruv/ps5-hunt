const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
    }
});

xhr.open("GET", "https://bestbuy-products.p.rapidapi.com/product?url=https%3A%2F%2Fwww.bestbuy.com%2Fsite%2Fsony-playstation-5-console%2F6426149.p%3FskuId%3D6426149&sku=5748618");
xhr.setRequestHeader("x-rapidapi-key", "68dd8ed3b7mshe1718aba5807eb6p1c57d9jsn9813beb939fd");
xhr.setRequestHeader("x-rapidapi-host", "bestbuy-products.p.rapidapi.com");

xhr.send(data);