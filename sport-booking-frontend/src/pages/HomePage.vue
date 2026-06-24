<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { getCompetitions, type Competition } from "@/services/competition.service";

const competitions = ref<Competition[]>([]);
const loading = ref(false);
const errorMessage = ref("");

const competitionAnnouncements = computed(() => competitions.value.slice(0, 3));

const highlights = [
  { value: "20+", label: "สนามและคอร์ตยอดนิยม" },
  { value: "3 steps", label: "ค้นหา เลือกเวลา และยืนยันการจอง" },
  { value: "24/7", label: "เปิดเช็กตารางและประวัติได้ตลอดเวลา" },
];

const platformPoints = [
  {
    icon: "pi pi-compass",
    title: "ค้นหาง่ายแบบมืออาชีพ",
    description: "แยกประเภทสนาม ดูภาพรวมราคา และเปรียบเทียบบรรยากาศก่อนตัดสินใจได้เร็วขึ้น",
  },
  {
    icon: "pi pi-calendar",
    title: "วางแผนเวลาได้ชัดเจน",
    description: "จัด flow การจองให้เข้าใจง่าย ตั้งแต่เลือกสนามไปจนถึงสรุปรายการ",
  },
  {
    icon: "pi pi-verified",
    title: "เช็กสถานะได้มั่นใจ",
    description: "ติดตามประวัติการจองและขั้นตอนชำระเงินในหน้าตาเดียวกันอย่างเป็นระบบ",
  },
];

const featuredSports = [
  { name: "Football Arena", detail: "สนามหญ้าเทียมสำหรับแมตช์จริงและซ้อมทีม", tone: "from-emerald-500 to-lime-400" },
  { name: "Badminton Court", detail: "คอร์ตในร่ม แสงดี พื้นมาตรฐาน พร้อมลงเล่น", tone: "from-sky-500 to-cyan-400" },
  { name: "Volleyball Hall", detail: "โซนทีมเวิร์กสำหรับซ้อมหรือจัดกิจกรรมกลุ่ม", tone: "from-amber-500 to-orange-400" },
];

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

  return new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" }).format(new Date(value));
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
  <section class="page-container pb-6 pt-8 md:pt-10">
    <div class="page-shell overflow-hidden !p-0">
      <div class="grid gap-10 px-6 py-8 md:px-8 md:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-10 lg:py-12">
        <div class="relative">
          <span class="eyebrow">Sport venue booking</span>

          <h1 class="mt-5 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl md:leading-[1.02]">
            จองสนามกีฬาให้ดูโปร
            <span class="block text-emerald-700">ตั้งแต่หน้าแรกจนถึงยืนยันรายการ</span>
          </h1>

          <p class="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            ค้นหาสนามที่เหมาะกับเกมของคุณ เปรียบเทียบราคาและรายละเอียดได้ชัด
            พร้อมเข้าสู่ flow การจองที่อ่านง่ายและดูน่าเชื่อถือมากขึ้น
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <RouterLink
              to="/fields"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              <i class="pi pi-search"></i>
              สำรวจสนามทั้งหมด
            </RouterLink>

            <RouterLink
              to="/find-friends"
              class="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3.5 text-sm font-bold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <i class="pi pi-users"></i>
              หาเพื่อนร่วมทีม
            </RouterLink>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-3">
            <div
              v-for="item in highlights"
              :key="item.label"
              class="rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-4 shadow-sm"
            >
              <p class="text-xl font-black text-slate-950">{{ item.value }}</p>
              <p class="mt-1 text-sm leading-6 text-slate-500">{{ item.label }}</p>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="absolute inset-x-6 -top-6 h-32 rounded-full bg-emerald-300/40 blur-3xl"></div>

          <div class="relative rounded-[2rem] bg-slate-950 p-5 text-white shadow-[0_28px_60px_rgba(15,23,42,0.22)] md:p-6">
            <div class="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <div>
                <p class="text-xs uppercase tracking-[0.24em] text-emerald-200">Live dashboard</p>
                <p class="mt-1 text-sm font-semibold text-slate-100">Ready for next booking</p>
              </div>
              <span class="rounded-full bg-emerald-400/20 px-3 py-1 text-xs font-bold text-emerald-200">
                Available
              </span>
            </div>

            <div class="mt-5 space-y-4">
              <div
                v-for="sport in featuredSports"
                :key="sport.name"
                class="rounded-[1.5rem] border border-white/10 bg-white/5 p-4"
              >
                <div class="flex items-start gap-4">
                  <div class="h-14 w-14 rounded-2xl bg-gradient-to-br" :class="sport.tone"></div>
                  <div class="flex-1">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <p class="text-sm font-black uppercase tracking-[0.2em] text-slate-300">Featured</p>
                        <h3 class="mt-1 text-lg font-bold text-white">{{ sport.name }}</h3>
                      </div>
                      <span class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">Prime</span>
                    </div>
                    <p class="mt-2 text-sm leading-6 text-slate-300">{{ sport.detail }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-5 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p class="text-sm font-semibold text-emerald-100">Smart flow</p>
              <p class="mt-1 text-sm leading-6 text-emerald-50/90">
                หน้าเว็บถูกจัดลำดับข้อมูลใหม่ให้มองหา CTA, ราคา, และรายละเอียดสนามได้เร็วขึ้น
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="page-container pt-2">
    <div class="grid gap-5 lg:grid-cols-3">
      <article
        v-for="point in platformPoints"
        :key="point.title"
        class="card group transition duration-300 hover:-translate-y-1 hover:border-emerald-200"
      >
        <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition group-hover:bg-emerald-600 group-hover:text-white">
          <i :class="[point.icon, 'text-xl']"></i>
        </div>
        <h2 class="mt-5 text-xl font-black text-slate-950">{{ point.title }}</h2>
        <p class="mt-3 text-sm leading-7 text-slate-600">{{ point.description }}</p>
      </article>
    </div>
  </section>

  <section class="page-container">
    <div class="page-shell">
      <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <span class="eyebrow">Competition updates</span>
          <h2 class="mt-4 text-3xl font-black tracking-tight text-slate-950">
            กระดานประกาศการแข่งขัน
          </h2>
          <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            ติดตามรายการที่เปิดรับสมัครและกิจกรรมพิเศษได้ในบล็อกเดียวกัน เพื่อให้หน้าแรกมีทั้งภาพลักษณ์และข้อมูลจริงที่ใช้งานได้
          </p>
        </div>

        <RouterLink
          to="/fields"
          class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
        >
          <i class="pi pi-arrow-right"></i>
          ไปหน้าสนามทั้งหมด
        </RouterLink>
      </div>

      <div
        v-if="loading"
        class="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500"
      >
        กำลังโหลดข้อมูลการแข่งขัน...
      </div>

      <div
        v-else-if="errorMessage"
        class="mt-8 rounded-[1.5rem] border border-red-200 bg-red-50 p-8 text-center text-red-600"
      >
        {{ errorMessage }}
      </div>

      <div
        v-else-if="competitionAnnouncements.length === 0"
        class="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500"
      >
        ยังไม่มีประกาศการแข่งขัน
      </div>

      <div v-else class="mt-8 grid gap-5 lg:grid-cols-3">
        <article
          v-for="announcement in competitionAnnouncements"
          :key="announcement.id"
          class="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200"
        >
          <div class="flex items-center justify-between gap-3">
            <span
              class="inline-flex rounded-full px-3 py-1 text-xs font-bold"
              :class="getStatusClass(announcement.status)"
            >
              {{ getStatusLabel(announcement.status) }}
            </span>
            <span class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Event
            </span>
          </div>

          <h3 class="mt-4 text-xl font-black text-slate-950">{{ announcement.title }}</h3>

          <div class="mt-4 space-y-2 text-sm text-slate-600">
            <p><span class="font-bold text-slate-800">วันที่:</span> {{ formatDate(announcement.startDate) }}</p>
            <p>
              <span class="font-bold text-slate-800">เวลา:</span>
              {{ formatTime(announcement.startDate) }} - {{ formatTime(announcement.endDate) }}
            </p>
            <p><span class="font-bold text-slate-800">สถานที่:</span> {{ announcement.location || "-" }}</p>
            <p>
              <span class="font-bold text-slate-800">ทีม:</span>
              {{ announcement._count?.applications ?? 0 }} / {{ announcement.maxTeams ?? "ไม่จำกัด" }}
            </p>
          </div>

          <p class="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
            {{ announcement.description }}
          </p>

          <div class="mt-6 flex gap-3">
            <RouterLink
              :to="`/announcements/${announcement.id}`"
              class="inline-flex flex-1 items-center justify-center rounded-full border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              ดูรายละเอียด
            </RouterLink>

            <RouterLink
              :to="`/announcements/${announcement.id}/register`"
              class="inline-flex flex-1 items-center justify-center rounded-full bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
            >
              สมัครเข้าร่วม
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
