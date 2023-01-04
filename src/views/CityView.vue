<template>
  <div>
    <Suspense>
      <div>
        <!-- <AsyncCityView /> -->
        <AsyncCityViewUpdate />
      </div>
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import AsyncCityViewUpdate from "../components/AsyncCityUpdatedView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>
