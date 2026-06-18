<template>
  <section class="page-container">
    <div class="mb-6">
      <h1 class="page-title">สนามกีฬาทั้งหมด</h1>
      <p class="page-subtitle">เลือกสนามที่ต้องการแล้วทำรายการจอง</p>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div v-for="item in 6" :key="item" class="card">
        <div class="mb-4 h-40 rounded-xl bg-slate-200"></div>

        <h3 class="text-lg font-semibold">สนามฟุตบอล {{ item }}</h3>

        <p class="mt-2 text-sm text-slate-500">
          สนามหญ้าเทียม เปิดให้บริการทุกวัน
        </p>

        <p class="mt-3 text-sm text-slate-700">
          ราคา 800 บาท / ชั่วโมง
        </p>

        <RouterLink :to="`/fields/${item}`">
          <Button label="ดูรายละเอียด" icon="pi pi-eye" class="mt-4 w-full" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>