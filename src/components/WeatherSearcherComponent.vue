<template>
  <div class="relative">
    <div class="flex gap-x-4">
      <div class="flex gap-x-2 rounded-full bg-slate-700 px-2">
        <button><LocationIcon /></button>
        <div>
          <input
            v-model="store.search"
            type="text"
            class="w-[200px] border-2  p-1"
          />
          <div class="absolute z-50 bg-slate-700  h-64 w-[200px] border-2">
            <ul>
              
              <li v-for="(item, id) in store.searchResult " :key="id">
                <span class="text-white text-sm"> {{ item }} </span>
              </li>
            </ul>
          </div>
        </div>

        <LocationIcon />
      </div>
      <button>Dark theme</button>
    </div>
  </div>
</template>

<script setup>
import { useWeatherStore } from "../store/store.js";
import LocationIcon from "./icons/LocationIcon.vue";

const store = useWeatherStore();
</script>
