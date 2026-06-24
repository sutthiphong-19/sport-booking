<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

/**
 * backStep = 0 คือ ยังไม่เคยกด
 * backStep = 1 คือ กดครั้งแรกแล้ว ครั้งต่อไปจะกลับหน้าแรก
 */
const backStep = ref(0);

/**
 * ใช้กันไม่ให้ watch reset ตอนเรากดปุ่มย้อนกลับเอง
 */
const isBackButtonNavigation = ref(false);

const isHomePage = computed(() => route.path === "/");

const buttonLabel = computed(() => {
  return backStep.value === 0 ? "กลับไปก่อนหน้า" : "กลับหน้าแรก";
});

const buttonIcon = computed(() => {
  return backStep.value === 0 ? "pi pi-arrow-left" : "pi pi-home";
});

watch(
  () => route.fullPath,
  () => {
    /**
     * ถ้าเปลี่ยนหน้าจากการกดปุ่มย้อนกลับเอง
     * ไม่ต้อง reset เพราะต้องให้กดครั้งที่ 2 แล้วกลับหน้าแรก
     */
    if (isBackButtonNavigation.value) {
      isBackButtonNavigation.value = false;
      return;
    }

    /**
     * ถ้าเปลี่ยนหน้าจากเมนู / ปุ่มอื่น
     * ให้เริ่มนับใหม่
     */
    backStep.value = 0;
  }
);

const handleBack = () => {
  /**
   * ถ้าอยู่หน้าแรก ไม่ต้องทำอะไร
   */
  if (isHomePage.value) return;

  /**
   * กดครั้งที่ 2 กลับหน้าแรก
   */
  if (backStep.value === 1) {
    backStep.value = 0;
    router.push("/");
    return;
  }

  /**
   * กดครั้งที่ 1 กลับไปหน้าก่อนหน้า
   */
  backStep.value = 1;
  isBackButtonNavigation.value = true;

  if (window.history.length > 1) {
    router.back();
  } else {
    backStep.value = 0;
    router.push("/");
  }
};
</script>

<template>
  <Transition name="floating-back">
    <button
      v-if="!isHomePage"
      type="button"
      class="fixed bottom-6 left-6 z-[9999] inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/95 px-5 py-3 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 active:translate-y-0"
      @click="handleBack"
    >
      <i :class="buttonIcon"></i>
      <span>{{ buttonLabel }}</span>
    </button>
  </Transition>
</template>

<style scoped>
.floating-back-enter-active,
.floating-back-leave-active {
  transition: all 0.2s ease;
}

.floating-back-enter-from,
.floating-back-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>