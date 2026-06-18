<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAnnouncementStore } from "@/stores/announcement.store";

const route = useRoute();
const router = useRouter();
const announcementStore = useAnnouncementStore();

const announcementId = computed(() => String(route.params.id || ""));

const announcement = computed(() => {
  return announcementStore.getAnnouncementById(announcementId.value);
});

const handleBack = () => {
  router.push("/");
};

const handlePrint = () => {
  window.print();
};
</script>

<template>
  <section class="bg-slate-50 px-4 py-8">
    <div class="mx-auto max-w-5xl">
      <Button
        label="กลับหน้าแรก"
        icon="pi pi-arrow-left"
        severity="secondary"
        outlined
        size="small"
        class="mb-6"
        @click="handleBack"
      />

      <div
        v-if="announcement"
        class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"
      >
        <div class="border-b border-slate-200 pb-6 text-center">
          <p class="text-sm font-semibold text-emerald-600">
            ประกาศการแข่งขัน
          </p>

          <h1 class="mt-3 text-2xl font-bold leading-relaxed text-slate-900 md:text-3xl">
            {{ announcement.title }}
          </h1>

          <p class="mt-3 text-sm text-slate-500">
            จัดโดย {{ announcement.organizer }}
          </p>
        </div>

        <div class="mt-6 grid gap-4 rounded-2xl bg-slate-50 p-5 md:grid-cols-3">
          <div>
            <p class="text-xs text-slate-500">วันที่แข่งขัน</p>
            <p class="mt-1 font-semibold text-slate-900">
              {{ announcement.date }}
            </p>
          </div>

          <div>
            <p class="text-xs text-slate-500">เวลา</p>
            <p class="mt-1 font-semibold text-slate-900">
              {{ announcement.time }}
            </p>
          </div>

          <div>
            <p class="text-xs text-slate-500">สถานที่</p>
            <p class="mt-1 font-semibold text-slate-900">
              {{ announcement.location }}
            </p>
          </div>
        </div>

        <div class="mt-8 space-y-8 text-slate-700">
          <section>
            <h2 class="text-lg font-bold text-slate-900">
              1. รายละเอียดประกาศ
            </h2>
            <p class="mt-3 leading-7">
              {{ announcement.description }}
            </p>
          </section>

          <section>
            <h2 class="text-lg font-bold text-slate-900">
              2. วัตถุประสงค์
            </h2>
            <p class="mt-3 leading-7">
              {{ announcement.objective }}
            </p>
          </section>

          <section>
            <h2 class="text-lg font-bold text-slate-900">
              3. คุณสมบัติผู้สมัคร
            </h2>
            <ul class="mt-3 list-disc space-y-2 pl-6">
              <li v-for="item in announcement.qualifications" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-bold text-slate-900">
              4. กำหนดการ
            </h2>
            <ul class="mt-3 list-disc space-y-2 pl-6">
              <li v-for="item in announcement.schedule" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <section>
            <h2 class="text-lg font-bold text-slate-900">
              5. กติกาการแข่งขัน
            </h2>
            <ul class="mt-3 list-disc space-y-2 pl-6">
              <li v-for="item in announcement.rules" :key="item">
                {{ item }}
              </li>
            </ul>
          </section>

          <section class="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 class="text-lg font-bold text-emerald-800">
              6. ติดต่อสอบถาม
            </h2>
            <p class="mt-3 leading-7 text-emerald-900">
              {{ announcement.contact }}
            </p>
          </section>
        </div>

        <RouterLink :to="`/announcements/${announcement.id}/register`">
          <Button
            label="สมัครเข้าร่วม"
            icon="pi pi-check-circle"
            severity="success"
          />

          <Button
            label="พิมพ์ประกาศ"
            icon="pi pi-print"
            severity="secondary"
            outlined
            @click="handlePrint"
          />
        </RouterLink>
      </div>

      <div v-else class="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 class="text-xl font-bold text-slate-900">
          ไม่พบประกาศ
        </h1>
        <p class="mt-2 text-slate-500">
          ประกาศนี้อาจถูกลบหรือไม่มีอยู่ในระบบ
        </p>
      </div>
    </div>
  </section>
</template>