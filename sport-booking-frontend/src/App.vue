<script setup lang="ts">
import Toast from "primevue/toast";
import FloatingBackButton from "@/components/common/FloatingBackButton.vue";
</script>

<template>
  <Toast />

  <div class="relative min-h-screen">
    <div class="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-emerald-200/40 to-transparent"></div>
    <RouterView />
    <FloatingBackButton />
  </div>
</template>
