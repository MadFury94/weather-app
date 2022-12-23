<template>
  <main class="container text-white">
    <div class="relative mb-8 pt-4">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or state"
        class="w-full border-b bg-transparent py-2 px-1 focus:border-weather-secondary focus:shadow-[0px_1px_0_0_#004E71] focus:outline-none"
      />
      <ul
        class="absolute top-[66px] w-full bg-weather-secondary py-2 px-1 text-white shadow-md"
        v-if="mapboxSearchResults"
      >
        <p class="py-2" v-if="searchError">
          Sorry, something went wrong, please try again.
        </p>
        <p class="py-2" v-if="!searchError && mapboxSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="cursor-pointer py-2"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
      <div class="p-10 py-44 text-center">
        <h1>
          Click buttons below to view WireFrames / Design(W & D) & Prototype
        </h1>

        <div class="py-4 text-center">
          <a
            class="rounded-lg border-transparent bg-weather-secondary px-6 py-3 hover:bg-weather-primary"
            href="https://www.figma.com/file/5SAe2TN4zyUMiBZ88VlM3g/Weather-App-Wireframe?node-id=0%3A1"
            target="#"
            >W & D</a
          ><a
            class="rounded-lg border-transparent bg-white px-6 py-3 text-weather-primary hover:bg-weather-primary hover:text-white"
            href="https://www.figma.com/proto/5SAe2TN4zyUMiBZ88VlM3g/Weather-App-Wireframe?node-id=1%3A2&scaling=scale-down&page-id=0%3A1&starting-point-node-id=1%3A2&show-proto-sidebar=1"
            target="#"
            >Prototype</a
          >
        </div>
        <div class="pt-40 text-base">
          <p class="text-xs font-light">
            HINT: Click on the "information" icon to view navigation steps in
            Design Prototyping.
          </p>
          <p class="text-xs font-light">
            HINT: Click on the page to navigate in WireFrame Prototyping.
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from "../components/CityCardSkeleton.vue";

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
};

const mapboxAPIKey = import.meta.env.VITE_MAPBOX_API_KEY
  const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );

        mapboxSearchResults.value = result.data.features;
        console.log(mapboxSearchResults);
      } catch {
        searchError.value = true;
      }

      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>
