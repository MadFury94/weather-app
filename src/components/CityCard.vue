<template>
  <div class="flex flex-col flex-1 cursor-pointer">
    <h2 class="text-2xl">{{ city.city }}</h2>
    <h3>{{ city.state }}</h3>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
