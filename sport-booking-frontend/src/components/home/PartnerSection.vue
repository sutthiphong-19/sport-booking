<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const partners = [
  {
    name: "Dhipaya Insurance",
    image: "/partners/partner-1.png",
  },
  {
    name: "Pay Solutions",
    image: "/partners/partner-2.png",
  },
  {
    name: "PB Sport",
    image: "/partners/partner-3.png",
  },
  {
    name: "BWT",
    image: "/partners/partner-4.png",
  },
  {
    name: "DEPA",
    image: "/partners/partner-5.png",
  },
  {
    name: "Dhipaya Insurance",
    image: "/partners/partner-6.png",
  },
];
</script>

<template>
  <section class="bg-slate-50 py-20">
    <div class="mx-auto max-w-7xl px-4">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-slate-800 md:text-4xl">
          {{ t("partners.title") }}
        </h2>

        <p class="mt-3 text-base font-medium text-slate-500 md:text-lg">
          {{ t("partners.subtitle") }}
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        <div
          v-for="partner in partners"
          :key="partner.name"
          class="group flex h-32 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <img
            :src="partner.image"
            :alt="partner.name"
            class="max-h-16 max-w-full object-contain grayscale-0 transition duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
  </section>
</template>