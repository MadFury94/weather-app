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

        <LocationIcon @click="store.getSearchResults()" />
      </div>
      <button class="[isDark ? 'bg-yellow-400' : '']" @click="toggleDark()">
        <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-6 w-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
          />
        </svg>
        <svg
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
        </svg>

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
