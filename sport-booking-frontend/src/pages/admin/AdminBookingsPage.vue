<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useBookingStore } from "@/stores/booking.store";
import type { BookingStatus, PaymentStatus } from "@/types/booking.type";

const toast = useToast();
const bookingStore = useBookingStore();

const rejectReason = ref("");

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

const pendingApprovalCount = computed(() => {
  return bookingStore.bookings.filter(
    (booking) => booking.status === "WAITING_APPROVAL"
  ).length;
});

const approvedCount = computed(() => {
  return bookingStore.bookings.filter(
    (booking) => booking.status === "APPROVED"
  ).length;
});

const rejectedCount = computed(() => {
  return bookingStore.bookings.filter(
    (booking) => booking.status === "REJECTED"
  ).length;
});

const money = (value: number) => {
  return value.toLocaleString("th-TH");
};

const getBookingSeverity = (status: BookingStatus) => {
  if (status === "APPROVED") return "success";
  if (status === "REJECTED") return "danger";
  if (status === "WAITING_APPROVAL") return "warning";
  if (status === "PENDING_PAYMENT") return "secondary";
  return "info";
};

const handleApprove = async (bookingId: string) => {
  const confirmed = window.confirm("ยืนยันอนุมัติรายการจองนี้?");

  if (!confirmed) return;

  try {
    await bookingStore.approveBooking(bookingId);

    toast.add({
      severity: "success",
      summary: "อนุมัติสำเร็จ",
      detail: "รายการจองถูกอนุมัติแล้ว",
      life: 3000,
    });
  } catch {
    toast.add({
      severity: "error",
      summary: "ผิดพลาด",
      detail: "ไม่สามารถอนุมัติรายการจองได้",
      life: 3000,
    });
  }
};

const handleReject = async (bookingId: string) => {
  const reason = rejectReason.value.trim() || "สลิปไม่ถูกต้องหรือยอดชำระไม่ตรง";

  const confirmed = window.confirm(`ยืนยันปฏิเสธรายการนี้?\nเหตุผล: ${reason}`);

  if (!confirmed) return;

  try {
    await bookingStore.rejectBooking(bookingId, reason);
    rejectReason.value = "";

    toast.add({
      severity: "warn",
      summary: "ปฏิเสธรายการแล้ว",
      detail: "รายการจองถูกปฏิเสธเรียบร้อย",
      life: 3000,
    });
  } catch {
    toast.add({
      severity: "error",
      summary: "ผิดพลาด",
      detail: "ไม่สามารถปฏิเสธรายการจองได้",
      life: 3000,
    });
  }
};

onMounted(() => {
  bookingStore.fetchAllBookings();
});
</script>

<template>
  <section class="page-container">
    <div class="mb-6">
      <h1 class="page-title">จัดการรายการจอง</h1>
      <p class="page-subtitle">
        ตรวจสอบสลิป อนุมัติ หรือปฏิเสธรายการจอง
      </p>
    </div>

    <div class="mb-6 grid gap-4 md:grid-cols-3">
      <div class="card">
        <p class="text-sm text-slate-500">รออนุมัติ</p>
        <h2 class="mt-2 text-3xl font-bold text-yellow-600">
          {{ pendingApprovalCount }}
        </h2>
      </div>

      <div class="card">
        <p class="text-sm text-slate-500">อนุมัติแล้ว</p>
        <h2 class="mt-2 text-3xl font-bold text-emerald-600">
          {{ approvedCount }}
        </h2>
      </div>

      <div class="card">
        <p class="text-sm text-slate-500">ถูกปฏิเสธ</p>
        <h2 class="mt-2 text-3xl font-bold text-red-600">
          {{ rejectedCount }}
        </h2>
      </div>
    </div>

    <div v-if="bookingStore.bookings.length" class="space-y-4">
      <Card v-for="booking in bookingStore.bookings" :key="booking.id">
        <template #content>
          <div class="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h2 class="text-xl font-bold text-slate-800">
                  {{ booking.fieldName }}
                </h2>

                <Tag
                  :value="bookingStatusLabel[booking.status]"
                  :severity="getBookingSeverity(booking.status)"
                />

                <Tag
                  :value="paymentStatusLabel[booking.paymentStatus]"
                  severity="secondary"
                />
              </div>

              <div class="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <p class="text-slate-500">วันที่</p>
                  <p class="font-semibold">{{ booking.bookingDate }}</p>
                </div>

                <div>
                  <p class="text-slate-500">เวลา</p>
                  <p class="font-semibold">
                    {{ booking.startTime }} - {{ booking.endTime }}
                  </p>
                </div>

                <div>
                  <p class="text-slate-500">ราคา</p>
                  <p class="font-semibold">
                    {{ money(booking.pricePerHour) }} บาท / ชั่วโมง
                  </p>
                </div>

                <div>
                  <p class="text-slate-500">ยอดรวม</p>
                  <p class="font-semibold text-emerald-600">
                    {{ money(booking.totalPrice) }} บาท
                  </p>
                </div>

                <div>
                  <p class="text-slate-500">ค่ามัดจำ</p>
                  <p class="font-semibold">
                    {{ money(booking.depositAmount) }} บาท
                  </p>
                </div>

                <div>
                  <p class="text-slate-500">สลิป</p>
                  <p
                    v-if="booking.slipFileName"
                    class="font-semibold text-emerald-600"
                  >
                    {{ booking.slipFileName }}
                  </p>
                  <p v-else class="font-semibold text-slate-400">
                    ยังไม่มีสลิป
                  </p>
                </div>
              </div>

              <div
                v-if="booking.rejectReason"
                class="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700"
              >
                เหตุผลที่ปฏิเสธ: {{ booking.rejectReason }}
              </div>
            </div>

            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 class="font-bold text-slate-800">
                การตรวจสอบจาก Admin
              </h3>

              <div
                v-if="booking.status === 'WAITING_APPROVAL'"
                class="mt-4 space-y-3"
              >
                <textarea
                  v-model="rejectReason"
                  rows="3"
                  class="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-emerald-500"
                  placeholder="เหตุผลกรณีปฏิเสธ เช่น ยอดเงินไม่ตรง / สลิปไม่ชัด"
                ></textarea>

                <div class="grid gap-3 sm:grid-cols-2">
                  <Button
                    label="ปฏิเสธ"
                    icon="pi pi-times"
                    severity="danger"
                    outlined
                    :loading="bookingStore.loading"
                    @click="handleReject(booking.id)"
                  />

                  <Button
                    label="อนุมัติ"
                    icon="pi pi-check"
                    severity="success"
                    :loading="bookingStore.loading"
                    @click="handleApprove(booking.id)"
                  />
                </div>
              </div>

              <div
                v-else-if="booking.status === 'APPROVED'"
                class="mt-4 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700"
              >
                รายการนี้อนุมัติเรียบร้อยแล้ว
              </div>

              <div
                v-else-if="booking.status === 'REJECTED'"
                class="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700"
              >
                รายการนี้ถูกปฏิเสธแล้ว
              </div>

              <div
                v-else
                class="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700"
              >
                ยังไม่สามารถตรวจสอบได้ เพราะผู้ใช้ยังไม่ได้ส่งสลิป
              </div>
            </div>
          </div>
        </template>
      </Card>
    </div>

    <div v-else class="card text-center text-slate-500">
      ยังไม่มีรายการจองในระบบ
    </div>
  </section>
</template>