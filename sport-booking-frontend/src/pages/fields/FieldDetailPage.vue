<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const fields = [
  {
    id: "1",
    name: "Football Arena 1",
    sport: "ฟุตบอล",
    image: "/sport/B5.png",
    address: "กรุงเทพมหานคร",
    latitude: 13.8123,
    longitude: 100.6089,
    description: "สนามฟุตบอลลุคทันสมัย เหมาะกับทั้งแมตช์เพื่อนและเกมซ้อมจริง มีพื้นที่พักข้างสนามและบรรยากาศที่ดูเป็นมืออาชีพ",
    price: "800 บาท / ชั่วโมง",
    hours: "ทุกวัน 08:00 - 23:00",
    highlight: "Best for evening match",
  },
  {
    id: "2",
    name: "Football Arena 2",
    sport: "ฟุตบอล",
    image: "/sport/B4.png",
    address: "กรุงเทพมหานคร",
    latitude: 13.8123,
    longitude: 100.6089,
    description: "จัดพื้นที่สำหรับทีมและผู้ชมได้ดี เหมาะกับการเช่าสนามแบบต่อเนื่องหรือแมตช์ขนาดกลาง",
    price: "800 บาท / ชั่วโมง",
    hours: "ทุกวัน 08:00 - 23:00",
    highlight: "Balanced layout",
  },
  {
    id: "3",
    name: "Football Arena 3",
    sport: "ฟุตบอล",
    image: "/sport/B6.png",
    address: "กรุงเทพมหานคร",
    latitude: 13.8123,
    longitude: 100.6089,
    description: "ดีไซน์สนามโปร่งและถ่ายรูปสวย เหมาะกับทีมที่ต้องการบรรยากาศจริงจังแต่เข้าถึงง่าย",
    price: "800 บาท / ชั่วโมง",
    hours: "ทุกวัน 08:00 - 23:00",
    highlight: "Popular for squads",
  },
  {
    id: "4",
    name: "Badminton Court 1",
    sport: "แบดมินตัน",
    image: "/sport/B1.png",
    address: "กรุงเทพมหานคร",
    latitude: 13.8123,
    longitude: 100.6089,
    description: "คอร์ตในร่มมาตรฐานพร้อมพื้นสนามที่เหมาะกับการซ้อมต่อเนื่องและเกมแข่งขัน",
    price: "250 บาท / ชั่วโมง",
    hours: "ทุกวัน 09:00 - 22:00",
    highlight: "Indoor comfort",
  },
  {
    id: "5",
    name: "Badminton Court 2",
    sport: "แบดมินตัน",
    image: "/sport/B2.png",
    address: "กรุงเทพมหานคร",
    latitude: 13.8123,
    longitude: 100.6089,
    description: "เดินทางง่ายและเหมาะกับการนัดตีแบบรวดเร็วหลังเลิกงานหรือช่วงสุดสัปดาห์",
    price: "250 บาท / ชั่วโมง",
    hours: "ทุกวัน 09:00 - 22:00",
    highlight: "Easy booking",
  },
  {
    id: "6",
    name: "Volleyball Hall 1",
    sport: "วอลเลย์บอล",
    image: "/sport/B3.png",
    address: "กรุงเทพมหานคร",
    latitude: 13.8123,
    longitude: 100.6089,
    description: "รองรับการเล่นแบบทีมและกิจกรรมกลุ่มในพื้นที่ในร่ม พร้อมอุปกรณ์พื้นฐานครบ",
    price: "500 บาท / ชั่วโมง",
    hours: "ทุกวัน 09:00 - 22:00",
    highlight: "Team session ready",
  },
];

const field = computed(() => {
  const id = String(route.params.id || "1");
  return fields.find((item) => item.id === id) || fields[0];
});

const googleMapUrl = computed(() => {
  if (field.value.latitude && field.value.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${field.value.latitude},${field.value.longitude}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${field.value.name} ${field.value.address}`
  )}`;
});

const insightCards = computed(() => [
  { label: "ประเภทกีฬา", value: field.value.sport },
  { label: "ช่วงเวลาเปิด", value: field.value.hours },
  { label: "ราคาเริ่มต้น", value: field.value.price },
]);
</script>

<template>
  <section class="page-container">
    <div class="grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
      <div class="page-shell !p-0">
        <div class="relative h-[320px] overflow-hidden md:h-[420px]">
          <img :src="field.image" :alt="field.name" class="h-full w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

          <div class="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
            {{ field.highlight }}
          </div>

          <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p class="text-xs font-bold uppercase tracking-[0.28em] text-emerald-200">{{ field.sport }}</p>
            <h1 class="mt-2 text-3xl font-black text-white md:text-5xl">{{ field.name }}</h1>
            <p class="mt-3 max-w-2xl text-sm leading-7 text-slate-200 md:text-base">
              {{ field.description }}
            </p>
          </div>
        </div>

        <div class="p-6 md:p-8">
          <div class="grid gap-4 md:grid-cols-3">
            <div
              v-for="item in insightCards"
              :key="item.label"
              class="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm"
            >
              <p class="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{{ item.label }}</p>
              <p class="mt-2 text-base font-black text-slate-950">{{ item.value }}</p>
            </div>
          </div>

          <div class="mt-6 grid gap-5 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">Location</p>
              <h2 class="mt-2 text-xl font-black text-slate-950">ตำแหน่งและการเดินทาง</h2>
              <p class="mt-2 text-sm leading-7 text-slate-600">
                {{ field.address }}
              </p>
            </div>

            <a
              :href="googleMapUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              <i class="pi pi-map-marker mr-2"></i>
              เปิดแผนที่
            </a>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="card">
          <span class="eyebrow">Booking panel</span>
          <h2 class="mt-4 text-2xl font-black text-slate-950">พร้อมเริ่มจองสนามนี้</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            ย้ายจุดตัดสินใจมาไว้ด้านขวาให้เด่นขึ้น ช่วยให้ผู้ใช้เห็นราคา เวลาเปิด และปุ่มเริ่มจองโดยไม่ต้องเลื่อนหา
          </p>

          <div class="mt-6 rounded-[1.5rem] bg-emerald-50 p-4">
            <p class="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">Price overview</p>
            <p class="mt-2 text-3xl font-black text-emerald-900">{{ field.price }}</p>
            <p class="mt-1 text-sm text-emerald-800">เวลาเปิดบริการ {{ field.hours }}</p>
          </div>

          <RouterLink
            :to="{
              path: '/booking/create',
              query: { fieldId: field.id },
            }"
            class="mt-5 block"
          >
            <Button
              label="เริ่มจองทันที"
              icon="pi pi-calendar-plus"
              class="w-full !rounded-full !border-0 !bg-slate-950 !py-3 !font-semibold"
            />
          </RouterLink>

          <a :href="googleMapUrl" target="_blank" rel="noopener noreferrer" class="mt-3 block">
            <Button
              label="ดูตำแหน่งสนาม"
              icon="pi pi-map-marker"
              severity="secondary"
              outlined
              class="w-full !rounded-full !py-3 !font-semibold"
            />
          </a>
        </div>

        <div class="card">
          <h3 class="text-lg font-black text-slate-950">เหตุผลที่หน้านี้ดูโปรขึ้น</h3>
          <div class="mt-4 space-y-3 text-sm leading-7 text-slate-600">
            <p class="rounded-2xl bg-slate-50 px-4 py-3">มี hero image ชัดเจนและเรียงข้อมูลสำคัญจากบนลงล่าง</p>
            <p class="rounded-2xl bg-slate-50 px-4 py-3">แยก insight, ราคา, และตำแหน่งสนามเป็นบล็อกที่อ่านเร็ว</p>
            <p class="rounded-2xl bg-slate-50 px-4 py-3">ทำ CTA ให้เด่นขึ้นทั้งบนมือถือและเดสก์ท็อป</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
