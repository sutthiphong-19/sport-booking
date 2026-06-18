<script setup lang="ts">
import { onMounted } from "vue";
import { useBookingStore } from "@/stores/booking.store";
import type { BookingStatus, PaymentStatus } from "@/types/booking.type";

const bookingStore = useBookingStore();

const bookingStatusLabel: Record<BookingStatus, string> = {
  PENDING_PAYMENT: "รอชำระเงิน",
  WAITING_APPROVAL: "รออนุมัติ",
  APPROVED: "อนุมัติแล้ว",
  REJECTED: "ถูกปฏิเสธ",
  CANCELLED: "ยกเลิก",
  COMPLETED: "เสร็จสิ้น",
};

const paymentStatusLabel: Record<PaymentStatus, string> = {
  PENDING: "ยังไม่ชำระ",
  WAITING_CHECK: "รอตรวจสอบสลิป",
  APPROVED: "ชำระเงินแล้ว",
  REJECTED: "สลิปไม่ถูกต้อง",
};

const money = (value: number) => {
  return value.toLocaleString("th-TH");
};

onMounted(() => {
  bookingStore.fetchMyBookings();
});
</script>

<template>
  <section class="page-container">
    <div class="mb-6">
      <h1 class="page-title">ประวัติการจอง</h1>
      <p class="page-subtitle">ตรวจสอบสถานะรายการจองและการชำระเงิน</p>
    </div>

    <div v-if="bookingStore.bookings.length" class="space-y-4">
      <Card v-for="booking in bookingStore.bookings" :key="booking.id">
        <template #content>
          <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-lg font-bold text-slate-800">
                {{ booking.fieldName }}
              </h2>

              <p class="mt-1 text-sm text-slate-500">
                วันที่ {{ booking.bookingDate }}
                เวลา {{ booking.startTime }} - {{ booking.endTime }}
              </p>

              <p class="mt-1 text-sm text-slate-500">
                ยอดรวม {{ money(booking.totalPrice) }} บาท
              </p>

              <p v-if="booking.slipFileName" class="mt-1 text-sm text-emerald-600">
                สลิป: {{ booking.slipFileName }}
              </p>
            </div>

            <div class="flex flex-col gap-2 md:items-end">
              <Tag :value="bookingStatusLabel[booking.status]" />
              <Tag
                :value="paymentStatusLabel[booking.paymentStatus]"
                severity="secondary"
              />

              <RouterLink
                v-if="booking.status === 'PENDING_PAYMENT'"
                :to="`/payment/upload/${booking.id}`"
              >
                <Button
                  label="อัปโหลดสลิป"
                  icon="pi pi-upload"
                  size="small"
                  class="mt-2"
                />
              </RouterLink>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="card text-center text-slate-500">
      ยังไม่มีประวัติการจอง
    </div>
  </section>
</template>