<script setup lang="ts">
const fields = [
  {
    id: 1,
    name: "Football Arena 1",
    type: "ฟุตบอล",
    image: "/sport/B5.png",
    description: "สนามหญ้าเทียมขนาดเต็ม เหมาะทั้งแมตช์จริงและการซ้อมทีมช่วงเย็น",
    price: "เริ่มต้น 800 บาท / ชั่วโมง",
    location: "กรุงเทพมหานคร",
    badge: "Most booked",
  },
  {
    id: 2,
    name: "Football Arena 2",
    type: "ฟุตบอล",
    image: "/sport/B4.png",
    description: "โซนสนามฟุตบอลพร้อมไฟส่องสว่างและพื้นที่พักข้างสนามแบบครบ",
    price: "เริ่มต้น 800 บาท / ชั่วโมง",
    location: "กรุงเทพมหานคร",
    badge: "Evening prime",
  },
  {
    id: 3,
    name: "Football Arena 3",
    type: "ฟุตบอล",
    image: "/sport/B6.png",
    description: "ลุคสนามสมัยใหม่ เน้นประสบการณ์ลงเล่นที่คล่องตัวและถ่ายภาพสวย",
    price: "เริ่มต้น 800 บาท / ชั่วโมง",
    location: "กรุงเทพมหานคร",
    badge: "Team favorite",
  },
  {
    id: 4,
    name: "Badminton Court 1",
    type: "แบดมินตัน",
    image: "/sport/B1.png",
    description: "คอร์ตในร่มพื้นมาตรฐาน แสงดี เหมาะกับการซ้อมจริงจังหลังเลิกงาน",
    price: "เริ่มต้น 250 บาท / ชั่วโมง",
    location: "กรุงเทพมหานคร",
    badge: "Indoor comfort",
  },
  {
    id: 5,
    name: "Badminton Court 2",
    type: "แบดมินตัน",
    image: "/sport/B2.png",
    description: "เดินทางง่าย จองสะดวก เหมาะสำหรับคู่ซ้อมและเกมแบบ casual",
    price: "เริ่มต้น 250 บาท / ชั่วโมง",
    location: "กรุงเทพมหานคร",
    badge: "Easy access",
  },
  {
    id: 6,
    name: "Volleyball Hall 1",
    type: "วอลเลย์บอล",
    image: "/sport/B3.png",
    description: "สนามในร่มสำหรับกิจกรรมกลุ่มและการซ้อมทีมพร้อมอุปกรณ์พื้นฐาน",
    price: "เริ่มต้น 500 บาท / ชั่วโมง",
    location: "กรุงเทพมหานคร",
    badge: "Group ready",
  },
];

const summaryCards = [
  { value: "6", label: "สนามแนะนำในหน้านี้" },
  { value: "3", label: "ประเภทกีฬาหลัก" },
  { value: "Pro", label: "เลย์เอาต์ใหม่ที่อ่านง่ายขึ้น" },
];
</script>

<template>
  <section class="page-container">
    <div class="page-shell">
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span class="eyebrow">Field marketplace</span>
          <h1 class="page-title mt-4">เลือกสนามที่เหมาะกับเกมของคุณ</h1>
          <p class="page-subtitle">
            จัดหน้ารายการสนามใหม่ให้มีจังหวะการอ่านแบบ marketplace มากขึ้น
            เห็นภาพรวม ราคา ประเภทกีฬา และปุ่มไปต่อได้ชัดโดยไม่ต้องไล่หา
          </p>
        </div>

        <div class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="item in summaryCards"
            :key="item.label"
            class="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 text-center shadow-sm"
          >
            <p class="text-2xl font-black text-slate-950">{{ item.value }}</p>
            <p class="mt-1 text-sm text-slate-500">{{ item.label }}</p>
          </div>
        </div>
      </div>

      <div class="mt-8 grid gap-4 rounded-[1.75rem] border border-emerald-100 bg-emerald-50/70 p-4 md:grid-cols-[1fr_1fr_auto] md:items-center">
        <div>
          <p class="text-xs font-bold uppercase tracking-[0.24em] text-emerald-700">Quick note</p>
          <p class="mt-2 text-sm leading-7 text-emerald-900">
            โครงสร้างใหม่นี้เน้นให้ผู้ใช้เห็นสิ่งสำคัญก่อน ได้แก่ ประเภทสนาม ราคา และ CTA ไปหน้ารายละเอียด
          </p>
        </div>
        <div class="grid gap-2 sm:grid-cols-2">
          <div class="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700">ดูภาพสนามก่อนตัดสินใจ</div>
          <div class="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700">เลือกสนามได้เร็วขึ้นบนมือถือ</div>
        </div>
        <RouterLink
          to="/find-friends"
          class="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
        >
          หาเพื่อนเล่น
        </RouterLink>
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="field in fields"
          :key="field.id"
          class="group overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_50px_rgba(21,128,61,0.14)]"
        >
          <div class="relative h-56 overflow-hidden">
            <img
              :src="field.image"
              :alt="field.name"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent"></div>
            <div class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
              {{ field.badge }}
            </div>
            <div class="absolute bottom-4 left-4 right-4">
              <p class="text-xs font-bold uppercase tracking-[0.24em] text-emerald-200">{{ field.type }}</p>
              <h2 class="mt-1 text-2xl font-black text-white">{{ field.name }}</h2>
            </div>
          </div>

          <div class="p-5">
            <p class="text-sm leading-7 text-slate-600">
              {{ field.description }}
            </p>

            <div class="mt-5 grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl bg-slate-50 px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Location</p>
                <p class="mt-1 text-sm font-semibold text-slate-800">{{ field.location }}</p>
              </div>
              <div class="rounded-2xl bg-emerald-50 px-4 py-3">
                <p class="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Price</p>
                <p class="mt-1 text-sm font-semibold text-emerald-900">{{ field.price }}</p>
              </div>
            </div>

            <RouterLink :to="`/fields/${field.id}`" class="mt-5 block">
              <Button
                label="ดูรายละเอียดสนาม"
                icon="pi pi-arrow-right"
                iconPos="right"
                class="w-full !rounded-full !border-0 !bg-slate-950 !py-3 !font-semibold"
              />
            </RouterLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
