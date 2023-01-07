<template>
  <div class="relative">
    <div class="flex gap-x-4">
      <div class="flex items-center gap-x-2 rounded-full bg-slate-700 px-2">
        <button><LocationIcon @click="store.sayHello()" /></button>
        <div>
          <input
            v-model="store.searchQuery"
            @input="store.getSearchResults"
            type="text"
            class="w-[200px] border-2 p-1"
          />
          <div
            v-if="store.mapboxSearchResults"
            class="absolute z-50 h-64 w-[200px] border-2 bg-slate-700"
          >
            <p class="py-2 text-sm text-white" v-if="store.searchError">
              Sorry, something went wrong, please try again.
            </p>
            <p
              class="py-2"
              v-if="
                !store.searchError && store.mapboxSearchResults.length === 0
              "
            >
              No results match your query, try a different term.
            </p>
            <template v-else>
              <ul>
                <li
                  v-for="searchResult in store.mapboxSearchResults"
                  :key="searchResult.id"
                  @click="previewCity(searchResult)"
                >
                  <span class="cursor-pointer text-sm text-white">
                    {{ searchResult.place_name }}</span
                  >
                </li>
              </ul>
            </template>
          </div>
        </div>

        <SearchIcon @click="store.getSearchResults()" />
      </div>
      <button class="[isDark ? 'bg-yellow-400' : '']" @click="toggleDark()">
        <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
        <img v-if="isDark" class="w-10" src="/clear-night.svg" alt="weather" />

        <!-- <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6 text-yellow-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
          />
        </svg> -->
        <img v-else class="w-10" src="/clear-day.svg" alt="weather" />

        <!-- <span :class="[isDark ? 'bg-yellow-400' : '']" class="ml-2"
          >{{ isDark ? "Dark" : "Light" }} {{ isDark }}</span
        > -->
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useWeatherStore } from "../store/store.js";
import LocationIcon from "./icons/LocationIcon.vue";
import { useDark, useToggle } from "@vueuse/core";
import SearchIcon from "./icons/SearchIcon.vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const store = useWeatherStore();

const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");

  router.push({
    name: "cityView",
    params: { state: state, city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });

  store.mapboxSearchResults = null;
};
</script>

<style></style>
