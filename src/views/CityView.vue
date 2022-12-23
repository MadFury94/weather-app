<template>
  <div>
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <CityViewSkeleton />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
// import AsyncCityView from "../components/AsyncCityView.vue";
import AsyncCityView from "../components/AsyncCityUpdatedView.vue";
import CityViewSkeleton from "../components/CityViewSkeleton.vue";
</script>
