<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city, click the "+" icon to start
        tracking this city..
      </p>
    </div>
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;F
      </p>
      <p>Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;F</p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <p class="capitalize text-red-500 hover:font-semibold">
        Experiencing Wind Speed of
        {{ Math.round(weatherData.current.wind_speed) }}m/s;
      </p>
      <img
        class="w-[100px] h-auto items-start"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Hourly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">Hourly Weather</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                new Date(hourData.currentTime).toLocaleTimeString("en-us", {
                  hour: "numeric",
                })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;F</p>
          </div>
        </div>
      </div>
    </div>
    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="text-white mx-8">
        <h2 class="mb-4">7 Day Forecast</h2>
        <div
          v-for="day in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              new Date(day.dt * 1000).toLocaleDateString("en-us", {
                weekday: "long",
              })
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H:{{ Math.round(day.temp.max) }}</p>
            <p>L:{{ Math.round(day.temp.min) }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex lg:text-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
      @click="removeCity"
    >
      <i class="fa-solid fa-trash"></i>
      <p>Remove City</p>
    </div>
  </div>
  <div class="text-4xl bg-red-500">item</div>
  <Section class="py-10 px-16 grid md:grid-cols-3 gap-3">
    <div class="border-2 py-4 col-span-2 rounded-xl bg-white space-x-2">
      <div>
        <h1 class="font-medium text-3xl">
          Forecast in <span class="font-bold">{{ route.params.city }}</span>
        </h1>
        <p class="text-2xl mb-12 text-black">
          {{
            new Date(weatherData.currentTime).toLocaleDateString("en-us", {
              weekday: "short",
              day: "2-digit",
              month: "long",
            })
          }}
          {{
            new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
              timeStyle: "short",
            })
          }}
        </p>
      </div>
      <div class="grid md:grid-cols-3 space-x-0 md:gap-2">
        <!-- Description -->

        <!-- Weather descr -->
        <div class="border-2 bg-blue-300 rounded-xl p-10">
          <div class="flex justify-between items-start">
            <h1 class="text-4xl mb-8 font-extrabold">
              {{ Math.round(weatherData.current.temp) }}&deg;F
            </h1>
            <h2 class="text-sm mb-8">
              Feels like {{ Math.round(weatherData.current.feels_like) }}&deg;F
            </h2>
          </div>
          <div class="flex justify-between items-start">
            <ol class="pt-16">
              <ul class="text-sm hover:font-semibold">
                Wind Speed of
                {{
                  Math.round(weatherData.current.wind_speed)
                }}m/s;
              </ul>
              <ul class="capitalize w-44 text-sm">
                {{
                  weatherData.current.weather[0].description
                }}
              </ul>
            </ol>

            <template
              v-if="return_my_icons(weatherData.current.weather[0].main)"
            >
              <img
                class="w-20 mr-10 lg:mr-28 mt-10"
                :src="`/images/${return_my_icons(
                  weatherData.current.weather[0].main
                )}`"
                alt="Animated cloudy weather"
              />
            </template>
            <template v-else>
              <img
                class="w-[100px] h-auto items-start"
                :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
                alt=""
              />
            </template>
          </div>
        </div>
        <!-- visibility -->

        <div class="border-2 bg-blue-300 mx-auto rounded-xl p-1">
          <ul class="underline underline-offset-8 w-80 space-y-2">
            <li>Visibility</li>
            <li>Dew Point</li>
            <li>Wind</li>
            <li>Humidity</li>
            <li>Cloudiness</li>
          </ul>
        </div>
        <div class="container border-2 bg-blue-200 rounded-xl">
          <div class="card-img-overlay text-center">
            <i class="fa-solid fa-sun"></i>
            <h3 lass="fw-light">Sunrise</h3>
            <h2 id="sunrise-time">06:35 AM</h2>
            <br />
            <i class="fa-solid fa-moon"></i>
            <h3 lass="fw-lighter">Sunset</h3>
            <h2 id="sunset-time">06:26 PM</h2>
          </div>
        </div>

        <!-- Image background -->
      </div>
      <!-- other cities forecast -->
      <div>item2</div>
    </div>
    <div class="bg-white rounded-xl py-2">
      <!-- other cities forecast -->
      <h1>text</h1>
      <!-- Cities and forecast with animations -->
      <ol>
        <li>item</li>
        <li>item</li>
        <li>item</li>
      </ol>
    </div>
  </Section>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { return_my_icons } from "../export/UtilitiesHelp";
import WeatherTable from "./WeatherTable.vue";

const route = useRoute();
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

const router = useRouter();
const weatherData = await getWeatherData();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({
    name: "home",
  });
};

// function return_my_icons(weatherType) {
//   if (weatherType === "Rain") {
//     console.log("Let rain show");
//   }
//   if (weatherType === "Clouds") {
//     console.log("Let Clouds show");
//   }
//   console.log(weatherType);
//   return `My own ${weatherType}`;
// }
</script>
