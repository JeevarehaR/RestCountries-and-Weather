var element = document.querySelector("body div.container");
// var button = document.querySelector(".btn btn-primary");
element.innerHTML = "";
//fetch the data from rest countries with the url
const url =
  "https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((obj) => {
      var countryName = obj.name;
      var capital = obj.capital;
      var region = obj.region;
      var code = obj.alpha3Code;
      var code = obj.alpha3Code;
      var flagcode = code.toLowerCase();
      var flag = `https://countryflagsapi.com/svg/${flagcode}`;
      var latlng = obj.latlng;
      var lat = latlng[0];
      var lon = latlng[1];
      var weatherurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=891c0d9056b791b1ced7f66727c3badf`;
      let xhr = new XMLHttpRequest();
      xhr.open("GET", weatherurl);
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var weatherData = JSON.parse(this.response);
          var weather = weatherData.weather;
          var description = weather[0].description;
          var main = weatherData.main;
          var temp = main.temp;
          document.querySelector("button").onclick = () => {
            document.querySelector("button").innerHTML = `
          Weather : ${description}
          Temperature : ${temp}`;
            console.log(description, temp);
          };
        } else {
          console.log("error");
        }
      };
      xhr.send();

      element.innerHTML += `
      <div class="container">
        <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 card-body">
                <div class="card h-100">
                    <div class="card-header">${countryName}</div>
                    <img src=${flag} alt=${countryName} class="card-img-top">
                    <div class="card-body">
                        <p class="capital">Capital : ${capital}</p>
                        <div class="card-text">
                            <p class="Region">Region : ${region}</p>
                            <p class="country-code">Country Code : ${code}</p>
                        </div>
                        <button class="btn btn-primary"> Click for Weather </button>
                    </div>
                </div>
            </div>
        </div><br>
    </div>`;
    });
  })
  .catch((error) => {
    console.log(error);
  });
