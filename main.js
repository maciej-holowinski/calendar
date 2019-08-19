!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){"use strict";n.r(t);const a=function(){let e,t,n,a,r,o,i,c;const l=273.15;let s=[],u=[],d=[];return new class{constructor(){this.initializeModel()}async initializeModel(){await this.setCurrentPosition(),await this.fetch5DaysForecast(),await this.fetchCurrentWeather()}isNewUser(){return localStorage.getItem("username")}saveUserName(e){localStorage.setItem("username",e)}setCurrentPosition(){return new Promise((n,a)=>{e=null,t=null,new Promise(function(e,t){navigator.geolocation.getCurrentPosition(e,t)}).then(a=>{e=a.coords.latitude,t=a.coords.longitude,n()}).catch(e=>{console.error(e.message),a()})})}getPosition(){return[e,t]}getCity(){return fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}&zoom=10&addressdetails=1`).then(e=>e.json()).then(e=>(c=e.address.city,e.address.city)).catch(e=>(console.log(e),e))}getWeatherHourly(e,t){return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${t}&lon=${e}&appid=bb5707b9a02b5c08635c421eed9e2690`).then(e=>e.json()).catch(e=>console.error(e))}getCurrentWeather(e,t){return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${t}&lon=${e}&appid=bb5707b9a02b5c08635c421eed9e2690`).then(e=>e.json()).catch(e=>console.error(e))}async fetchCurrentWeather(){r=await this.getCurrentWeather(t,e),o=(r.main.temp-l).toFixed(),i=r.weather[0].main,u.forEach(e=>e(o,i))}async fetch5DaysForecast(){n=await this.getWeatherHourly(t,e),a=n.list.reduce((e,t)=>{const n=new Date(t.dt_txt),a=n.toLocaleDateString();return{...e,[a]:{...e[a],[n.getHours()]:(t.main.temp-l).toFixed()}}},{}),localStorage.setItem("weather",JSON.stringify(a)),s.forEach(e=>e(a)),s=[]}async getWeatherTemperature(){if(o)return o;{const e=new Promise(e=>{u.push(t=>e(t))});return await e}}async getWeatherDescription(){if(i)return i;{const e=new Promise(e=>{d.push(t=>e(t))});return await e}}async getWeatherList(){if(a)return a;{const e=new Promise(e=>{s.push(t=>e(t))});return await e}}}}(),r=function(){const e={applicationWrapper:document.querySelector(".app-wrapper"),locationContainer:document.querySelector(".location-container"),applicationWidget:document.querySelector(".app-widget"),appCalendar:document.querySelector(".app-calendar"),appMap:document.querySelector(".app-map"),displayedUserNamer:document.querySelector(".username"),buttonsContainer:document.querySelector(".buttons-container"),monthInput:document.querySelector(".month-select"),yearInput:document.querySelector(".year-select"),monthInputOptions:document.querySelectorAll(".month-option"),yearInputOptions:document.querySelectorAll(".year-option"),calendar:document.querySelector(".calendar"),leftButton:document.querySelector(".left-button"),rightButton:document.querySelector(".right-button"),locationSlider:document.querySelector(".slider"),currentLocation:document.querySelector(".location-current"),hiddenCheckbox:document.querySelector(".hiddenBox"),sliderLabel:document.querySelector(".slider-label"),currentWeatherLocation:document.querySelector(".current-weather-location"),headerContainer:document.querySelector(".header-container"),detailedForecastContainer:document.querySelector(".detailed-forecast-container"),weatherHours:document.querySelectorAll(".weather-hour"),currentTemperature:document.querySelector(".current-temperature"),dayDescription:document.querySelector(".day-description"),currentTemperatureDescription:document.querySelector(".current-weather-description"),currentTemperatureDescriptionIcon:document.querySelector(".current-weather-description-icon")};let t,n;function a(e,t,n){let a=document.createElement(t);return e.appendChild(a),n&&(a.className=n),a}function r(e,t){let n,a;return{firstDayOfMonth:0==(a=(n=new Date(e,t)).getDay())?7:a,daysInMonth:new Date(e,t+1,0).getDate()}}return{getDomElements:function(){return e},displayLogin:function(){let t,n;t=a(document.body,"div","login-container"),e.loginContainer=t,t=a(t,"div","login-box"),(n=a(t,"span","credits-text")).textContent="JS Mafia przedstawia",(n=a(t,"img","white-logo")).setAttribute("src","img/logos/logo-white.png"),n.setAttribute("alt","app logo"),t=a(t,"form","login-form"),(n=a(t,"span","login-text")).textContent="podaj swoje imię:",(n=a(t,"input","login-input")).setAttribute("type","text"),n.setAttribute("name","imie"),e.loginInput=n,(n=a(t,"button","login-button")).textContent="Zaloguj",e.loginButton=n},deleteLogin:function(){e.loginContainer.innerHTML="",e.loginContainer.parentNode.removeChild(e.loginContainer)},addDetailedForecastButton:function(){let t,n,r,o;return n=window.innerWidth,r=window.innerHeight,n>600&&r<950&&(t=a(e.headerContainer,"button","deatiled-forecast-button"),(o=a(t,"img","deatiled-forecast-button-img")).src="img/app-icons/dc-up.png",e.detailedForecastButton=t,e.detailedForecastButtonImg=o,!0)},addMobileNavigationButtons:function(){let t,n,r,o,i,c,l,s,u;return(t=window.innerWidth)<=600&&(n=a(e.headerContainer,"button","calendar-button"),(o=a(n,"img","calendar-button-img")).src="img/app-icons/calendar.png",r=a(e.headerContainer,"button","map-button"),(i=a(r,"img","map-button-img")).src="img/app-icons/map.png",s=a(e.appMap,"button","left-white-button"),(c=a(s,"img","left-white-button-img")).src="img/app-icons/right-white.png",u=a(e.appCalendar,"button","right-white-button"),(l=a(u,"img","right-white-button-img")).src="img/app-icons/left-white.png",e.calendarButton=n,e.mapButton=r,e.leftWhiteButton=s,e.rightWhiteButton=u,!0)},removeForecastButton:function(){e.detailedForecastButton.parentElement.removeChild(e.detailedForecastButton),e.detailedForecastButton=null},removeMobileNavigationButtons:function(){e.calendarButton.parentElement.removeChild(e.calendarButton),e.mapButton.parentElement.removeChild(e.mapButton),e.leftWhiteButton.parentElement.removeChild(e.leftWhiteButton),e.rightWhiteButton.parentElement.removeChild(e.rightWhiteButton),e.calendarButton=null,e.mapButton=null,e.leftWhiteButton=null,e.rightWhiteButton=null},getUserName:function(){return e.loginInput.value},getDomElement:function(t){return e[t]},setUserName:function(t){e.displayedUserNamer.textContent=t},createCalendar:function(t,n){let a,o,i=0,{firstDayOfMonth:c,daysInMonth:l}=r(t,n);for(var s=0;s<l+c-1;s++)0==i&&((a=document.createElement("div")).classList.add("calendar-row"),e.calendar.appendChild(a)),(o=document.createElement("div")).classList.add("calendar-cell"),a.appendChild(o),++i>6&&(i=0);e.calendarRows=document.querySelectorAll(".calendar-row")},fillCalendar:function(n,a){let o,i,c,l,s;e.calendarDays=document.querySelectorAll(".calendar-cell");let{firstDayOfMonth:u,daysInMonth:d}=r(n,a);l=(c=new Date).getMonth(),s=c.getFullYear(),i=(new Date).getDate(),o=1;for(let r=u-1;r<d+u-1;r++)l==a&&s==n&&o==i?(e.calendarDays[r].classList.add("current-day"),e.currentDayIcon=document.createElement("img"),e.currentDayIcon.classList.add("available-day-icon"),t&&(e.currentDayIcon.src=`img/weather-icons/${this.chooseNightOrDay()}/${t}.png`),e.calendarDays[r].textContent=o,e.calendarDays[r].appendChild(e.currentDayIcon)):e.calendarDays[r].textContent=o,o++},clearCalendar:function(){for(let t=0;t<e.calendarRows.length;t++){for(;e.calendarRows[t].firstChild;)e.calendarRows[t].removeChild(e.calendarRows[t].firstChild);e.calendarRows[t].parentElement.removeChild(e.calendarRows[t])}},fillCalendarInputs:function(t,n){e.monthInputOptions[n].selected=!0,Array.from(e.yearInputOptions).find(e=>e.value==t).selected=!0},findSelectedInput:function(e){return Array.from(e).findIndex(e=>e.selected)},selectPreviousMonth:function(t,n){if(0!=n)t[n-1].selected=!0;else{t[11].selected=!0;let n=this.findSelectedInput(e.yearInputOptions);e.yearInputOptions[n-1].selected=!0}},selectNextMonth:function(t,n){if(11!=n)t[n+1].selected=!0;else{t[0].selected=!0;let n=this.findSelectedInput(e.yearInputOptions);e.yearInput[n+1].selected=!0}},displayDate:function(){let t,n;const a=(t=new Date).getDay(),r=t.getFullYear(),o=t.getMonth(),i=t.getDate();let c=["niedziela","poniedziałek","wtorek","środa","czwartek","piątek","sobota"],l=["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"];c=c.map(e=>e.replace(e[0],e[0].toUpperCase())),l=l.map(e=>e.replace(e[0],e[0].toUpperCase())),n=`${c[a]}, ${i} ${l[o]} ${r}`,e.dayDescription.innerHTML=n},launchMap:function(e,t){let a=L.map("map-container").setView([e,t],13);const r=L.icon({iconUrl:"img/app-icons/location.png",iconSize:[48,48],iconAnchor:[22,94]});L.marker([e,t],{icon:r}).addTo(a),n=a,L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYW51cmFkaXMiLCJhIjoiY2p5eThvNGdoMTk3eDNibXBmdjlxaTN0dSJ9.4--qIt8LkGdJrvrNjLHZsA",{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',maxZoom:18,id:"mapbox.streets",accessToken:"your.mapbox.access.token"}).addTo(a)},displayCity:function(t){e.currentLocation.textContent=t,e.currentWeatherLocation.textContent=t},updateWeather:function(t){const n=[...e.weatherHours];Object.keys(t).forEach(e=>{n.find(t=>t.classList.contains(`weather-hour-${e}`)).nextElementSibling.querySelector(".weather-temperature").innerHTML=`${t[e]}&deg;c`}),document.querySelectorAll(".weather-temperature").forEach(e=>{""==e.innerHTML&&(e.innerHTML="N/A")})},translateWeather:function(e){switch(e){case"Thunderstorm":return"Burza";case"Drizzle":return"Mżawka";case"Rain":return"Opady deszczu";case"Snow":return"Opady śniegu";case"Clear":return"Czyste niebo";case"Clouds":return"Zachmurzenie";case"Mist":return"Mgła"}},chooseNightOrDay:function(){let e=(new Date).getHours();return e<20&&e>6?"day":"night"},updateActualWeather:function(n,a){let r=this.translateWeather(a);e.currentTemperature.innerHTML=`${n}&deg;c`,e.currentTemperatureDescription.innerHTML=r,e.currentTemperatureDescriptionIcon.src=`img/weather-icons/${this.chooseNightOrDay()}/${a}.png`,e.currentDayIcon.src=`img/weather-icons/${this.chooseNightOrDay()}/${a}.png`,t=a}}}();(function(e,t){let n=r.getDomElements();function a(e,t,n){t.addEventListener(e,n)}function o(){n.appCalendar.classList.toggle("app-calendar-active"),n.rightWhiteButton.classList.toggle("right-white-button-moved")}function i(){n.appMap.classList.toggle("app-map-active"),n.leftWhiteButton.classList.toggle("left-white-button-moved")}function c(){n.appMap.classList.toggle("app-map-active")}function l(){n.appCalendar.classList.toggle("app-calendar-active")}function s(){let e=n.detailedForecastButtonImg.getAttribute("src");n.detailedForecastButtonImg.src="img/app-icons/dc-up.png"==e?"img/app-icons/dc-down.png":"img/app-icons/dc-up.png",n.detailedForecastContainer.classList.toggle("detailed-forecast-container-active"),n.detailedForecastButton.classList.toggle("deatiled-forecast-button-active")}function u(){return{selectedMonthIndex:t.findSelectedInput(n.monthInputOptions),selectedYearIndex:t.findSelectedInput(n.yearInputOptions)}}function d(n){let a;n.preventDefault();let r=t.getUserName();e.saveUserName(r),t.getDomElement("loginContainer").classList.toggle("login-container-hidden"),setTimeout(t.deleteLogin,1e3),t.setUserName(r),(a=t.getDomElement("applicationWrapper")).classList.toggle("app-wrapper-hidden")}function p(e,n){return t.createCalendar(e,n),t.fillCalendar(e,n)}function h(){a("click",n.detailedForecastButton,s)}async function g(){await e.setCurrentPosition();let[n,a]=e.getPosition();await t.launchMap(n,a),async function(){let n=await e.getCity();t.displayCity(n)}()}return{init:function(){!function(){let e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`)}(),e.isNewUser()||function(){let e,n;t.displayLogin(),(n=t.getDomElement("applicationWrapper")).classList.toggle("app-wrapper-hidden"),(e=t.getDomElement("loginButton")).addEventListener("click",d)}(),t.addMobileNavigationButtons()&&(a("click",n.calendarButton,o),a("click",n.mapButton,i),a("click",n.leftWhiteButton,c),a("click",n.rightWhiteButton,l)),t.addDetailedForecastButton()&&h(),function(){let e,s,d;n.applicationWidget.addEventListener("touchstart",t=>{var n=t.changedTouches[0];e=n.pageX,s=n.pageY}),n.applicationWidget.addEventListener("touchend",t=>{var a=t.changedTouches[0];(d=a.pageX-e)>150&&(n.appCalendar.classList.toggle("app-calendar-active"),n.rightWhiteButton.classList.toggle("right-white-button-moved")),d<-150&&(n.appMap.classList.toggle("app-map-active"),n.leftWhiteButton.classList.toggle("left-white-button-moved"))}),n.appCalendar.addEventListener("touchstart",t=>{var n=t.changedTouches[0];e=n.pageX,s=n.pageY}),n.appCalendar.addEventListener("touchend",t=>{var a=t.changedTouches[0];(d=a.pageX-e)<-150&&n.appCalendar.classList.toggle("app-calendar-active")}),n.locationContainer.addEventListener("touchstart",t=>{var n=t.changedTouches[0];e=n.pageX,s=n.pageY}),n.locationContainer.addEventListener("touchend",t=>{var a=t.changedTouches[0];(d=a.pageX-e)>150&&n.appMap.classList.toggle("app-map-active")}),n.leftButton.addEventListener("click",()=>{let{selectedMonthIndex:e,selectedYearIndex:a}=u();t.selectPreviousMonth(n.monthInputOptions,e),t.clearCalendar(),p(n.yearInputOptions[a].value,e-1)}),n.rightButton.addEventListener("click",()=>{let{selectedMonthIndex:e,selectedYearIndex:a}=u();t.selectNextMonth(n.monthInputOptions,e),t.clearCalendar(),p(n.yearInput[a].value,e+1)}),n.monthInput.addEventListener("change",()=>{let{selectedMonthIndex:e,selectedYearIndex:a}=u();t.clearCalendar(),p(n.yearInput[a].value,e)}),n.yearInput.addEventListener("change",()=>{let{selectedMonthIndex:e,selectedYearIndex:a}=u();t.clearCalendar(),p(n.yearInput[a].value,e)}),window.addEventListener("resize",()=>{let e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh",`${e}px`),n.calendarButton&&n.mapButton&&window.innerWidth>600&&t.removeMobileNavigationButtons(),!n.calendarButton&&!n.mapButton&&window.innerWidth<=600&&(n.detailedForecastButton&&t.removeForecastButton(),r.addMobileNavigationButtons(),a("click",n.calendarButton,o),a("click",n.mapButton,i),a("click",n.leftWhiteButton,c),a("click",n.rightWhiteButton,l)),!n.detailedForecastButton&&window.innerWidth>600&&window.innerHeight<950&&(t.addDetailedForecastButton(),h()),n.detailedForecastButton&&window.innerWidth>600&&window.innerHeight>950&&t.removeForecastButton()})}();let s=(new Date).getFullYear(),m=(new Date).getMonth();r.fillCalendarInputs(s,m),async function(){const n=await e.getWeatherList(),a=(new Date).toLocaleDateString();t.updateWeather(n[a])}(),async function(){const n=await e.getWeatherTemperature(),a=await e.getWeatherDescription();t.updateActualWeather(n,a)}(),p(s,m),g(),t.setUserName(e.isNewUser()),t.displayDate()}}})(a,r).init()}]);