<template>
  <div class="px-4 pt-20 pb-20 md:px-20">
    <div class="items-center justify-between gap-y-6 py-8 md:flex">
      <div class="text-white">Weather Dashboard</div>

      <WeatherSearcherComponent />
    </div>
    <section>
      <div class="grid grid-cols-1 gap-y-8 xl:grid-cols-3 xl:gap-x-8">
        <div class="space-x-2 rounded-xl border-2 bg-white py-4 lg:col-span-2">
          <div>
            <div class="p-4">
              <h2>
                Forecast in
                <span class="location">{{ route.params.city }}</span>
              </h2>

              <p class="mb-12 text-sm">
                {{
                  new Date(weatherData.currentTime).toLocaleDateString(
                    "en-us",
                    {
                      weekday: "short",
                      day: "2-digit",
                      month: "long",
                    }
                  )
                }}
                {{
                  new Date(weatherData.currentTime).toLocaleTimeString(
                    "en-us",
                    {
                      timeStyle: "short",
                    }
                  )
                }}
              </p>
            </div>

            <section class="grid grid-cols-2 gap-4 px-4">
              <!-- Description -->

              <!-- Weather descr -->
              <div class="col-span-2 rounded-md border-2 p-4 lg:col-span-1">
                <div class="flex h-full flex-col justify-between">
                  <div class="flex items-start justify-between">
                    <div class="temperature">
                      {{ Math.round(weatherData.current.temp) }}&deg;F
                    </div>
                    <div>
                      <div>
                        Max
                        {{ Math.round(weatherData.daily[0].temp.max) }}&deg;F
                      </div>
                      <div>
                        Min
                        {{ Math.round(weatherData.daily[0].temp.max) }}&deg;F
                      </div>
                    </div>
                  </div>
                  <div class="flex items-start justify-between capitalize">
                    <ul>
                      <li>{{ weatherData.current.weather[0].description }}</li>
                      <li>
                        Feels like
                        {{ Math.round(weatherData.current.feels_like) }}&deg;F
                      </li>

                      <li>Poor Visibility</li>
                    </ul>
                    <div>
                      <img
                        class="h-auto w-[100px] items-start"
                        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!-- visibility -->

              <div class="col-span-2 lg:col-span-1">
                <div class="grid gap-4 gap-x-4 px-2 md:grid-cols-2">
                  <div class="rounded-xl border-2 py-2">
                    <ul class="space-y-2 underline underline-offset-8">
                      <li class="flex justify-between px-2">
                        Visibility
                        <div>{{ weatherData.current.feels_like }}Km</div>
                      </li>
                      <li class="flex justify-between px-2">
                        Dew Point
                        <div>{{ weatherData.current.dew_point }}&deg;F</div>
                      </li>
                      <li class="flex justify-between px-2">
                        Wind
                        <div>{{ weatherData.current.wind_gust }}mph</div>
                      </li>
                      <li class="flex justify-between px-2">
                        Humidity
                        <div>{{ weatherData.current.humidity }}%</div>
                      </li>
                      <li class="flex justify-between px-2">
                        Cloudiness
                        <div>{{ weatherData.current.clouds }}%</div>
                      </li>
                    </ul>
                  </div>

                  <div class="rounded-xl border-2">
                    <div class="card-img-overlay space-y-3 text-center">
                      <i class="fa-solid fa-sun"></i>
                      <h3 lass="fw-light">Sunrise</h3>
                      <h2 id="sunrise-time">
                        {{
                          getSunTime(
                            weatherData.current.sunrise,
                            weatherData.timezone_offset
                          )
                        }}
                      </h2>
                      <br />
                      <i class="fa-solid fa-moon"></i>
                      <h3 lass="fw-lighter">Sunset</h3>
                      <h2 id="sunset-time">
                        {{
                          getSunTime(
                            weatherData.current.sunset,
                            weatherData.timezone_offset
                          )
                        }}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section class="overflow-x-auto">
            <div class="my-4 grid grid-flow-col place-items-center px-4">
              <div v-for="day in weatherData.daily" :key="day.dt">
                <div class="flex h-[200px] flex-col justify-between">
                  <div class="block text-center">
                    <p class="flex-1">
                      {{
                        new Date(day.dt * 1000).toLocaleDateString("en-us", {
                          weekday: "long",
                        })
                      }}
                    </p>
                  </div>
                  <div class="block text-center">
                    <img
                      class="h-[50px] w-[50px] object-cover"
                      :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                      alt=""
                    />
                  </div>
                  <div class="block text-center">
                    <div class="flex flex-1 justify-end gap-2 text-xs">
                      <p>{{ Math.round(day.temp.max) }}&deg;F</p>
                      <p>{{ Math.round(day.temp.min) }}&deg;F</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <OtherCities />
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
// import { useWeatherStore } from "../store/store.js";
import { useRoute, useRouter } from "vue-router";
import OtherCities from "./OtherCities.vue";

import WeatherSearcherComponent from "./WeatherSearcherComponent.vue";
const route = useRoute();

// const store = useWeatherStore();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=imperial`
    );

    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    await new Promise((res) => setTimeout(res, 1000));

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const sunrise = new Date(1672143539);
const sunset = new Date(1672176900);

console.log(sunrise.toString());
console.log(sunset.toString());

function getSunTime(weatherDataTime, timezone) {
  const sunTime = new Date(weatherDataTime * 1000);

  sunTime.setHours(sunTime.getHours() + timezone / 3600);

  return sunTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
// axios
//   .get("https://api.openweathermap.org/data/2.5/group", {
//     params: {
//       id: "5128581,2643743,2968815", // comma-separated list of city IDs
//       units: "imperial", // optional, specify temperature units (default is Kelvin)
//       appid: "your-api-key", // your OpenWeatherMap API key
//     },
//   })
//   .then((response) => {
//     const cities = response.data.list; // array of weather data for each city
//     console.log(cities[0].name); // New York
//     console.log(cities[1].name); // London
//     console.log(cities[2].name); // Paris
//   })
//   .catch((error) => {
//     console.error(error);
//   });
</script>
