<script setup lang="ts">
import AppFooter from "@/components/common/AppFooter.vue";
import AppHeader from "@/components/common/AppHeader.vue";
import BackButton from "@/components/common/BackButton.vue";
</script>

<template>
  <div class="relative min-h-screen">
    <AppHeader />

    <BackButton />

    <main class="relative z-10">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>
