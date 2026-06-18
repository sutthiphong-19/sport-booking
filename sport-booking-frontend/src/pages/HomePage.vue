<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  getCompetitions,
  type Competition,
} from "@/services/competition.service";

const competitions = ref<Competition[]>([]);
const loading = ref(false);
const errorMessage = ref("");

const competitionAnnouncements = computed(() => {
  return competitions.value;
});

function getStatusLabel(status: Competition["status"]) {
  const statusMap: Record<Competition["status"], string> = {
    OPEN: "เปิดรับสมัคร",
    CLOSED: "ปิดรับสมัคร",
    CANCELLED: "ยกเลิก",
  };

  return statusMap[status] ?? status;
}

function getStatusClass(status: Competition["status"]) {
  const statusClassMap: Record<Competition["status"], string> = {
    OPEN: "bg-emerald-100 text-emerald-700",
    CLOSED: "bg-slate-200 text-slate-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return statusClassMap[status] ?? "bg-slate-100 text-slate-700";
}

function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function formatTime(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

async function loadCompetitions() {
  try {
    loading.value = true;
    errorMessage.value = "";
    competitions.value = await getCompetitions();
  } catch (error) {
    console.error("โหลดข้อมูลการแข่งขันไม่สำเร็จ", error);
    errorMessage.value = "โหลดข้อมูลการแข่งขันไม่สำเร็จ";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadCompetitions();
});
</script>

<template>
  <section class="bg-emerald-700">
    <div class="mx-auto max-w-7xl px-4 py-20 text-white">
      <h1 class="max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
        ระบบจองสนามกีฬาออนไลน์
      </h1>

      <p class="mt-4 max-w-2xl text-base text-emerald-50">
        ค้นหาสนามกีฬา เลือกวันเวลา และจองสนามได้ง่ายในไม่กี่ขั้นตอน
      </p>

      <RouterLink
        to="/fields"
        class="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-5 py-3 font-medium text-slate-900 transition hover:bg-emerald-300"
      >
        <i class="pi pi-search"></i>
        ดูสนามทั้งหมด
      </RouterLink>
    </div>
  </section>

  <section class="bg-slate-50 px-4 py-10">
    <div class="mx-auto max-w-7xl">
      <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div class="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900">
              บอร์ดประกาศการแข่งขัน
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              ติดตามข่าวสารและการเปิดรับสมัครการแข่งขันกีฬาได้ที่นี่
            </p>
          </div>

          <RouterLink
            to="/fields"
            class="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-500 px-4 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
          >
            <i class="pi pi-megaphone"></i>
            ดูประกาศทั้งหมด
          </RouterLink>
        </div>

        <div
          v-if="loading"
          class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500"
        >
          กำลังโหลดข้อมูลการแข่งขัน...
        </div>

        <div
          v-else-if="errorMessage"
          class="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-red-600"
        >
          {{ errorMessage }}
        </div>

        <div
          v-else-if="competitionAnnouncements.length === 0"
          class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500"
        >
          ยังไม่มีประกาศการแข่งขัน
        </div>

        <div v-else class="grid gap-4 lg:grid-cols-3">
          <article
            v-for="announcement in competitionAnnouncements"
            :key="announcement.id"
            class="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-300 hover:bg-emerald-50/50"
          >
            <span
              class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
              :class="getStatusClass(announcement.status)"
            >
              {{ getStatusLabel(announcement.status) }}
            </span>

            <h3 class="mt-3 text-lg font-bold text-slate-900">
              {{ announcement.title }}
            </h3>

            <div class="mt-3 space-y-1 text-sm text-slate-600">
              <p>
                <span class="font-semibold text-slate-800">วันที่:</span>
                {{ formatDate(announcement.startDate) }}
              </p>

              <p>
                <span class="font-semibold text-slate-800">เวลา:</span>
                {{ formatTime(announcement.startDate) }} -
                {{ formatTime(announcement.endDate) }}
              </p>

              <p>
                <span class="font-semibold text-slate-800">สถานที่:</span>
                {{ announcement.location || "-" }}
              </p>

              <p>
                <span class="font-semibold text-slate-800">จำนวนทีม:</span>
                {{ announcement._count?.applications ?? 0 }}
                /
                {{ announcement.maxTeams ?? "ไม่จำกัด" }}
              </p>
            </div>

            <p class="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
              {{ announcement.description }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <RouterLink
                :to="`/announcements/${announcement.id}`"
                class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
              >
                ดูรายละเอียด
              </RouterLink>

              <RouterLink
                :to="`/announcements/${announcement.id}/register`"
                class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
              >
                สมัครเข้าร่วม
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>

  <section class="bg-slate-50 px-4 py-16">
    <div class="mx-auto max-w-7xl text-center">
      <h2 class="text-3xl font-bold text-slate-900">
        พันธมิตรของเรา
      </h2>

      <p class="mt-3 text-slate-500">
        เครือข่ายผู้มีบทบาทในวงการกีฬาที่ร่วมพัฒนาและขับเคลื่อน Sport Booking
      </p>

      <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          Dhipaya Insurance
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          Pay Solutions
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          PB Sport
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          BWT
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          DEPA
        </div>
        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          Sport Partner
        </div>
      </div>
    </div>
  </section>
</template>