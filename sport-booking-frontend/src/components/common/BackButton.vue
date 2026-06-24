<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const hiddenRouteNames = ["home"];

const shouldShowBackButton = computed(() => {
  return !hiddenRouteNames.includes(String(route.name || ""));
});

const handleBack = () => {
  const hasPreviousPage = Boolean(window.history.state?.back);

  if (hasPreviousPage) {
    router.back();
    return;
  }

  router.push("/");
};
</script>

<template>
  <div v-if="shouldShowBackButton" class="page-container pb-0">
    <Button
      label="กลับไปก่อนหน้า"
      icon="pi pi-arrow-left"
      class="!border !border-slate-400 !bg-white !text-slate-700 hover:!border-emerald-500 hover:!bg-emerald-50 hover:!text-emerald-700"
      size="small"
      @click="handleBack"
    />
  </div>
</template>
