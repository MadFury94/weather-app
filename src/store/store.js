import axios from "axios";
import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useWeatherStore = defineStore("weather-store", {
  state: () => ({
    searchResult: [

    ],
    queryTimeout: null,
    searchQuery: "port harcourt",
    mapboxSearchResults: null,
    searchError: null,
    mapboxAPIKey: import.meta.env.VITE_MAPBOX_API_KEY,
  }),

  actions: {
    getSearchResults() {
      clearTimeout(this.queryTimeout);
      this.queryTimeout = setTimeout(async () => {
        if (this.searchQuery !== "") {
          try {
            const result = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${this.searchQuery}.json?access_token=${this.mapboxAPIKey}&types=place`
            );

            this.mapboxSearchResults = result.data.features;
            console.log(this.mapboxSearchResults);
          } catch {
            this.searchError = true;
          }

          return;
        }
        this.mapboxSearchResults = null;
      }, 300);
    },

    sayHello() {
      console.log("hello i am a sore action");
    },
  },
  // other options...
});
