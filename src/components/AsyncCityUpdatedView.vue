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

              <p>Friday, 23 December at 10:27 am</p>
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
                      <div>High 49°F</div>
                      <div>Low 45°F</div>
                    </div>
                  </div>
                  <div class="flex items-start justify-between">
                    <ul>
                      <li>Mist</li>
                      <li>
                        Feels like
                        {{ Math.round(weatherData.current.feels_like) }}&deg;F
                      </li>

                      <li>Poor Visibility</li>
                    </ul>
                    <div>IMG</div>
                  </div>
                </div>
              </div>
              <!-- visibility -->

              <div class="col-span-2 lg:col-span-1">
                <div class="grid gap-4 gap-x-4 px-2 md:grid-cols-2">
                  <div class="rounded-xl border-2">
                    <ul class="space-y-2 underline underline-offset-8">
                      <li>Visibility</li>
                      <li>Dew Point</li>
                      <li>Wind</li>
                      <li>Humidity</li>
                      <li>Cloudiness</li>
                    </ul>
                  </div>

                  <div class="rounded-xl border-2">
                    <div class="card-img-overlay text-center">
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
              <div
                class="w-full w-[130px] rounded-md border-2"
                v-for="(item, id) in 7"
                :key="id"
              >
                <div class="flex h-[200px] flex-col justify-between">
                  <div class="block text-center">Mon{{ item }}</div>
                  <div class="block text-center">IMG</div>
                  <div class="block text-center">
                    <div>56°F</div>
                    <div>56°F</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="rounded-xl bg-white p-5">
          <!-- other cities forecast -->
          <p>Forecast in Other Cities</p>
          <!-- Cities and forecast with animations -->
          <ol>
            <li v-for="(item, id) in 6" :key="id">
              <div class="flex justify-between border-t py-4">
                <div class="flex flex-col">
                  <div>Dubia {{ item }}</div>
                  <div>AE</div>
                </div>
                <div>
                  <div>IMG</div>
                </div>
                <div class="flex flex-col">
                  <div>77F</div>
                  <div>Clear sky</div>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
// import { useWeatherStore } from "../store/store.js";
import { useRoute, useRouter } from "vue-router";

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
</script>
