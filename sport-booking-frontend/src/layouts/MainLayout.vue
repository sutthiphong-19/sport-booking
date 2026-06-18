<script setup lang="ts">
import AppHeader from "@/components/common/AppHeader.vue";
import BackButton from "@/components/common/BackButton.vue";
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <AppHeader />

    <BackButton />

    <main>
      <RouterView />
    </main>
  </div>
</template>