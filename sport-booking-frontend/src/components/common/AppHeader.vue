<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import { useAuthStore } from "@/stores/auth.store";
import LanguageSwitcher from "@/components/common/LanguageSwitcher.vue";

const router = useRouter();
const authStore = useAuthStore();
const { t } = useI18n();

const isMenuOpen = ref(false);
const isLoggedIn = computed(() => authStore.isLoggedIn);

const closeMenu = () => {
  isMenuOpen.value = false;
};

const handleLogout = () => {
  authStore.logout();
  closeMenu();
  router.push("/login");
};
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <RouterLink to="/" class="text-xl font-bold text-emerald-600" @click="closeMenu">
        {{ t("app.name") }}
      </RouterLink>

      <nav class="hidden items-center gap-4 md:flex">
        <RouterLink to="/" class="text-sm text-slate-700 hover:text-emerald-600">
          {{ t("nav.home") }}
        </RouterLink>

        <RouterLink to="/fields" class="text-sm text-slate-700 hover:text-emerald-600">
          {{ t("nav.fields") }}
        </RouterLink>

        <RouterLink
          v-if="isLoggedIn"
          to="/booking/history"
          class="text-sm text-slate-700 hover:text-emerald-600"
        >
          {{ t("nav.bookingHistory") }}
        </RouterLink>

        <RouterLink
          v-if="isLoggedIn"
          to="/profile"
          class="text-sm text-slate-700 hover:text-emerald-600"
        >
          {{ t("nav.profile") }}
        </RouterLink>

        <RouterLink
          v-if="authStore.isAdmin"
          to="/admin"
          class="text-sm text-slate-700 hover:text-emerald-600"
        >
          {{ t("nav.admin") }}
        </RouterLink>

        <RouterLink
          v-if="authStore.isAdmin"
          to="/admin/fields"
          class="text-sm text-slate-700 hover:text-emerald-600"
        >
          {{ t("nav.manageFields") }}
        </RouterLink>

        <RouterLink
          v-if="authStore.isAdmin"
          to="/admin/bookings"
          class="text-sm text-slate-700 hover:text-emerald-600"
        >
          {{ t("nav.manageBookings") }}
        </RouterLink>

        <LanguageSwitcher />

        <span
          v-if="isLoggedIn"
          class="hidden rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 lg:inline"
        >
          {{ authStore.user?.name }}
        </span>

        <RouterLink v-if="!isLoggedIn" to="/login">
          <Button :label="t('auth.login')" size="small" />
        </RouterLink>

        <Button
          v-else
          :label="t('auth.logout')"
          icon="pi pi-sign-out"
          size="small"
          severity="danger"
          outlined
          @click="handleLogout"
        />
      </nav>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
        @click="isMenuOpen = !isMenuOpen"
      >
        <i :class="isMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </div>

    <div v-if="isMenuOpen" class="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
      <nav class="mx-auto flex max-w-7xl flex-col gap-3">
        <RouterLink to="/" class="rounded-lg px-3 py-2 text-slate-700 hover:bg-emerald-50" @click="closeMenu">
          {{ t("nav.home") }}
        </RouterLink>

        <RouterLink to="/fields" class="rounded-lg px-3 py-2 text-slate-700 hover:bg-emerald-50" @click="closeMenu">
          {{ t("nav.fields") }}
        </RouterLink>

        <RouterLink
          v-if="isLoggedIn"
          to="/booking/history"
          class="rounded-lg px-3 py-2 text-slate-700 hover:bg-emerald-50"
          @click="closeMenu"
        >
          {{ t("nav.bookingHistory") }}
        </RouterLink>

        <RouterLink
          v-if="isLoggedIn"
          to="/profile"
          class="rounded-lg px-3 py-2 text-slate-700 hover:bg-emerald-50"
          @click="closeMenu"
        >
          {{ t("nav.profile") }}
        </RouterLink>

        <RouterLink
          v-if="authStore.isAdmin"
          to="/admin"
          class="rounded-lg px-3 py-2 text-slate-700 hover:bg-emerald-50"
          @click="closeMenu"
        >
          {{ t("nav.admin") }}
        </RouterLink>

        <RouterLink
          v-if="authStore.isAdmin"
          to="/admin/fields"
          class="rounded-lg px-3 py-2 text-slate-700 hover:bg-emerald-50"
          @click="closeMenu"
        >
          {{ t("nav.manageFields") }}
        </RouterLink>

        <RouterLink
          v-if="authStore.isAdmin"
          to="/admin/bookings"
          class="rounded-lg px-3 py-2 text-slate-700 hover:bg-emerald-50"
          @click="closeMenu"
        >
          {{ t("nav.manageBookings") }}
        </RouterLink>

        <div class="px-3">
          <LanguageSwitcher />
        </div>

        <div v-if="isLoggedIn" class="rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">
          {{ authStore.user?.name }}
        </div>

        <RouterLink v-if="!isLoggedIn" to="/login" @click="closeMenu">
          <Button :label="t('auth.login')" class="w-full" />
        </RouterLink>

        <Button
          v-else
          :label="t('auth.logout')"
          icon="pi pi-sign-out"
          severity="danger"
          outlined
          class="w-full"
          @click="handleLogout"
        />
      </nav>
    </div>
  </header>
</template>