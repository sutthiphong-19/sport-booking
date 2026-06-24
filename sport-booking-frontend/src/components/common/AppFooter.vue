<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const currentYear = new Date().getFullYear();

const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: t("nav.home"), to: "/" },
      { label: t("nav.fields"), to: "/fields" },
      { label: "หาเพื่อนเล่น", to: "/find-friends" },
      { label: t("nav.shoeRental"), to: "/shoe-rental" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: t("auth.login"), to: "/login" },
      { label: t("auth.register"), to: "/register" },
      { label: t("nav.bookingHistory"), to: "/booking/history" },
      { label: t("nav.profile"), to: "/profile" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: t("footer.faq"), to: "/" },
      { label: t("footer.contactUs"), to: "/" },
      { label: t("footer.knowledge"), to: "/" },
      { label: "Terms & Privacy", to: "/" },
    ],
  },
];
</script>

<template>
  <footer class="px-3 pb-4 pt-10 md:px-5 md:pt-14">
    <div class="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 text-white shadow-[0_26px_80px_rgba(15,23,42,0.18)]">
      <div class="grid gap-10 px-6 py-10 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-12">
        <div class="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div class="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-400/15 blur-3xl"></div>

          <div class="relative">
            <span class="eyebrow !bg-white/10 !text-emerald-200">Sport Booking Platform</span>

            <h2 class="mt-4 max-w-xl text-3xl font-black tracking-tight md:text-4xl">
              Experience a cleaner, faster way to reserve your next game.
            </h2>

            <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              {{ t("footer.description") }}
            </p>

            <div class="mt-8 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-2xl font-black">20+</p>
                <p class="mt-1 text-sm text-slate-300">สนามยอดนิยมในระบบ</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-2xl font-black">24/7</p>
                <p class="mt-1 text-sm text-slate-300">เปิดดูตารางและจองได้ทุกเวลา</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-2xl font-black">Fast</p>
                <p class="mt-1 text-sm text-slate-300">ตรวจสอบราคาและสถานะได้ทันที</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-8 sm:grid-cols-3">
          <div v-for="column in footerColumns" :key="column.title">
            <h3 class="text-sm font-black uppercase tracking-[0.24em] text-slate-400">
              {{ column.title }}
            </h3>

            <ul class="mt-4 space-y-3 text-sm text-slate-200">
              <li v-for="link in column.links" :key="link.label">
                <RouterLink :to="link.to" class="transition hover:text-emerald-300">
                  {{ link.label }}
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 px-6 py-4 text-sm text-slate-400 md:px-8">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {{ currentYear }} Sport Booking. All rights reserved.</p>
          <p>Designed for a more professional sports venue booking experience.</p>
        </div>
      </div>
    </div>
  </footer>
</template>
