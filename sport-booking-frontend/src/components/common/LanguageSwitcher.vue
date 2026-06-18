<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

type LocaleCode = "th" | "en";

const { locale } = useI18n();

const isOpen = ref(false);
const rootRef = ref<HTMLElement | null>(null);

const languages: Array<{
  code: LocaleCode;
  label: string;
}> = [
  {
    code: "th",
    label: "TH",
  },
  {
    code: "en",
    label: "EN",
  },
];

const currentLanguage = computed(() => {
  return String(locale.value).toUpperCase();
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLanguage = (code: LocaleCode) => {
  locale.value = code;
  localStorage.setItem("app_locale", code);
  document.documentElement.lang = code;
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (!rootRef.value) return;

  if (!rootRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.documentElement.lang = String(locale.value);
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="rootRef" class="relative">
    <button
      type="button"
      class="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
      @click.stop="toggleDropdown"
    >
      {{ currentLanguage }}
      <i class="pi pi-chevron-down text-xs"></i>
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 top-full z-50 mt-3 w-40 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
    >
      <button
        v-for="item in languages"
        :key="item.code"
        type="button"
        class="flex w-full items-center rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-600 hover:bg-slate-100"
        :class="{
          'bg-emerald-50 text-emerald-700': locale === item.code,
        }"
        @click="changeLanguage(item.code)"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>