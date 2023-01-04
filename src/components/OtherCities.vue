<template>
  <div>
    <div class="rounded-xl bg-white p-5">
      <!-- other cities forecast -->

      <p>Forecast in Other Cities</p>
      <!-- Cities and forecast with animations -->
      <ol v-if="allCities.length > 0">
        <li v-for="(city, index) in allCities" :key="index">
          <div class="flex items-center justify-between border-t py-4">
            <div class="flex flex-col">
              <div>{{ city.name }}</div>
              <div>{{ city.sys.country }}</div>
            </div>
            <div class="">
              <div>
                <img
                  class="h-auto w-[100px]"
                  :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`"
                  alt=""
                />
              </div>
            </div>
            <div class="flex flex-col">
              <div>{{ Math.round(city.main.temp) }}&deg;F</div>
              <div class="capitalize">{{ city.weather[0].description }}</div>
            </div>
          </div>
        </li>
      </ol>
    </div>
    <!-- <ul>
      <li v-for="city in cities" :key="city.id">
        {{ city.name }}: {{ city.main.temp }}°F
      </li>
    </ul> -->
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const mapboxAPIKey = import.meta.env.VITE_MAPBOX_API_KEY;
const allCities = ref([]);
console.log(mapboxAPIKey);

var URL = `http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&units;=metric&appid={API_KEY}`;
function getOtherCities() {
  axios
    .get("https://api.openweathermap.org/data/2.5/group", {
      params: {
        id: "5128581,2643743,2968815", // comma-separated list of city IDs
        units: "imperial", // optional, specify temperature units (default is Kelvin)
        appid: "7efa332cf48aeb9d2d391a51027f1a71", // your OpenWeatherMap API key
      },
    })
    .then((response) => {
      const cities = response.data.list; // array of weather data for each city
      allCities.value = response.data.list;
      console.log(allCities.value);
      console.log(cities[0].name); // New York
      console.log(cities[1].name); // London
      console.log(cities[2].name); // Paris
    })
    .catch((error) => {
      console.error(error);
    });
}
getOtherCities();
//
// const cities = response.data.list;
</script>

<style lang="scss" scoped></style>
