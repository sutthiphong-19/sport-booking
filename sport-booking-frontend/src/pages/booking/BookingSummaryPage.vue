<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useBookingStore } from "@/stores/booking.store";

const router = useRouter();
const toast = useToast();
const bookingStore = useBookingStore();

const note = ref("");

const summary = computed(() => bookingStore.currentSummary);

const money = (value: number) => {
  return value.toLocaleString("th-TH");
};

const handleConfirm = async () => {
  try {
    const booking = await bookingStore.confirmBooking(note.value);

    toast.add({
      severity: "success",
      summary: "จองสำเร็จ",
      detail: "กรุณาอัปโหลดสลิปเพื่อรออนุมัติ",
      life: 3000,
    });

    router.push(`/payment/upload/${booking.id}`);
  } catch (error) {
    const message = 
      error instanceof Error
      ? error.message
      : "ไม่สามารถยืนยันการจองได้";

    toast.add({
      severity: "error",
      summary: "จองไม่สำเร็จ",
      detail: message,
      life: 3000,
    });
  }
};

onMounted(() => {
  if (!summary.value) {
    router.push("/booking/create");
  }
});
</script>

<template>
  <section class="page-container">
    <div class="mb-6">
      <h1 class="page-title">สรุปรายการจอง</h1>
      <p class="page-subtitle">ตรวจสอบข้อมูลก่อนยืนยันการจอง</p>
    </div>

    <Card v-if="summary" class="max-w-2xl">
      <template #content>
        <div class="space-y-4">
          <div class="rounded-2xl bg-emerald-50 p-4">
            <h2 class="text-lg font-bold text-emerald-700">
              {{ summary.fieldName }}
            </h2>
            <p class="mt-1 text-sm text-emerald-700">
              กรุณาตรวจสอบข้อมูลให้ถูกต้องก่อนยืนยัน
            </p>
          </div>

          <div class="divide-y divide-slate-200 rounded-2xl border border-slate-200">
            <div class="flex justify-between p-4">
              <span class="text-slate-500">สนาม</span>
              <strong>{{ summary.fieldName }}</strong>
            </div>

            <div class="flex justify-between p-4">
              <span class="text-slate-500">วันที่</span>
              <strong>{{ summary.bookingDate }}</strong>
            </div>

            <div class="flex justify-between p-4">
              <span class="text-slate-500">เวลา</span>
              <strong>{{ summary.startTime }} - {{ summary.endTime }}</strong>
            </div>

            <div class="flex justify-between p-4">
              <span class="text-slate-500">ราคา</span>
              <strong>{{ money(summary.pricePerHour) }} บาท / ชั่วโมง</strong>
            </div>

            <div class="flex justify-between p-4">
              <span class="text-slate-500">ค่ามัดจำ</span>
              <strong>{{ money(summary.depositAmount) }} บาท</strong>
            </div>

            <div class="flex justify-between bg-slate-50 p-4 text-lg">
              <span class="font-bold text-slate-700">ยอดรวม</span>
              <strong class="text-emerald-600">
                {{ money(summary.totalPrice) }} บาท
              </strong>
            </div>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              หมายเหตุ
            </label>
            <InputText
              v-model="note"
              class="w-full"
              placeholder="เช่น ขอใช้งานช่วงเย็น"
            />
          </div>

          <div class="grid gap-3 sm:grid-cols-2">
            <Button
              label="กลับไปแก้ไข"
              icon="pi pi-arrow-left"
              severity="secondary"
              outlined
              @click="router.push('/booking/create')"
            />

            <Button
              label="ยืนยันการจอง"
              icon="pi pi-check"
              :loading="bookingStore.loading"
              @click="handleConfirm"
            />
          </div>
        </div>
      </template>
    </Card>
  </section>
</template>