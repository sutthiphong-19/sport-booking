<script setup lang="ts">
import { computed } from "vue";

const field = {
  id: "1",
  name: "สนามฟุตบอล Sport Booking",
  address: "กรุงเทพมหานคร",
  latitude: 13.8123,
  longitude: 100.6089,
};

const googleMapUrl = computed(() => {
  if (field.latitude && field.longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${field.latitude},${field.longitude}`;
  }

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${field.name} ${field.address}`
  )}`;
});
</script>

<template>
  <section class="page-container">
    <div class="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <div class="card">
        <div class="mb-5 h-80 rounded-xl bg-slate-200"></div>

        <h1 class="text-2xl font-bold">
          {{ field.name }}
        </h1>

        <p class="mt-3 text-slate-500">
          รายละเอียดสนาม ราคา เวลาเปิดปิด และข้อมูลสถานที่
        </p>

        <div class="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h2 class="text-lg font-semibold text-slate-800">
            ตำแหน่งที่ตั้งสนาม
          </h2>

          <p class="mt-2 text-sm text-slate-500">
            {{ field.address }}
          </p>

          <a
            :href="googleMapUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex"
          >
            <Button
              label="เปิดตำแหน่งสนาม"
              icon="pi pi-map-marker"
              severity="success"
            />
          </a>
        </div>
      </div>

      <div class="card h-fit">
        <h2 class="text-lg font-semibold">จองสนามนี้</h2>

        <p class="mt-2 text-sm text-slate-500">
          เลือกวันและช่วงเวลาที่ต้องการจอง
        </p>

        <RouterLink to="/booking/create">
          <Button
            label="เริ่มจอง"
            icon="pi pi-calendar-plus"
            class="mt-5 w-full"
          />
        </RouterLink>

        <a
          :href="googleMapUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-3 block"
        >
          <Button
            label="ดูตำแหน่งสนาม"
            icon="pi pi-map-marker"
            severity="secondary"
            outlined
            class="w-full"
          />
        </a>
      </div>
    </div>
  </section>
</template>