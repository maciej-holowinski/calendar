const appModel = (function () {
  //-----------------zmienne i funkcje prywatne (pomocnicze)-----------------------

  let latitude, longitude, forecastData, weatherList, currentTemperatureData, currentTemperature, weatherDescription, currentCity;

  const KELVIN_CONSTANT = 273.15;
  let awaitingPromises = [];
  let currentWeather = [];
  let currentweatherDescription = []

  class AppModel {
    constructor() {
      this.initializeModel();
    }

    async initializeModel() {
      await this.setCurrentPosition();
      await this.fetch5DaysForecast();
      await this.fetchCurrentWeather();
    }
    //Funkcja sprawdza czy jest  już imie zapisane w localStorage
    isNewUser() {
      return localStorage.getItem("username");
    }

    //Funkcja dodaje imie do localStorage
    saveUserName(name) {
      localStorage.setItem("username", name);
    }


    //Funkcja pobiera lokalizacje uzytkownika
    setCurrentPosition() {
      return new Promise((resolve, reject) => {
        latitude = null;
        longitude = null;

        let getPosition = new Promise(function (resolve, reject) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        getPosition
          .then(position => {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            resolve();
          })
          .catch(err => {
            console.error(err.message);
            reject();
          });
      });
    }

    getPosition() {
      return [latitude, longitude];
    }

    //Funkcja pobiera nazwę miasta według  lokalizacji
    getCity() {
      return fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
        )
        .then(response => response.json())
        .then(data => {
          currentCity = data.address.city;
          return data.address.city;
        })
        .catch(error => {
          console.log(error);
          return error;
        });
    }
    getWeatherHourly(longitude, latitude) {
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=bb5707b9a02b5c08635c421eed9e2690`)
        .then(response => response.json())
        .catch(error => console.error(error));
    }

    getCurrentWeather(longitude, latitude) {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=bb5707b9a02b5c08635c421eed9e2690`)
        .then(response => response.json())
        .catch(error => console.error(error));
    }
    async fetchCurrentWeather() {
      currentTemperatureData = await this.getCurrentWeather(longitude, latitude);
      currentTemperature = (currentTemperatureData.main.temp - KELVIN_CONSTANT).toFixed();
      weatherDescription = currentTemperatureData.weather[0].main
      currentWeather.forEach(resolveFn => resolveFn(currentTemperature, weatherDescription));
    }

    async fetch5DaysForecast() {
      forecastData = await this.getWeatherHourly(longitude, latitude);
      weatherList = forecastData.list.reduce((acc, forecast) => {
        const date = new Date(forecast.dt_txt);
        const objKey = date.toLocaleDateString()
        return {
          ...acc,
          [objKey]: {
            ...acc[objKey],
            [date.getHours()]: (forecast.main.temp - KELVIN_CONSTANT).toFixed()
          }
        }
      }, {})
      localStorage.setItem('weather', JSON.stringify(weatherList))
      awaitingPromises.forEach(resolveFn => resolveFn(weatherList));
      awaitingPromises = [];
    }

    async getWeatherTemperature() {
      if (currentTemperature) {
        return currentTemperature
      } else {
        const temperature = new Promise((resolve) => {
          currentWeather.push((currentTemperature) => resolve(currentTemperature));
        });
        return await temperature;
      }
    }
    async getWeatherDescription() {
      if (weatherDescription) {
        return weatherDescription
      } else {
        const description = new Promise((resolve) => {
          currentweatherDescription.push((weatherDescription) => resolve(weatherDescription));
        });
        return await description;
      }
    }

    async getWeatherList() {
      if (weatherList) {
        return weatherList
      } else {
        const awaitingPromise = new Promise((resolve) => {
          awaitingPromises.push((weatherList) => resolve(weatherList));
        });
        return await awaitingPromise;
      }
    }
  }
  return new AppModel
})();