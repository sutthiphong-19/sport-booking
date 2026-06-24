<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import LanguageSwitcher from "@/components/common/LanguageSwitcher.vue";
import { useAuthStore } from "@/stores/auth.store";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const isMenuOpen = ref(false);
const isLoggedIn = computed(() => authStore.isLoggedIn);

const primaryLinks = computed(() => [
  { label: t("nav.home"), to: "/" },
  { label: t("nav.fields"), to: "/fields" },
  { label: t("nav.shoeRental"), to: "/shoe-rental" },
  { label: "หาเพื่อนเล่น", to: "/find-friends" },
]);

const memberLinks = computed(() =>
  [
    isLoggedIn.value ? { label: t("nav.bookingHistory"), to: "/booking/history" } : null,
    isLoggedIn.value ? { label: t("nav.profile"), to: "/profile" } : null,
    authStore.isAdmin ? { label: t("nav.admin"), to: "/admin" } : null,
    authStore.isAdmin ? { label: t("nav.manageFields"), to: "/admin/fields" } : null,
    authStore.isAdmin ? { label: t("nav.manageBookings"), to: "/admin/bookings" } : null,
  ].filter(Boolean) as { label: string; to: string }[]
);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const isActive = (to: string) => {
  if (to === "/") return route.path === "/";
  return route.path.startsWith(to);
};

const handleLogout = () => {
  authStore.logout();
  closeMenu();
  router.push("/login");
};
</script>

<template>
  <header class="sticky top-0 z-50 px-3 pt-3 md:px-5">
    <div class="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/60 bg-white/80 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <div class="flex items-center gap-4 px-4 py-4 md:px-6">
        <RouterLink to="/" class="flex min-w-0 items-center gap-3" @click="closeMenu">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-lime-500 text-lg font-black text-white shadow-lg shadow-emerald-700/25">
            SB
          </div>

          <div class="min-w-0">
            <p class="truncate text-lg font-black tracking-tight text-slate-950">
              {{ t("app.name") }}
            </p>
            <p class="truncate text-xs font-medium text-slate-500">
              Premium sports booking experience
            </p>
          </div>
        </RouterLink>

        <nav class="ml-4 hidden flex-1 items-center gap-2 lg:flex">
          <RouterLink
            v-for="link in primaryLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-4 py-2 text-sm font-semibold transition"
            :class="
              isActive(link.to)
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-700/20'
                : 'text-slate-600 hover:bg-emerald-50 hover:text-emerald-700'
            "
          >
            {{ link.label }}
          </RouterLink>
        </nav>

        <div class="ml-auto hidden items-center gap-3 md:flex">
          <div
            class="hidden rounded-full border border-emerald-100 bg-emerald-50 px-4 py-2 text-xs font-semibold text-emerald-800 xl:flex xl:items-center xl:gap-2"
          >
            <i class="pi pi-bolt text-[10px]"></i>
            จองสนามไว ตรวจสอบสถานะได้ทันที
          </div>

          <LanguageSwitcher />

          <span
            v-if="isLoggedIn"
            class="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 xl:inline-flex"
          >
            {{ authStore.user?.name }}
          </span>

          <RouterLink v-if="!isLoggedIn" to="/login" @click="closeMenu">
            <Button
              :label="t('auth.login')"
              class="!rounded-full !border-0 !bg-emerald-600 !px-5 !py-2.5 !text-sm !font-semibold !text-white hover:!bg-emerald-700"
            />
          </RouterLink>

          <Button
            v-else
            :label="t('auth.logout')"
            icon="pi pi-sign-out"
            class="!rounded-full !border !border-emerald-600 !bg-white !px-5 !py-2.5 !text-sm !font-semibold !text-emerald-700 hover:!bg-emerald-50"
            @click="handleLogout"
          />
        </div>

        <button
          type="button"
          class="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 md:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          <i :class="isMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
        </button>
      </div>

      <div class="hidden border-t border-slate-200/80 px-6 py-3 lg:flex lg:items-center lg:justify-between">
        <div class="flex flex-wrap items-center gap-2">
          <RouterLink
            v-for="link in memberLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {{ link.label }}
          </RouterLink>
        </div>

        <div class="text-sm text-slate-500">
          Sports hub for football, badminton, volleyball and more
        </div>
      </div>

      <div v-if="isMenuOpen" class="border-t border-slate-200/80 bg-white/95 px-4 py-4 md:hidden">
        <nav class="flex flex-col gap-2">
          <RouterLink
            v-for="link in primaryLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-2xl px-4 py-3 text-sm font-semibold transition"
            :class="
              isActive(link.to)
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-50 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
            "
            @click="closeMenu"
          >
            {{ link.label }}
          </RouterLink>

          <RouterLink
            v-for="link in memberLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            @click="closeMenu"
          >
            {{ link.label }}
          </RouterLink>

          <div class="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            จองสนามได้หลายประเภท พร้อมติดตามรายการย้อนหลัง
          </div>

          <div class="px-2 pt-1">
            <LanguageSwitcher />
          </div>

          <div
            v-if="isLoggedIn"
            class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700"
          >
            {{ authStore.user?.name }}
          </div>

          <RouterLink v-if="!isLoggedIn" to="/login" @click="closeMenu">
            <Button
              :label="t('auth.login')"
              class="w-full !rounded-2xl !border-0 !bg-emerald-600 !text-white hover:!bg-emerald-700"
            />
          </RouterLink>

          <Button
            v-else
            :label="t('auth.logout')"
            icon="pi pi-sign-out"
            class="w-full !rounded-2xl !border !border-emerald-600 !bg-white !text-emerald-700 hover:!bg-emerald-50"
            @click="handleLogout"
          />
        </nav>
      </div>
    </div>
  </header>
</template>
