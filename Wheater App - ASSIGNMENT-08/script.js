const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const locationButton = document.getElementById("locationBtn");
const statusMessage = document.getElementById("statusMessage");
const searchButton = searchForm.querySelector("button");
const currentCard = document.getElementById("currentCard");
const forecastList = document.getElementById("forecastList");

let activeRequest = 0;

const weatherDescriptions = {
  0: { label: "Clear sky", icon: "☀", theme: "clear" },
  1: { label: "Mainly clear", icon: "🌤", theme: "clear" },
  2: { label: "Partly cloudy", icon: "⛅", theme: "cloudy" },
  3: { label: "Overcast", icon: "☁", theme: "cloudy" },
  45: { label: "Fog", icon: "〰", theme: "cloudy" },
  48: { label: "Depositing rime fog", icon: "〰", theme: "cloudy" },
  51: { label: "Light drizzle", icon: "🌦", theme: "rain" },
  53: { label: "Drizzle", icon: "🌦", theme: "rain" },
  55: { label: "Dense drizzle", icon: "🌧", theme: "rain" },
  56: { label: "Light freezing drizzle", icon: "🌧", theme: "rain" },
  57: { label: "Freezing drizzle", icon: "🌧", theme: "rain" },
  61: { label: "Light rain", icon: "🌦", theme: "rain" },
  63: { label: "Rain", icon: "🌧", theme: "rain" },
  65: { label: "Heavy rain", icon: "🌧", theme: "rain" },
  66: { label: "Light freezing rain", icon: "🌧", theme: "rain" },
  67: { label: "Freezing rain", icon: "🌧", theme: "rain" },
  71: { label: "Light snow", icon: "🌨", theme: "snow" },
  73: { label: "Snow", icon: "❄", theme: "snow" },
  75: { label: "Heavy snow", icon: "❄", theme: "snow" },
  77: { label: "Snow grains", icon: "❄", theme: "snow" },
  80: { label: "Light rain showers", icon: "🌦", theme: "rain" },
  81: { label: "Rain showers", icon: "🌧", theme: "rain" },
  82: { label: "Violent rain showers", icon: "🌧", theme: "rain" },
  85: { label: "Snow showers", icon: "🌨", theme: "snow" },
  86: { label: "Heavy snow showers", icon: "❄", theme: "snow" },
  95: { label: "Thunderstorm", icon: "⛈", theme: "storm" },
  96: { label: "Thunderstorm with hail", icon: "⛈", theme: "storm" },
  99: { label: "Heavy thunderstorm with hail", icon: "⛈", theme: "storm" },
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (city) {
    searchCity(city);
  }
});

document.querySelectorAll(".city-chip").forEach((button) => {
  button.addEventListener("click", () => {
    cityInput.value = button.dataset.city;
    searchCity(button.dataset.city);
  });
});

locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    setStatus("Location is not supported by this browser.", true);
    return;
  }

  const requestId = startRequest("Finding your location...");
  navigator.geolocation.getCurrentPosition(
    async ({ coords }) => {
      try {
        const place = await reverseGeocode(coords.latitude, coords.longitude);
        await loadWeather(coords.latitude, coords.longitude, place, requestId);
      } catch (error) {
        finishRequest(requestId, error.message);
      }
    },
    (error) => {
      const message = error.code === error.PERMISSION_DENIED
        ? "Location permission was denied. You can search for a city instead."
        : "Couldn't get your location. Please try again or search for a city.";
      finishRequest(requestId, message);
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
  );
});

async function searchCity(city) {
  const requestId = startRequest(`Looking up ${city}...`);

  try {
    const params = new URLSearchParams({
      name: city,
      count: "1",
      language: "en",
      format: "json",
    });
    const result = await requestJson(`${GEOCODING_URL}?${params}`);
    const place = result.results && result.results[0];

    if (!place) {
      throw new Error(`Couldn't find "${city}". Check the spelling and try again.`);
    }

    await loadWeather(place.latitude, place.longitude, place, requestId, city);
  } catch (error) {
    finishRequest(requestId, error.message);
  }
}

async function reverseGeocode(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    count: "1",
    language: "en",
    format: "json",
  });
  const result = await requestJson(`${GEOCODING_URL}?${params}`);
  const place = result.results && result.results[0];

  if (!place) {
    return { name: "Your location", country: "" };
  }

  return place;
}

async function loadWeather(latitude, longitude, place, requestId, searchName) {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "is_day",
      "weather_code",
      "wind_speed_10m",
      "surface_pressure",
    ].join(","),
    daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset",
    forecast_days: "5",
    timezone: "auto",
  });

  try {
    const data = await requestJson(`${WEATHER_URL}?${params}`);

    if (requestId !== activeRequest) {
      return;
    }

    displayWeather(data, place);
    localStorage.setItem("lastCity", searchName || place.name);
    finishRequest(requestId, "");
  } catch (error) {
    finishRequest(requestId, error.message);
  }
}

async function requestJson(url) {
  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error("Couldn't connect to the weather service. Check your internet connection.");
  }

  if (!response.ok) {
    throw new Error(`Weather service error (${response.status}). Please try again in a moment.`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.reason || "The weather service couldn't complete this request.");
  }

  return data;
}

function displayWeather(data, place) {
  const current = data.current;
  const weather = getWeatherDescription(current.weather_code, current.is_day);
  const city = place.name || "Your location";
  const region = place.admin1 && place.admin1 !== city ? `${place.admin1}, ` : "";

  document.getElementById("locationLabel").textContent = `${region}${place.country || ""}`.toUpperCase() || "LOCAL WEATHER";
  document.getElementById("cityName").textContent = city;
  document.getElementById("countryName").textContent = place.country || "Current location";
  document.getElementById("temperature").textContent = `${Math.round(current.temperature_2m)}°`;
  document.getElementById("currentIcon").textContent = weather.icon;
  document.getElementById("condition").textContent = weather.label;
  document.getElementById("feelsLike").textContent = `${Math.round(current.apparent_temperature)}°`;
  document.getElementById("humidity").innerHTML = `${Math.round(current.relative_humidity_2m)}<span>%</span>`;
  document.getElementById("wind").innerHTML = `${Math.round(current.wind_speed_10m)}<span> km/h</span>`;
  document.getElementById("pressure").innerHTML = `${Math.round(current.surface_pressure)}<span> hPa</span>`;
  document.getElementById("sunrise").textContent = formatLocalTime(data.daily.sunrise[0]);
  document.getElementById("sunset").textContent = formatLocalTime(data.daily.sunset[0]);
  document.getElementById("localTime").textContent = `${formatLocalTime(data.current.time)} local`;
  currentCard.dataset.weather = weather.theme;
  currentCard.dataset.time = current.is_day ? "day" : "night";

  renderForecast(data.daily);
}

function renderForecast(daily) {
  forecastList.replaceChildren();

  daily.time.forEach((date, index) => {
    const weather = getWeatherDescription(daily.weather_code[index]);
    const day = document.createElement("article");
    day.className = "forecast-day";

    const name = document.createElement("p");
    name.className = "forecast-day-name";
    name.textContent = index === 0
      ? "Today"
      : new Date(`${date}T12:00:00`).toLocaleDateString("en", { weekday: "short" });

    const icon = document.createElement("span");
    icon.className = "forecast-icon";
    icon.setAttribute("aria-label", weather.label);
    icon.textContent = weather.icon;

    const range = document.createElement("p");
    range.className = "forecast-temperatures";
    range.innerHTML = `<strong>${Math.round(daily.temperature_2m_max[index])}°</strong><span>${Math.round(daily.temperature_2m_min[index])}°</span>`;

    day.append(name, icon, range);
    forecastList.append(day);
  });
}

function getWeatherDescription(code, isDay) {
  const weather = weatherDescriptions[code] || { label: "Conditions unavailable", icon: "☁", theme: "cloudy" };

  if (isDay === 0 && code === 0) {
    return { ...weather, icon: "☾" };
  }

  if (isDay === 0 && code === 1) {
    return { ...weather, icon: "☾" };
  }

  return weather;
}

function formatLocalTime(value) {
  return value && value.includes("T") ? value.split("T")[1].slice(0, 5) : "--:--";
}

function startRequest(message) {
  activeRequest += 1;
  searchButton.disabled = true;
  locationButton.disabled = true;
  setStatus(message, false);
  return activeRequest;
}

function finishRequest(requestId, message) {
  if (requestId !== activeRequest) {
    return;
  }

  searchButton.disabled = false;
  locationButton.disabled = false;
  setStatus(message, Boolean(message));
}

function setStatus(message, isError) {
  statusMessage.textContent = message;
  statusMessage.classList.toggle("is-error", isError);
}

const savedCity = localStorage.getItem("lastCity") || "Karachi";
cityInput.value = savedCity;
searchCity(savedCity);
