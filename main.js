/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/date.js":
/*!*****************************!*\
  !*** ./src/modules/date.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const date = (() => {
  const currentDate = new Date();

  function isItDay() {
    if (currentDate.getHours() > 6 && currentDate.getHours() < 18) {
      return true;
    } else {
      return false;
    }
  }

  function currentDayName() {
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dayName = weekdayNames[currentDate.getDay()];

    return dayName;
  }

  function currentDayNumber() {
    const dayNumber = currentDate.getDate();

    return dayNumber;
  }

  function currentMonth() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthName = monthNames[currentDate.getMonth()];

    return monthName;
  }

  return { isItDay, currentDayName, currentDayNumber, currentMonth };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (date);


/***/ }),

/***/ "./src/modules/view.js":
/*!*****************************!*\
  !*** ./src/modules/view.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _date__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./date */ "./src/modules/date.js");


const view = (() => {
  function handleDate() {
    const body = document.querySelector("body");
    const day = document.querySelector("#day");
    const month = document.querySelector("#month");

    if (_date__WEBPACK_IMPORTED_MODULE_0__["default"].isItDay()) {
      body.style.backgroundImage = `linear-gradient(
        to right top,
        #0096c7,
        #14a3cf,
        #26b0d6,
        #37bddd,
        #48cae4
      )`;
    } else {
      body.style.backgroundImage = `linear-gradient(
        to right top,
        #000132,
        #001546,
        #00225c,
        #022f72,
        #023e8a
        )`;
    }

    day.textContent = `${_date__WEBPACK_IMPORTED_MODULE_0__["default"].currentDayName()} ${_date__WEBPACK_IMPORTED_MODULE_0__["default"].currentDayNumber()}`;
    month.textContent = _date__WEBPACK_IMPORTED_MODULE_0__["default"].currentMonth();
  }

  function renderResults(weatherData) {
    if (!weatherData) {
      handleErrorMessage("We can't find any data!");
    } else {
      const searchResult = document.querySelector("#search-results");

      const cityName = document.querySelector("#city-name");
      const icon = document.querySelector("#weather-icon");
      const weatherDescription = document.querySelector("#weather-description");
      const feelsLike = document.querySelector("#feels-like");
      const temperature = document.querySelector("#temperature");
      const maxTemperature = document.querySelector("#max-temperature");
      const minTemperature = document.querySelector("#min-temperature");
      const humidity = document.querySelector("#humidity");
      const wind = document.querySelector("#wind");

      cityName.textContent = `${weatherData.cityName}`;
      icon.src = `./images/${weatherData.icon}.png`;
      weatherDescription.textContent = `${weatherData.weatherDescription}`;
      feelsLike.textContent = `Fells like: ${weatherData.feelsLike}°`;
      temperature.textContent = `${weatherData.temperature}°`;
      maxTemperature.textContent = `Max Temperature: ${weatherData.maxTemperature}°`;
      minTemperature.textContent = `Min Temperature: ${weatherData.minTemperature}°`;
      humidity.textContent = `Humidity: ${weatherData.humidity} %`;
      wind.textContent = `Wind: ${weatherData.windSpeed} km/h`;

      searchResult.style.display = "flex";
    }
  }

  function handleErrorMessage(message) {
    const errorMessageContainer = document.querySelector(
      "#error-message-container"
    );
    const errorMessage = document.querySelector("#error-message");

    errorMessage.textContent = message;
    errorMessageContainer.style.display = "flex";

    setTimeout(() => {
      errorMessageContainer.style.display = "none";
    }, 3000);
  }

  return { renderResults, handleErrorMessage, handleDate };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (view);


/***/ }),

/***/ "./src/modules/weather.js":
/*!********************************!*\
  !*** ./src/modules/weather.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/modules/view.js");


const weather = (() => {
  function convertData(data) {
    const cityName = data.name;
    const icon = data.weather[0].icon;
    const weatherDescription =
      data.weather[0].description.charAt(0).toUpperCase() +
      data.weather[0].description.slice(1);
    const feelsLike = Math.round(data.main.feels_like);
    const temperature = Math.round(data.main.temp);
    const maxTemperature = Math.round(data.main.temp_max);
    const minTemperature = Math.round(data.main.temp_min);
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    return {
      cityName,
      icon,
      weatherDescription,
      feelsLike,
      temperature,
      maxTemperature,
      minTemperature,
      humidity,
      windSpeed,
    };
  }

  async function getData(city) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=7eb45f3d586fd5796793458d6c576e47`;
    try {
      const response = await fetch(endpoint, { mode: "cors" });
      if (!response.ok) throw new Error(`City ${city} not found`);
      const data = convertData(await response.json());
      return data;
    } catch (error) {
      _view__WEBPACK_IMPORTED_MODULE_0__["default"].handleErrorMessage(error);
      return null;
    }
  }
  return { getData };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weather);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_weather__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/weather */ "./src/modules/weather.js");
/* harmony import */ var _modules_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/view */ "./src/modules/view.js");



document.addEventListener("DOMContentLoaded", () => {
  _modules_view__WEBPACK_IMPORTED_MODULE_1__["default"].handleDate();
});

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchBtn.addEventListener("click", async () => {
  if (searchInput.value === "") {
    _modules_view__WEBPACK_IMPORTED_MODULE_1__["default"].handleErrorMessage("You must enter City Name!");
  } else {
    const weatherData = await _modules_weather__WEBPACK_IMPORTED_MODULE_0__["default"].getData(searchInput.value);
    _modules_view__WEBPACK_IMPORTED_MODULE_1__["default"].renderResults(weatherData);
  }
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUNBLENBQUM7QUFDRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy9kYXRlLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvdmlldy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRlID0gKCgpID0+IHtcclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIGZ1bmN0aW9uIGlzSXREYXkoKSB7XHJcbiAgICBpZiAoY3VycmVudERhdGUuZ2V0SG91cnMoKSA+IDYgJiYgY3VycmVudERhdGUuZ2V0SG91cnMoKSA8IDE4KSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3VycmVudERheU5hbWUoKSB7XHJcbiAgICBjb25zdCB3ZWVrZGF5TmFtZXMgPSBbXHJcbiAgICAgIFwiU3VuZGF5XCIsXHJcbiAgICAgIFwiTW9uZGF5XCIsXHJcbiAgICAgIFwiVHVlc2RheVwiLFxyXG4gICAgICBcIldlZG5lc2RheVwiLFxyXG4gICAgICBcIlRodXJzZGF5XCIsXHJcbiAgICAgIFwiRnJpZGF5XCIsXHJcbiAgICAgIFwiU2F0dXJkYXlcIixcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgZGF5TmFtZSA9IHdlZWtkYXlOYW1lc1tjdXJyZW50RGF0ZS5nZXREYXkoKV07XHJcblxyXG4gICAgcmV0dXJuIGRheU5hbWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjdXJyZW50RGF5TnVtYmVyKCkge1xyXG4gICAgY29uc3QgZGF5TnVtYmVyID0gY3VycmVudERhdGUuZ2V0RGF0ZSgpO1xyXG5cclxuICAgIHJldHVybiBkYXlOdW1iZXI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjdXJyZW50TW9udGgoKSB7XHJcbiAgICBjb25zdCBtb250aE5hbWVzID0gW1xyXG4gICAgICBcIkphbnVhcnlcIixcclxuICAgICAgXCJGZWJydWFyeVwiLFxyXG4gICAgICBcIk1hcmNoXCIsXHJcbiAgICAgIFwiQXByaWxcIixcclxuICAgICAgXCJNYXlcIixcclxuICAgICAgXCJKdW5lXCIsXHJcbiAgICAgIFwiSnVseVwiLFxyXG4gICAgICBcIkF1Z3VzdFwiLFxyXG4gICAgICBcIlNlcHRlbWJlclwiLFxyXG4gICAgICBcIk9jdG9iZXJcIixcclxuICAgICAgXCJOb3ZlbWJlclwiLFxyXG4gICAgICBcIkRlY2VtYmVyXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IG1vbnRoTmFtZSA9IG1vbnRoTmFtZXNbY3VycmVudERhdGUuZ2V0TW9udGgoKV07XHJcblxyXG4gICAgcmV0dXJuIG1vbnRoTmFtZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IGlzSXREYXksIGN1cnJlbnREYXlOYW1lLCBjdXJyZW50RGF5TnVtYmVyLCBjdXJyZW50TW9udGggfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGU7XHJcbiIsImltcG9ydCBkYXRlIGZyb20gXCIuL2RhdGVcIjtcclxuXHJcbmNvbnN0IHZpZXcgPSAoKCkgPT4ge1xyXG4gIGZ1bmN0aW9uIGhhbmRsZURhdGUoKSB7XHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICBjb25zdCBkYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RheVwiKTtcclxuICAgIGNvbnN0IG1vbnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb250aFwiKTtcclxuXHJcbiAgICBpZiAoZGF0ZS5pc0l0RGF5KCkpIHtcclxuICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgbGluZWFyLWdyYWRpZW50KFxyXG4gICAgICAgIHRvIHJpZ2h0IHRvcCxcclxuICAgICAgICAjMDA5NmM3LFxyXG4gICAgICAgICMxNGEzY2YsXHJcbiAgICAgICAgIzI2YjBkNixcclxuICAgICAgICAjMzdiZGRkLFxyXG4gICAgICAgICM0OGNhZTRcclxuICAgICAgKWA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGBsaW5lYXItZ3JhZGllbnQoXHJcbiAgICAgICAgdG8gcmlnaHQgdG9wLFxyXG4gICAgICAgICMwMDAxMzIsXHJcbiAgICAgICAgIzAwMTU0NixcclxuICAgICAgICAjMDAyMjVjLFxyXG4gICAgICAgICMwMjJmNzIsXHJcbiAgICAgICAgIzAyM2U4YVxyXG4gICAgICAgIClgO1xyXG4gICAgfVxyXG5cclxuICAgIGRheS50ZXh0Q29udGVudCA9IGAke2RhdGUuY3VycmVudERheU5hbWUoKX0gJHtkYXRlLmN1cnJlbnREYXlOdW1iZXIoKX1gO1xyXG4gICAgbW9udGgudGV4dENvbnRlbnQgPSBkYXRlLmN1cnJlbnRNb250aCgpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVuZGVyUmVzdWx0cyh3ZWF0aGVyRGF0YSkge1xyXG4gICAgaWYgKCF3ZWF0aGVyRGF0YSkge1xyXG4gICAgICBoYW5kbGVFcnJvck1lc3NhZ2UoXCJXZSBjYW4ndCBmaW5kIGFueSBkYXRhIVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoLXJlc3VsdHNcIik7XHJcblxyXG4gICAgICBjb25zdCBjaXR5TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2l0eS1uYW1lXCIpO1xyXG4gICAgICBjb25zdCBpY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWF0aGVyLWljb25cIik7XHJcbiAgICAgIGNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlci1kZXNjcmlwdGlvblwiKTtcclxuICAgICAgY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmZWVscy1saWtlXCIpO1xyXG4gICAgICBjb25zdCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcGVyYXR1cmVcIik7XHJcbiAgICAgIGNvbnN0IG1heFRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYXgtdGVtcGVyYXR1cmVcIik7XHJcbiAgICAgIGNvbnN0IG1pblRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtaW4tdGVtcGVyYXR1cmVcIik7XHJcbiAgICAgIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNodW1pZGl0eVwiKTtcclxuICAgICAgY29uc3Qgd2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2luZFwiKTtcclxuXHJcbiAgICAgIGNpdHlOYW1lLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEuY2l0eU5hbWV9YDtcclxuICAgICAgaWNvbi5zcmMgPSBgLi9pbWFnZXMvJHt3ZWF0aGVyRGF0YS5pY29ufS5wbmdgO1xyXG4gICAgICB3ZWF0aGVyRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS53ZWF0aGVyRGVzY3JpcHRpb259YDtcclxuICAgICAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gYEZlbGxzIGxpa2U6ICR7d2VhdGhlckRhdGEuZmVlbHNMaWtlfcKwYDtcclxuICAgICAgdGVtcGVyYXR1cmUudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyRGF0YS50ZW1wZXJhdHVyZX3CsGA7XHJcbiAgICAgIG1heFRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYE1heCBUZW1wZXJhdHVyZTogJHt3ZWF0aGVyRGF0YS5tYXhUZW1wZXJhdHVyZX3CsGA7XHJcbiAgICAgIG1pblRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYE1pbiBUZW1wZXJhdHVyZTogJHt3ZWF0aGVyRGF0YS5taW5UZW1wZXJhdHVyZX3CsGA7XHJcbiAgICAgIGh1bWlkaXR5LnRleHRDb250ZW50ID0gYEh1bWlkaXR5OiAke3dlYXRoZXJEYXRhLmh1bWlkaXR5fSAlYDtcclxuICAgICAgd2luZC50ZXh0Q29udGVudCA9IGBXaW5kOiAke3dlYXRoZXJEYXRhLndpbmRTcGVlZH0ga20vaGA7XHJcblxyXG4gICAgICBzZWFyY2hSZXN1bHQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IGVycm9yTWVzc2FnZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiI2Vycm9yLW1lc3NhZ2UtY29udGFpbmVyXCJcclxuICAgICk7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Vycm9yLW1lc3NhZ2VcIik7XHJcblxyXG4gICAgZXJyb3JNZXNzYWdlLnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICAgIGVycm9yTWVzc2FnZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGVycm9yTWVzc2FnZUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICB9LCAzMDAwKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHJlbmRlclJlc3VsdHMsIGhhbmRsZUVycm9yTWVzc2FnZSwgaGFuZGxlRGF0ZSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdmlldztcclxuIiwiaW1wb3J0IHZpZXcgZnJvbSBcIi4vdmlld1wiO1xyXG5cclxuY29uc3Qgd2VhdGhlciA9ICgoKSA9PiB7XHJcbiAgZnVuY3Rpb24gY29udmVydERhdGEoZGF0YSkge1xyXG4gICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICBjb25zdCBjaXR5TmFtZSA9IGRhdGEubmFtZTtcclxuICAgIGNvbnN0IGljb24gPSBkYXRhLndlYXRoZXJbMF0uaWNvbjtcclxuICAgIGNvbnN0IHdlYXRoZXJEZXNjcmlwdGlvbiA9XHJcbiAgICAgIGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbi5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXHJcbiAgICAgIGRhdGEud2VhdGhlclswXS5kZXNjcmlwdGlvbi5zbGljZSgxKTtcclxuICAgIGNvbnN0IGZlZWxzTGlrZSA9IE1hdGgucm91bmQoZGF0YS5tYWluLmZlZWxzX2xpa2UpO1xyXG4gICAgY29uc3QgdGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKGRhdGEubWFpbi50ZW1wKTtcclxuICAgIGNvbnN0IG1heFRlbXBlcmF0dXJlID0gTWF0aC5yb3VuZChkYXRhLm1haW4udGVtcF9tYXgpO1xyXG4gICAgY29uc3QgbWluVGVtcGVyYXR1cmUgPSBNYXRoLnJvdW5kKGRhdGEubWFpbi50ZW1wX21pbik7XHJcbiAgICBjb25zdCBodW1pZGl0eSA9IGRhdGEubWFpbi5odW1pZGl0eTtcclxuICAgIGNvbnN0IHdpbmRTcGVlZCA9IGRhdGEud2luZC5zcGVlZDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBjaXR5TmFtZSxcclxuICAgICAgaWNvbixcclxuICAgICAgd2VhdGhlckRlc2NyaXB0aW9uLFxyXG4gICAgICBmZWVsc0xpa2UsXHJcbiAgICAgIHRlbXBlcmF0dXJlLFxyXG4gICAgICBtYXhUZW1wZXJhdHVyZSxcclxuICAgICAgbWluVGVtcGVyYXR1cmUsXHJcbiAgICAgIGh1bWlkaXR5LFxyXG4gICAgICB3aW5kU3BlZWQsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YShjaXR5KSB7XHJcbiAgICBjb25zdCBlbmRwb2ludCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPSR7Y2l0eX0mdW5pdHM9bWV0cmljJmFwcGlkPTdlYjQ1ZjNkNTg2ZmQ1Nzk2NzkzNDU4ZDZjNTc2ZTQ3YDtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZW5kcG9pbnQsIHsgbW9kZTogXCJjb3JzXCIgfSk7XHJcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihgQ2l0eSAke2NpdHl9IG5vdCBmb3VuZGApO1xyXG4gICAgICBjb25zdCBkYXRhID0gY29udmVydERhdGEoYXdhaXQgcmVzcG9uc2UuanNvbigpKTtcclxuICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICB2aWV3LmhhbmRsZUVycm9yTWVzc2FnZShlcnJvcik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4geyBnZXREYXRhIH07XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB3ZWF0aGVyO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB3ZWF0aGVyIGZyb20gXCIuL21vZHVsZXMvd2VhdGhlclwiO1xyXG5pbXBvcnQgdmlldyBmcm9tIFwiLi9tb2R1bGVzL3ZpZXdcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICB2aWV3LmhhbmRsZURhdGUoKTtcclxufSk7XHJcblxyXG5jb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtZm9ybVwiKTtcclxuY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaC1pbnB1dFwiKTtcclxuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYnV0dG9uXCIpO1xyXG5cclxuc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG59KTtcclxuXHJcbnNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xyXG4gIGlmIChzZWFyY2hJbnB1dC52YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgdmlldy5oYW5kbGVFcnJvck1lc3NhZ2UoXCJZb3UgbXVzdCBlbnRlciBDaXR5IE5hbWUhXCIpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHdlYXRoZXIuZ2V0RGF0YShzZWFyY2hJbnB1dC52YWx1ZSk7XHJcbiAgICB2aWV3LnJlbmRlclJlc3VsdHMod2VhdGhlckRhdGEpO1xyXG4gIH1cclxufSk7XHJcblxyXG5jb25zb2xlLmxvZyhuZXcgRGF0ZSgpLmdldEhvdXJzKCkpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
