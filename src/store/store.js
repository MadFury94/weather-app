import axios from "axios";
import { defineStore } from "pinia";

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useWeatherStore = defineStore("weather-store", {
  state: () => ({
    search: "port harcourt",
    searchResult: [
      "Porto Alegre, Rio Grande do Sul, Brazil",
      "Portland, Oregon, United States",
      "Porto Velho, Rondônia, Brazil",
      "Portsmouth, City Of Portsmouth, England, United Kingdom",
      "Portsmouth, Virginia, United States",
    ],
    queryTimeout: null,
    searchQuery: "",
    mapboxSearchResults: null,
    searchError: null,
    mapboxAPIKey: import.meta.env.VITE_MAPBOX_API_KEY,
  }),

  actions: {
    getSearchResults() {
      clearTimeout(this.queryTimeout);
      this.queryTimeout = setTimeout(async () => {
        if (this.search !== "") {
          try {
            const result = await axios.get(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
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
  },
  // other options...
});
