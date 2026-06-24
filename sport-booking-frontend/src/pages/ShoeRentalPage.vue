<script setup lang="ts">
const shoes = [
  {
    id: 1,
    name: "รองเท้าฟุตซอล",
    size: "39 - 44",
    price: 50,
    status: "พร้อมให้เช่า",
  },
  {
    id: 2,
    name: "รองเท้าสตั๊ด",
    size: "40 - 45",
    price: 80,
    status: "พร้อมให้เช่า",
  },
  {
    id: 3,
    name: "รองเท้าวิ่ง",
    size: "38 - 43",
    price: 40,
    status: "พร้อมให้เช่า",
  },
];
</script>

<template>
  <main class="min-h-screen bg-slate-50 px-4 py-10">
    <section class="mx-auto max-w-7xl">
      <div class="mb-8">
        <p class="text-sm font-semibold text-emerald-600">
          Shoe Rental
        </p>

        <h1 class="mt-2 text-3xl font-bold text-slate-900">
          เช่ารองเท้ากีฬา
        </h1>

        <p class="mt-2 text-slate-500">
          เลือกรองเท้าสำหรับใช้งานร่วมกับการจองสนามกีฬา
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="shoe in shoes"
          :key="shoe.id"
          class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
            👟
          </div>

          <h2 class="text-lg font-bold text-slate-900">
            {{ shoe.name }}
          </h2>

          <div class="mt-3 space-y-2 text-sm text-slate-600">
            <p>ขนาด: {{ shoe.size }}</p>
            <p>ราคาเช่า: {{ shoe.price }} บาท / ครั้ง</p>
            <p class="font-semibold text-emerald-600">
              {{ shoe.status }}
            </p>
          </div>

          <button
            class="mt-5 w-full rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600"
          >
            เลือกรองเท้า
          </button>
        </div>
      </div>
    </section>
  </main>
</template>