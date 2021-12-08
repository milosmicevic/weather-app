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
      body.style.backgroundColor = "#0096c7";
    } else {
      body.style.backgroundColor = "#001a26";
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
    console.log(data);
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

console.log(new Date().getHours());

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvdmlldy5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9tb2R1bGVzL3dlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkYXRlID0gKCgpID0+IHtcclxuICBjb25zdCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XHJcblxyXG4gIGZ1bmN0aW9uIGlzSXREYXkoKSB7XHJcbiAgICBpZiAoY3VycmVudERhdGUuZ2V0SG91cnMoKSA+IDYgJiYgY3VycmVudERhdGUuZ2V0SG91cnMoKSA8IDE4KSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3VycmVudERheU5hbWUoKSB7XHJcbiAgICBjb25zdCB3ZWVrZGF5TmFtZXMgPSBbXHJcbiAgICAgIFwiU3VuZGF5XCIsXHJcbiAgICAgIFwiTW9uZGF5XCIsXHJcbiAgICAgIFwiVHVlc2RheVwiLFxyXG4gICAgICBcIldlZG5lc2RheVwiLFxyXG4gICAgICBcIlRodXJzZGF5XCIsXHJcbiAgICAgIFwiRnJpZGF5XCIsXHJcbiAgICAgIFwiU2F0dXJkYXlcIixcclxuICAgIF07XHJcblxyXG4gICAgY29uc3QgZGF5TmFtZSA9IHdlZWtkYXlOYW1lc1tjdXJyZW50RGF0ZS5nZXREYXkoKV07XHJcblxyXG4gICAgcmV0dXJuIGRheU5hbWU7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjdXJyZW50RGF5TnVtYmVyKCkge1xyXG4gICAgY29uc3QgZGF5TnVtYmVyID0gY3VycmVudERhdGUuZ2V0RGF0ZSgpO1xyXG5cclxuICAgIHJldHVybiBkYXlOdW1iZXI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjdXJyZW50TW9udGgoKSB7XHJcbiAgICBjb25zdCBtb250aE5hbWVzID0gW1xyXG4gICAgICBcIkphbnVhcnlcIixcclxuICAgICAgXCJGZWJydWFyeVwiLFxyXG4gICAgICBcIk1hcmNoXCIsXHJcbiAgICAgIFwiQXByaWxcIixcclxuICAgICAgXCJNYXlcIixcclxuICAgICAgXCJKdW5lXCIsXHJcbiAgICAgIFwiSnVseVwiLFxyXG4gICAgICBcIkF1Z3VzdFwiLFxyXG4gICAgICBcIlNlcHRlbWJlclwiLFxyXG4gICAgICBcIk9jdG9iZXJcIixcclxuICAgICAgXCJOb3ZlbWJlclwiLFxyXG4gICAgICBcIkRlY2VtYmVyXCIsXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IG1vbnRoTmFtZSA9IG1vbnRoTmFtZXNbY3VycmVudERhdGUuZ2V0TW9udGgoKV07XHJcblxyXG4gICAgcmV0dXJuIG1vbnRoTmFtZTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IGlzSXREYXksIGN1cnJlbnREYXlOYW1lLCBjdXJyZW50RGF5TnVtYmVyLCBjdXJyZW50TW9udGggfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRhdGU7XHJcbiIsImltcG9ydCBkYXRlIGZyb20gXCIuL2RhdGVcIjtcclxuXHJcbmNvbnN0IHZpZXcgPSAoKCkgPT4ge1xyXG4gIGZ1bmN0aW9uIGhhbmRsZURhdGUoKSB7XHJcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJvZHlcIik7XHJcbiAgICBjb25zdCBkYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RheVwiKTtcclxuICAgIGNvbnN0IG1vbnRoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb250aFwiKTtcclxuXHJcbiAgICBpZiAoZGF0ZS5pc0l0RGF5KCkpIHtcclxuICAgICAgYm9keS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDk2YzdcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGJvZHkuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjMDAxYTI2XCI7XHJcbiAgICB9XHJcbiAgICBkYXkudGV4dENvbnRlbnQgPSBgJHtkYXRlLmN1cnJlbnREYXlOYW1lKCl9ICR7ZGF0ZS5jdXJyZW50RGF5TnVtYmVyKCl9YDtcclxuICAgIG1vbnRoLnRleHRDb250ZW50ID0gZGF0ZS5jdXJyZW50TW9udGgoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlclJlc3VsdHMod2VhdGhlckRhdGEpIHtcclxuICAgIGlmICghd2VhdGhlckRhdGEpIHtcclxuICAgICAgaGFuZGxlRXJyb3JNZXNzYWdlKFwiV2UgY2FuJ3QgZmluZCBhbnkgZGF0YSFcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBzZWFyY2hSZXN1bHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC1yZXN1bHRzXCIpO1xyXG5cclxuICAgICAgY29uc3QgY2l0eU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NpdHktbmFtZVwiKTtcclxuICAgICAgY29uc3QgaWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2VhdGhlci1pY29uXCIpO1xyXG4gICAgICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXItZGVzY3JpcHRpb25cIik7XHJcbiAgICAgIGNvbnN0IGZlZWxzTGlrZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmVlbHMtbGlrZVwiKTtcclxuICAgICAgY29uc3QgdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBlcmF0dXJlXCIpO1xyXG4gICAgICBjb25zdCBtYXhUZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWF4LXRlbXBlcmF0dXJlXCIpO1xyXG4gICAgICBjb25zdCBtaW5UZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWluLXRlbXBlcmF0dXJlXCIpO1xyXG4gICAgICBjb25zdCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjaHVtaWRpdHlcIik7XHJcbiAgICAgIGNvbnN0IHdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dpbmRcIik7XHJcblxyXG4gICAgICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJEYXRhLmNpdHlOYW1lfWA7XHJcbiAgICAgIGljb24uc3JjID0gYC4vaW1hZ2VzLyR7d2VhdGhlckRhdGEuaWNvbn0ucG5nYDtcclxuICAgICAgd2VhdGhlckRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEud2VhdGhlckRlc2NyaXB0aW9ufWA7XHJcbiAgICAgIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGBGZWxscyBsaWtlOiAke3dlYXRoZXJEYXRhLmZlZWxzTGlrZX3CsGA7XHJcbiAgICAgIHRlbXBlcmF0dXJlLnRleHRDb250ZW50ID0gYCR7d2VhdGhlckRhdGEudGVtcGVyYXR1cmV9wrBgO1xyXG4gICAgICBtYXhUZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGBNYXggVGVtcGVyYXR1cmU6ICR7d2VhdGhlckRhdGEubWF4VGVtcGVyYXR1cmV9wrBgO1xyXG4gICAgICBtaW5UZW1wZXJhdHVyZS50ZXh0Q29udGVudCA9IGBNaW4gVGVtcGVyYXR1cmU6ICR7d2VhdGhlckRhdGEubWluVGVtcGVyYXR1cmV9wrBgO1xyXG4gICAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGBIdW1pZGl0eTogJHt3ZWF0aGVyRGF0YS5odW1pZGl0eX0gJWA7XHJcbiAgICAgIHdpbmQudGV4dENvbnRlbnQgPSBgV2luZDogJHt3ZWF0aGVyRGF0YS53aW5kU3BlZWR9IGttL2hgO1xyXG5cclxuICAgICAgc2VhcmNoUmVzdWx0LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBlcnJvck1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBcIiNlcnJvci1tZXNzYWdlLWNvbnRhaW5lclwiXHJcbiAgICApO1xyXG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlcnJvci1tZXNzYWdlXCIpO1xyXG5cclxuICAgIGVycm9yTWVzc2FnZS50ZXh0Q29udGVudCA9IG1lc3NhZ2U7XHJcbiAgICBlcnJvck1lc3NhZ2VDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBlcnJvck1lc3NhZ2VDb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgfSwgMzAwMCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyByZW5kZXJSZXN1bHRzLCBoYW5kbGVFcnJvck1lc3NhZ2UsIGhhbmRsZURhdGUgfTtcclxufSkoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHZpZXc7XHJcbiIsImltcG9ydCB2aWV3IGZyb20gXCIuL3ZpZXdcIjtcclxuXHJcbmNvbnN0IHdlYXRoZXIgPSAoKCkgPT4ge1xyXG4gIGZ1bmN0aW9uIGNvbnZlcnREYXRhKGRhdGEpIHtcclxuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgY29uc3QgY2l0eU5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICBjb25zdCBpY29uID0gZGF0YS53ZWF0aGVyWzBdLmljb247XHJcbiAgICBjb25zdCB3ZWF0aGVyRGVzY3JpcHRpb24gPVxyXG4gICAgICBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24uY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgK1xyXG4gICAgICBkYXRhLndlYXRoZXJbMF0uZGVzY3JpcHRpb24uc2xpY2UoMSk7XHJcbiAgICBjb25zdCBmZWVsc0xpa2UgPSBNYXRoLnJvdW5kKGRhdGEubWFpbi5mZWVsc19saWtlKTtcclxuICAgIGNvbnN0IHRlbXBlcmF0dXJlID0gTWF0aC5yb3VuZChkYXRhLm1haW4udGVtcCk7XHJcbiAgICBjb25zdCBtYXhUZW1wZXJhdHVyZSA9IE1hdGgucm91bmQoZGF0YS5tYWluLnRlbXBfbWF4KTtcclxuICAgIGNvbnN0IG1pblRlbXBlcmF0dXJlID0gTWF0aC5yb3VuZChkYXRhLm1haW4udGVtcF9taW4pO1xyXG4gICAgY29uc3QgaHVtaWRpdHkgPSBkYXRhLm1haW4uaHVtaWRpdHk7XHJcbiAgICBjb25zdCB3aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgY2l0eU5hbWUsXHJcbiAgICAgIGljb24sXHJcbiAgICAgIHdlYXRoZXJEZXNjcmlwdGlvbixcclxuICAgICAgZmVlbHNMaWtlLFxyXG4gICAgICB0ZW1wZXJhdHVyZSxcclxuICAgICAgbWF4VGVtcGVyYXR1cmUsXHJcbiAgICAgIG1pblRlbXBlcmF0dXJlLFxyXG4gICAgICBodW1pZGl0eSxcclxuICAgICAgd2luZFNwZWVkLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGZ1bmN0aW9uIGdldERhdGEoY2l0eSkge1xyXG4gICAgY29uc3QgZW5kcG9pbnQgPSBgaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT0ke2NpdHl9JnVuaXRzPW1ldHJpYyZhcHBpZD03ZWI0NWYzZDU4NmZkNTc5Njc5MzQ1OGQ2YzU3NmU0N2A7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGVuZHBvaW50LCB7IG1vZGU6IFwiY29yc1wiIH0pO1xyXG4gICAgICBpZiAoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoYENpdHkgJHtjaXR5fSBub3QgZm91bmRgKTtcclxuICAgICAgY29uc3QgZGF0YSA9IGNvbnZlcnREYXRhKGF3YWl0IHJlc3BvbnNlLmpzb24oKSk7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgdmlldy5oYW5kbGVFcnJvck1lc3NhZ2UoZXJyb3IpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHsgZ2V0RGF0YSB9O1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgd2VhdGhlcjtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgd2VhdGhlciBmcm9tIFwiLi9tb2R1bGVzL3dlYXRoZXJcIjtcclxuaW1wb3J0IHZpZXcgZnJvbSBcIi4vbW9kdWxlcy92aWV3XCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgdmlldy5oYW5kbGVEYXRlKCk7XHJcbn0pO1xyXG5cclxuY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWZvcm1cIik7XHJcbmNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtaW5wdXRcIik7XHJcbmNvbnN0IHNlYXJjaEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWJ1dHRvblwiKTtcclxuXHJcbnNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxufSk7XHJcblxyXG5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICBpZiAoc2VhcmNoSW5wdXQudmFsdWUgPT09IFwiXCIpIHtcclxuICAgIHZpZXcuaGFuZGxlRXJyb3JNZXNzYWdlKFwiWW91IG11c3QgZW50ZXIgQ2l0eSBOYW1lIVwiKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3Qgd2VhdGhlckRhdGEgPSBhd2FpdCB3ZWF0aGVyLmdldERhdGEoc2VhcmNoSW5wdXQudmFsdWUpO1xyXG4gICAgdmlldy5yZW5kZXJSZXN1bHRzKHdlYXRoZXJEYXRhKTtcclxuICB9XHJcbn0pO1xyXG5cclxuY29uc29sZS5sb2cobmV3IERhdGUoKS5nZXRIb3VycygpKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9