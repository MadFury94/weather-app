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
      <button>Dark theme</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useWeatherStore } from "../store/store.js";
import LocationIcon from "./icons/LocationIcon.vue";

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
