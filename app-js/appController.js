const appController = (function (modelCtrl, viewCtrl) {

    //-----------------zmienne i funkcje prywatne (pomocnicze)-----------------------

    let domElements = appView.getDomElements();


    //tu umieszczamy obserwator zdarzeń
    function setupEventListeners() {
        let startX, startY, distance;
        domElements.applicationWidget.addEventListener("touchstart", (event) => {
            var touchObject = event.changedTouches[0];
            startX = touchObject.pageX;
            startY = touchObject.pageY;
        });

        domElements.applicationWidget.addEventListener("touchend", (event) => {
            var touchObject = event.changedTouches[0];
            distance = touchObject.pageX - startX;

            if (distance > 150) {
                domElements.appCalendar.classList.toggle("app-calendar-active");
                domElements.rightWhiteButton.classList.toggle("right-white-button-moved");
            }
            if (distance < -150) {
                domElements.appMap.classList.toggle("app-map-active");
                domElements.leftWhiteButton.classList.toggle("left-white-button-moved");
            }
        });

        domElements.appCalendar.addEventListener("touchstart", (event) => {
            var touchObject = event.changedTouches[0];
            startX = touchObject.pageX;
            startY = touchObject.pageY;
        });

        domElements.appCalendar.addEventListener("touchend", (event) => {

            var touchObject = event.changedTouches[0];
            distance = touchObject.pageX - startX;

            if (distance < -150) {
                domElements.appCalendar.classList.toggle("app-calendar-active");
            }
        });

        domElements.appMap.addEventListener("touchstart", (event) => {
            var touchObject = event.changedTouches[0];
            startX = touchObject.pageX;
            startY = touchObject.pageY;
        });

        domElements.appMap.addEventListener("touchend", (event) => {

            var touchObject = event.changedTouches[0];
            distance = touchObject.pageX - startX;

            if (distance > 150) {
                domElements.appMap.classList.toggle("app-map-active");
            }
        });


        //obserwator dla przycisku "wstecz" kalendarza
        domElements.leftButton.addEventListener("click", () => {
            let {
                selectedMonthIndex,
                selectedYearIndex
            } = getSelectedInputs();

            viewCtrl.selectPreviousMonth(
                domElements.monthInputOptions,
                selectedMonthIndex
            );

            viewCtrl.clearCalendar();
            generateCalendar(
                domElements.yearInputOptions[selectedYearIndex].value,
                selectedMonthIndex - 1
            );

        });

        //obserwator dla przycisku "następny" kalendarza
        domElements.rightButton.addEventListener("click", () => {

            let {
                selectedMonthIndex,
                selectedYearIndex
            } = getSelectedInputs();

            viewCtrl.selectNextMonth(
                domElements.monthInputOptions,
                selectedMonthIndex
            );

            viewCtrl.clearCalendar();
            generateCalendar(
                domElements.yearInput[selectedYearIndex].value,
                selectedMonthIndex + 1
            );

        });

        //obserwator dla zmiany w inpucie z miesiącami
        domElements.monthInput.addEventListener("change", () => {

            let {
                selectedMonthIndex,
                selectedYearIndex
            } = getSelectedInputs();

            viewCtrl.clearCalendar();
            generateCalendar(
                domElements.yearInput[selectedYearIndex].value,
                selectedMonthIndex
            );
        });

        //obserwator dla zmiany w inpucie z latami
        domElements.yearInput.addEventListener("change", () => {

            let {
                selectedMonthIndex,
                selectedYearIndex
            } = getSelectedInputs();

            viewCtrl.clearCalendar();
            generateCalendar(
                domElements.yearInput[selectedYearIndex].value,
                selectedMonthIndex
            );
        });
        //obserwator dla zmiany szerokości okna (funkcja wyłącznie do celów prezentacyjnych)
        window.addEventListener("resize", () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);

            //przy poszerzeniu usuń mobile buttony i dodaj weather nutton
            if (
                domElements.calendarButton &&
                domElements.mapButton &&
                window.innerWidth > 600
            ) {
                viewCtrl.removeMobileNavigationButtons();
            }
            //przy zwężeniu okna jeśli nie ma mobile buttonów
            if (
                !domElements.calendarButton &&
                !domElements.mapButton &&
                window.innerWidth <= 600
            ) {
                //usun forecast button jeśli istnieje
                if (domElements.detailedForecastButton) {
                    viewCtrl.removeForecastButton();
                }
                appView.addMobileNavigationButtons();
                generateEventListener(
                    "click",
                    domElements.calendarButton,
                    calendarButtonEvent
                );
                generateEventListener("click", domElements.mapButton, mapButtonEvent);
                generateEventListener(
                    "click",
                    domElements.leftWhiteButton,
                    leftWhiteButtonEvent
                );
                generateEventListener(
                    "click",
                    domElements.rightWhiteButton,
                    rightWhiteButtonEvent
                );
            }

            if (
                !domElements.detailedForecastButton &&
                window.innerWidth > 600 && window.innerHeight < 950
            ) {
                viewCtrl.addDetailedForecastButton();
                generateEventForDetailedWeatheButton();
            }
            if (
                domElements.detailedForecastButton &&
                window.innerWidth > 600 && window.innerHeight > 950
            ) {
                viewCtrl.removeForecastButton();

            }
        });

        //obserwator dla pola odblokuj, zablokuj (checkbox)
        // domElements.hiddenCheckbox.addEventListener("change", () => {
        //     if (domElements.hiddenCheckbox.checked) {
        //         domElements.sliderLabel.innerHTML = "odblokuj"
        //     } else {
        //         domElements.sliderLabel.innerHTML = "zablokuj"
        //     }
        // });
    }

    function generateEventListener(eventType, element, callback) {
        element.addEventListener(eventType, callback);
    }

    function calendarButtonEvent() {
        domElements.appCalendar.classList.toggle("app-calendar-active");
        domElements.rightWhiteButton.classList.toggle("right-white-button-moved");
    }

    function mapButtonEvent() {
        domElements.appMap.classList.toggle("app-map-active");
        domElements.leftWhiteButton.classList.toggle("left-white-button-moved");
    }

    function leftWhiteButtonEvent() {
        domElements.appMap.classList.toggle("app-map-active");
    }

    function rightWhiteButtonEvent() {
        domElements.appCalendar.classList.toggle("app-calendar-active");
    }

    function detailedForecastButtonEvent() {
        let url = domElements.detailedForecastButtonImg.getAttribute("src");

        domElements.detailedForecastButtonImg.src = url == "img/app-icons/dc-up.png" ? "img/app-icons/dc-down.png" : "img/app-icons/dc-up.png";

        domElements.detailedForecastContainer.classList.toggle("detailed-forecast-container-active");
        domElements.detailedForecastButton.classList.toggle("deatiled-forecast-button-active");


    }

    //funkcja pomocnicza do wyciągania numerów indeksów opcji z inputów miesiąc i rok
    function getSelectedInputs() {

        return {
            selectedMonthIndex: viewCtrl.findSelectedInput(
                domElements.monthInputOptions
            ),
            selectedYearIndex: viewCtrl.findSelectedInput(
                domElements.yearInputOptions
            )
        };

    }

    function buttonEventFunction(event) {
        let appContainer;
        //usuwa domyślne działanie przycisku - odświeżenie strony
        event.preventDefault();
        //pobiera nazwę użytkownika
        let userName = viewCtrl.getUserName();
        //zapisuje nazwę użytkownika do localStorage
        modelCtrl.saveUserName(userName);
        //ukrywa okno logowania
        viewCtrl.getDomElement("loginContainer").classList.toggle("login-container-hidden");
        //usuwa okno logowania z DOM
        setTimeout(viewCtrl.deleteLogin, 1000);
        //wyświetla nazwę użytkownika w aplikacji
        viewCtrl.setUserName(userName);
        //"odkrywa" całą aplikację
        appContainer = viewCtrl.getDomElement("applicationWrapper");
        appContainer.classList.toggle("app-wrapper-hidden");
    }

    function displayLogin() {
        let button, appContainer;

        //wyświetla okno logowania
        viewCtrl.displayLogin();

        //ukrywa aplikację (poza oknem logowania)
        appContainer = viewCtrl.getDomElement("applicationWrapper");
        appContainer.classList.toggle("app-wrapper-hidden");

        //ustawia zdarzenie dla przycisku logowania
        button = viewCtrl.getDomElement("loginButton");
        button.addEventListener("click", buttonEventFunction);
    }

    function generateCalendar(year, month) {

        viewCtrl.createCalendar(year, month);
        let availableForecastDays = viewCtrl.fillCalendar(year, month);
        return availableForecastDays;
    }

    function generateEventListenersForMobileButtons() {
        generateEventListener(
            "click",
            domElements.calendarButton,
            calendarButtonEvent
        );
        generateEventListener("click", domElements.mapButton, mapButtonEvent);
        generateEventListener(
            "click",
            domElements.leftWhiteButton,
            leftWhiteButtonEvent
        );
        generateEventListener(
            "click",
            domElements.rightWhiteButton,
            rightWhiteButtonEvent
        );
    }

    function generateEventForDetailedWeatheButton() {
        generateEventListener(
            "click",
            domElements.detailedForecastButton,
            detailedForecastButtonEvent
        );
    }




    // function generetaEventsForAvailableDays(availableForecastDays) {

    //     for (let object of availableForecastDays) {
    //         generateEventListener("click", object, eventWatherDisplay);
    //     }
    // }

    // function eventWatherDisplay() {
    //     console.log("YUP");
    // }

    async function generateTodayForecast() {
        const weatherList = await modelCtrl.getWeatherList();
        const today = new Date().toLocaleDateString()
        console.log(weatherList[today]);
        viewCtrl.updateWeather(weatherList[today])
    }

    async function generateCurrentWeather() {

        //temperatura
        const currentWeather = await modelCtrl.getWeatherTemperature()
        //opis pogody
        const weatherDescription = await modelCtrl.getWeatherDescription()
        viewCtrl.updateActualWeather(currentWeather, weatherDescription)
    }

    function setHeight() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    async function setMapPosition() {
        await modelCtrl.setCurrentPosition();
        let [latitude, longitude] = modelCtrl.getPosition();
        await viewCtrl.launchMap(latitude, longitude);
        setCityName();
    }

    async function setCityName() {
        let cityName = await modelCtrl.getCity();
        viewCtrl.displayCity(cityName);
    }

    return {
        init: function () {
            setHeight();
            //sprawdza czy uytkownik jest nowy
            if (!modelCtrl.isNewUser()) {
                displayLogin();
            }
            if (viewCtrl.addMobileNavigationButtons()) {
                generateEventListenersForMobileButtons();
            }
            if (viewCtrl.addDetailedForecastButton()) {
                generateEventForDetailedWeatheButton();
            }

            setupEventListeners();
            let year = new Date().getFullYear(),
                month = new Date().getMonth();
            appView.fillCalendarInputs(year, month);

            // let availableForecastDays = generateCalendar(year, month);


            // generetaEventsForAvailableDays(availableForecastDays);

            generateTodayForecast();

            generateCurrentWeather()

            generateCalendar(year, month);

            setMapPosition();

            viewCtrl.setUserName(modelCtrl.isNewUser());

            viewCtrl.displayDate();



        }
    };
})(appModel, appView);

appController.init();