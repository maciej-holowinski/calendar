const appView = (function () {
  //-----------------zmienne i funkcje prywatne (pomocnicze)-----------------------

  //Deklaruję obiekt przechowujący referencje do istniejących elementów DOM
  const domElements = {
    applicationWrapper: document.querySelector(".app-wrapper"),
    applicationWidget: document.querySelector(".app-widget"),
    appCalendar: document.querySelector(".app-calendar"),
    appMap: document.querySelector(".app-map"),
    displayedUserNamer: document.querySelector(".username"),
    buttonsContainer: document.querySelector(".buttons-container"),
    monthInput: document.querySelector(".month-select"),
    yearInput: document.querySelector(".year-select"),
    monthInputOptions: document.querySelectorAll(".month-option"),
    yearInputOptions: document.querySelectorAll(".year-option"),
    calendar: document.querySelector(".calendar"),
    leftButton: document.querySelector(".left-button"),
    rightButton: document.querySelector(".right-button"),
    locationSlider: document.querySelector(".slider"),
    currentLocation: document.querySelector(".location-current"),
    hiddenCheckbox: document.querySelector(".hiddenBox"),
    sliderLabel: document.querySelector(".slider-label"),
    currentWeatherLocation: document.querySelector(".current-weather-location"),
    headerContainer: document.querySelector(".header-container"),
    detailedForecastContainer: document.querySelector(
      ".detailed-forecast-container"
    ),
    weatherHours: document.querySelectorAll(".weather-hour"),
    currentTemperature: document.querySelector(".current-temperature"),
    dayDescription: document.querySelector(".day-description"),
    currentTemperatureDescription: document.querySelector(
      ".current-weather-description"
    ),
    currentTemperatureDescriptionIcon: document.querySelector(
      ".current-weather-description-icon"
    )
  };

  let fixedNumberOfDaysInMonth;
  // let availableForecastDaysForEvents = [];
  let currentWeatherDescription;
  let map;

  //Tutaj deklarujemy zmienne i funkcje pomocnicze
  function createElement(parentElement, elementType, newClassName) {
    let newElement = document.createElement(elementType);

    parentElement.appendChild(newElement);

    if (newClassName) {
      newElement.className = newClassName;
    }

    return newElement;
  }

  function getDays(year, month) {
    let date, firstDayOfMonth, daysInMonth;

    date = new Date(year, month);

    //pobieram pierwszy dzień miesiąca
    //jeżeli jest to niedziela (czyli 0) ustawiam wartość na 7
    firstDayOfMonth = date.getDay();

    return {
      firstDayOfMonth: firstDayOfMonth == 0 ? 7 : firstDayOfMonth,
      //obliczam ilość dni w miesiącu
      daysInMonth: new Date(year, month + 1, 0).getDate()
    };
  }
  return {
    getDomElements: function () {
      return domElements;
    },
    //Funkcja wyświetla element logowania
    displayLogin: function () {
      let newElement, childElement;

      //tworzy elementy okna logowania w DOM
      newElement = createElement(document.body, "div", "login-container");
      domElements.loginContainer = newElement;
      newElement = createElement(newElement, "div", "login-box");
      childElement = createElement(newElement, "span", "credits-text");
      childElement.textContent = "JS Mafia przedstawia";

      childElement = createElement(newElement, "img", "white-logo");
      childElement.setAttribute("src", "img/logos/logo-white.png");
      childElement.setAttribute("alt", "app logo");

      newElement = createElement(newElement, "form", "login-form");

      childElement = createElement(newElement, "span", "login-text");
      childElement.textContent = "podaj swoje imię:";

      childElement = createElement(newElement, "input", "login-input");
      childElement.setAttribute("type", "text");
      childElement.setAttribute("name", "imie");
      domElements.loginInput = childElement;

      childElement = createElement(newElement, "button", "login-button");
      childElement.textContent = "Zaloguj";
      domElements.loginButton = childElement;
    },

    //fusuwa element logowania
    deleteLogin: function () {
      domElements.loginContainer.innerHTML = "";
      domElements.loginContainer.parentNode.removeChild(
        domElements.loginContainer
      );
    },

    addDetailedForecastButton: function () {
      let button, windowWidth, windowHeight;
      windowWidth = window.innerWidth;
      windowHeight = window.innerHeight;

      if (windowWidth > 600 && windowHeight < 950) {
        button = createElement(
          domElements.headerContainer,
          "button",
          "deatiled-forecast-button"
        );
        buttonImg = createElement(
          button,
          "img",
          "deatiled-forecast-button-img"
        );
        buttonImg.src = "img/app-icons/dc-up.png";

        domElements.detailedForecastButton = button;
        domElements.detailedForecastButtonImg = buttonImg;

        return true;
      } else {
        return false;
      }
    },

    addMobileNavigationButtons: function () {
      let windowWidth,
        calendarButton,
        mapButton,
        calendarButtonImg,
        mapButtonImg,
        leftWhiteButtonImg,
        rightWhiteButtonImg;

      windowWidth = window.innerWidth;
      if (windowWidth <= 600) {
        calendarButton = createElement(
          domElements.headerContainer,
          "button",
          "calendar-button"
        );
        calendarButtonImg = createElement(
          calendarButton,
          "img",
          "calendar-button-img"
        );
        calendarButtonImg.src = "img/app-icons/calendar.png";

        mapButton = createElement(
          domElements.headerContainer,
          "button",
          "map-button"
        );
        mapButtonImg = createElement(mapButton, "img", "map-button-img");
        mapButtonImg.src = "img/app-icons/map.png";

        leftWhiteButton = createElement(
          domElements.appMap,
          "button",
          "left-white-button"
        );
        leftWhiteButtonImg = createElement(
          leftWhiteButton,
          "img",
          "left-white-button-img"
        );
        leftWhiteButtonImg.src = "img/app-icons/right-white.png";

        rightWhiteButton = createElement(
          domElements.appCalendar,
          "button",
          "right-white-button"
        );
        rightWhiteButtonImg = createElement(
          rightWhiteButton,
          "img",
          "right-white-button-img"
        );
        rightWhiteButtonImg.src = "img/app-icons/left-white.png";

        domElements.calendarButton = calendarButton;
        domElements.mapButton = mapButton;
        domElements.leftWhiteButton = leftWhiteButton;
        domElements.rightWhiteButton = rightWhiteButton;

        return true;
      } else {
        return false;
      }
    },

    removeForecastButton: function () {
      domElements.detailedForecastButton.parentElement.removeChild(
        domElements.detailedForecastButton
      );

      domElements.detailedForecastButton = null;
    },

    removeMobileNavigationButtons: function () {
      domElements.calendarButton.parentElement.removeChild(
        domElements.calendarButton
      );
      domElements.mapButton.parentElement.removeChild(domElements.mapButton);
      domElements.leftWhiteButton.parentElement.removeChild(
        domElements.leftWhiteButton
      );
      domElements.rightWhiteButton.parentElement.removeChild(
        domElements.rightWhiteButton
      );

      domElements.calendarButton = null;
      domElements.mapButton = null;
      domElements.leftWhiteButton = null;
      domElements.rightWhiteButton = null;
    },
    //zwraca nazwę użytkownika z input
    getUserName: function () {
      return domElements.loginInput.value;
    },
    //zwraca referencję do elementu DOM
    getDomElement: function (name) {
      return domElements[name];
    },

    //wyświetla nazwę użytkownika w aplikacji
    setUserName: function (name) {
      domElements.displayedUserNamer.textContent = name;
    },
    //funkcja tworzy komórki kalendarza
    createCalendar: function (year, month) {
      let rowElement,
        rowIndex = 0;

      let {
        firstDayOfMonth,
        daysInMonth
      } = getDays(year, month);

      //generuje wiersze i komórki kalendarza w oparciu o ilość dni w miesiącu i pierwszy dzień w miesiącu
      for (var i = 0; i < daysInMonth + firstDayOfMonth - 1; i++) {
        if (rowIndex == 0) {
          rowElement = document.createElement("div");
          rowElement.classList.add("calendar-row");
          domElements.calendar.appendChild(rowElement);
        }
        cellElement = document.createElement("div");
        cellElement.classList.add("calendar-cell");
        rowElement.appendChild(cellElement);

        rowIndex++;
        if (rowIndex > 6) rowIndex = 0;
      }
      //zapisuję wiersze kalendarza w zmiennej
      domElements.calendarRows = document.querySelectorAll(".calendar-row");
    },

    // funkcja wypełnia kalendarz dniami
    fillCalendar: function (year, month) {
      let highlight,
        dayNumber,
        currentDay,
        actualDate,
        currentMonth,
        currentYear,
        availableForecastDays = [];

      //pobieram wszystkie komórki kalendarza
      domElements.calendarDays = document.querySelectorAll(".calendar-cell");

      let {
        firstDayOfMonth,
        daysInMonth
      } = getDays(year, month);
      console.log(daysInMonth);
      //pobieram dane dnia dzisiejszego
      actualDate = new Date();
      currentMonth = actualDate.getMonth();
      currentYear = actualDate.getFullYear();
      currentDay = new Date().getDate();

      // class Day {
      //   constructor(day, month, year) {
      //     this.day = day;
      //     this.month = month;
      //     this.year = year;
      //   }
      // }

      // let nextMonth = false,
      //   nextYear = false
      // availableDay = currentDay,
      //   availableMonth = currentMonth,
      //   availableYear = currentYear;
      // fixedNumberOfDaysInMonth = !fixedNumberOfDaysInMonth ? daysInMonth : fixedNumberOfDaysInMonth;
      // tmp = fixedNumberOfDaysInMonth;

      // for (let i = 0; i < 5; i++) {

      //   if (nextMonth == true) {

      //     availableDay = 1;

      //     availableMonth = availableMonth == 11 ? 0 : availableMonth + 1;
      //     nextMonth = false;

      //     tmp = new Date(availableYear, availableMonth + 1, 0).getDate()

      //     if (nextYear == true) {
      //       availableYear++;
      //     }
      //   }

      //   availableForecastDays[i] = new Day(availableDay, availableMonth, availableYear);

      //   if (availableForecastDays[i].day == tmp) {
      //     nextMonth = true;
      //     if (availableMonth == 11) {
      //       nextYear = true;
      //     }
      //   }
      //   availableDay++;

      // }

      dayNumber = 1;
      //wypełniam komórki kalendarza dniami
      for (
        let i = firstDayOfMonth - 1; i < daysInMonth + firstDayOfMonth - 1; i++
      ) {
        //jeżeli generowany dzień jest dniem dzisiejszym tworzę element, który pozwoli go wyszczególnić
        if (
          currentMonth == month &&
          currentYear == year &&
          dayNumber == currentDay
        ) {
          domElements.calendarDays[i].classList.add("current-day");


          domElements.currentDayIcon = document.createElement("img");
          // img.src = domElements.currentTemperatureDescriptionIcon.src;
          domElements.currentDayIcon.classList.add("available-day-icon");

          if (currentWeatherDescription) {
            domElements.currentDayIcon.src = `img/weather-icons/${this.chooseNightOrDay()}/${currentWeatherDescription}.png`;
          }



          domElements.calendarDays[i].textContent = dayNumber;
          domElements.calendarDays[i].appendChild(domElements.currentDayIcon);
        } else {
          domElements.calendarDays[i].textContent = dayNumber;
        }

        // console.log(dayNumber, month, year)
        // let tmp = {
        //   day: dayNumber,
        //   month: month,
        //   year: parseInt(year)
        // };
        // // console.log(tmp);
        // let x = availableForecastDays.findIndex((el) => {

        //   return (el.day == tmp.day && el.month == tmp.month && el.year === tmp.year)

        // });
        // // console.log(x);

        // if (x != -1) {

        //   let img = document.createElement("img");
        //   img.src = "img/app-icons/weather.png";
        //   img.classList.add("available-day-icon");
        //   domElements.calendarDays[i].appendChild(img);
        //   availableForecastDaysForEvents.push(domElements.calendarDays[i]);
        // }

        dayNumber++;
      }

      // return availableForecastDaysForEvents;
    },

    //funkcja usuwa komórki kalendarza
    clearCalendar: function () {
      for (let i = 0; i < domElements.calendarRows.length; i++) {
        while (domElements.calendarRows[i].firstChild) {
          domElements.calendarRows[i].removeChild(
            domElements.calendarRows[i].firstChild
          );
        }
        domElements.calendarRows[i].parentElement.removeChild(
          domElements.calendarRows[i]
        );
      }
    },

    //funkcja wypełnia inputy (miesiąc i rok)
    fillCalendarInputs: function (year, month) {
      //ustawia w impucie podany miesiąc
      domElements.monthInputOptions[month].selected = true;
      //ustawia w impucie podany rok
      let activeYear = Array.from(domElements.yearInputOptions).find(
        element => element.value == year
      );
      activeYear.selected = true;
    },

    //funkcja zwraca indeks obecnie wybranego elementu z NodeList
    findSelectedInput: function (element) {
      let selectedIndex = Array.from(element).findIndex(el => el.selected);
      return selectedIndex;
    },

    //funkcja ustawia poprzedni miesiąc na wybrany
    selectPreviousMonth: function (element, selectedIndex) {
      if (selectedIndex != 0) {
        element[selectedIndex - 1].selected = true;
      } else {
        element[11].selected = true;
        let index = this.findSelectedInput(domElements.yearInputOptions);
        domElements.yearInputOptions[index - 1].selected = true;
      }
    },

    //funkcja ustawia następny miesiąc na wybrany
    selectNextMonth: function (element, selectedIndex) {
      if (selectedIndex != 11) {
        element[selectedIndex + 1].selected = true;
      } else {
        element[0].selected = true;
        let index = this.findSelectedInput(domElements.yearInputOptions);
        domElements.yearInput[index + 1].selected = true;
      }
    },

    displayDate: function () {
      let today, renderDate;
      today = new Date();
      const day = today.getDay();
      const year = today.getFullYear();
      const month = today.getMonth();
      const daym = today.getDate();
      let dayArr = [
        "niedziela",
        "poniedziałek",
        "wtorek",
        "środa",
        "czwartek",
        "piątek",
        "sobota"
      ];
      let monthArr = [
        "stycznia",
        "lutego",
        "marca",
        "kwietnia",
        "maja",
        "czerwca",
        "lipca",
        "sierpnia",
        "września",
        "października",
        "listopada",
        "grudnia"
      ];
      dayArr = dayArr.map(x => x.replace(x[0], x[0].toUpperCase()));
      monthArr = monthArr.map(x => x.replace(x[0], x[0].toUpperCase()));
      renderDate = `${dayArr[day]}, ${daym} ${monthArr[month]} ${year}`;
      domElements.dayDescription.innerHTML = renderDate;
    },

    launchMap: function (latitude, longitude) {
      let mymap = L.map("map-container").setView([latitude, longitude], 13);
      console.log(appModel.getPosition);
      const sunnyIcon = L.icon({
        iconUrl: "img/app-icons/location.png",
        iconSize: [44, 48],
        iconAnchor: [22, 94]
      });
      L.marker([latitude, longitude], {
        icon: sunnyIcon
      }).addTo(mymap);

      map = mymap;

      L.tileLayer(
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW51cmFkaXMiLCJhIjoiY2p5eThvNGdoMTk3eDNibXBmdjlxaTN0dSJ9.4--qIt8LkGdJrvrNjLHZsA", {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: "mapbox.streets",
          accessToken: "your.mapbox.access.token"
        }
      ).addTo(mymap);
    },

    displayCity: function (currentCity) {
      console.log(domElements.currentLocation, currentCity);
      domElements.currentLocation.textContent = currentCity;
      domElements.currentWeatherLocation.textContent = currentCity;
    },

    // }
    updateWeather: function (forecast) {
      const weatherHours = [...domElements.weatherHours];
      Object.keys(forecast).forEach(key => {
        const weatherHour = weatherHours.find(weatherHour => {
          return weatherHour.classList.contains(`weather-hour-${key}`);
        });
        weatherHour.nextElementSibling.querySelector(
          ".weather-temperature"
        ).innerHTML = `${forecast[key]}&deg;c`;
      });
    },

    translateWeather: function (weatherDescription) {
      switch (weatherDescription) {
        case "Thunderstorm":
          return "Burza";
        case "Drizzle":
          return "Mżawka";
        case "Rain":
          return "Opady deszczu";
        case "Snow":
          return "Opady śniegu";
        case "Clear":
          return "Czyste niebo";
        case "Clouds":
          return "Zachmurzenie";
        case "Mist":
          return "Mgła";
      }
    },

    chooseNightOrDay: function () {
      let hour = new Date().getHours();

      if (hour < 20 && hour > 6) {
        return "day";
      } else {
        return "night";
      }
    },

    updateActualWeather: function (currentWeather, weatherDescription) {

      let polishWeatherDescription = this.translateWeather(weatherDescription);
      console.log(polishWeatherDescription);
      domElements.currentTemperature.innerHTML = `${currentWeather}&deg;c`;
      domElements.currentTemperatureDescription.innerHTML = polishWeatherDescription;

      domElements.currentTemperatureDescriptionIcon.src = `img/weather-icons/${this.chooseNightOrDay()}/${weatherDescription}.png`;

      domElements.currentDayIcon.src = `img/weather-icons/${this.chooseNightOrDay()}/${weatherDescription}.png`;


      const sunnyIcon = L.icon({
        iconUrl: "img/app-icons/location.png",
        iconSize: [70, 100],
        iconAnchor: [22, 94]
      });
      L.marker([51.936619, 15.508690], {
        icon: sunnyIcon
      }).addTo(map);

      currentWeatherDescription = weatherDescription;
    }
  };
})();