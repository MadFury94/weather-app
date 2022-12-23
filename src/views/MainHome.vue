<template>
  <Suspense>
    <div class="flex space-x-3 h-44 justify-center">
      <div class="bg-white w-2/4 rounded-sm border-2">
        <!-- Forecast location -->
        <div>
          <h1 class="text-black text-4xl">Forecast in {{ route }}</h1>
          <h2>Date</h2>
        </div>
        <!-- Weather Details -->
        <div class="flex container justify-between mx-auto mt-8">
          <div>item</div>
          <div>item</div>
          <div>item</div>
        </div>
        <!-- Weekly Weather -->
      </div>
      <div class="bg-blue-500 w-1/4 rounded-sm border-2">item</div>
    </div>
  </Suspense>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

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
    name: "mainhome",
  });
};
</script>

<style lang="scss" scoped></style>
