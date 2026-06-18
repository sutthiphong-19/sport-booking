<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer>
    <div class="bg-[#10b981] text-white">
      <div class="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
        <div>
          <RouterLink to="/" class="inline-flex items-center text-3xl font-extrabold text-white">
            match<br />day
          </RouterLink>

          <p class="mt-8 max-w-sm text-sm leading-7 text-white/90">
            {{ t("footer.description") }}
          </p>

          <div class="mt-6">
            <a
              href="#"
              aria-label="Facebook"
              class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-red-600 transition hover:scale-110"
            >
              <i class="pi pi-facebook text-lg"></i>
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-base font-bold">
            {{ t("footer.forYou") }}
          </h3>

          <ul class="mt-6 space-y-4 text-sm font-medium text-white/80">
            <li>
              <RouterLink to="/" class="hover:text-white">
                {{ t("footer.faq") }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-base font-bold">
            {{ t("footer.products") }}
          </h3>

          <ul class="mt-6 space-y-4 text-sm font-medium text-white/80">
            <li>
              <RouterLink to="/" class="hover:text-white">
                matchday app
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/" class="hover:text-white">
                ARENA POS
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-base font-bold">
            {{ t("footer.about") }}
          </h3>

          <ul class="mt-6 space-y-4 text-sm font-medium text-white/80">
            <li>
              <RouterLink to="/" class="hover:text-white">
                {{ t("footer.aboutUs") }}
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/" class="hover:text-white">
                {{ t("footer.services") }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="text-base font-bold">
            {{ t("footer.contact") }}
          </h3>

          <ul class="mt-6 space-y-4 text-sm font-medium text-white/80">
            <li>
              <RouterLink to="/" class="hover:text-white">
                {{ t("footer.contactUs") }}
              </RouterLink>
            </li>

            <li>
              <RouterLink to="/" class="hover:text-white">
                {{ t("footer.knowledge") }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="bg-slate-50">
      <div class="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {{ currentYear }} Matchday Hub Company Limited, All rights reserved
        </p>

        <RouterLink to="/" class="hover:text-red-600">
          Terms & Privacy Policy
        </RouterLink>
      </div>
    </div>
  </footer>
</template>