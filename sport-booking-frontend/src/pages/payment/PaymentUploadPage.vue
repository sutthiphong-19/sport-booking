<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import { useBookingStore } from "@/stores/booking.store";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const bookingStore = useBookingStore();

const selectedFile = ref<File | null>(null);

const QR_IMAGE_URL = "/payment/promptpay-qr.png";
const RECEIVER_NAME = "Sport Booking";
const PAYMENT_ACCOUNT = "PromptPay / ธนาคารของคุณ";

const bookingId = computed(() => String(route.params.id));

const booking = computed(() => {
  return bookingStore.bookings.find((item) => item.id === bookingId.value);
});

/**
 * ชำระเป็นค่ามัดจำก่อน
 * ถ้าต้องการชำระเต็มจำนวน ให้เปลี่ยน return เป็น booking.value.totalPrice
 */
const amountToPay = computed(() => {
  if (!booking.value) return 0;

  return booking.value.depositAmount > 0
    ? booking.value.depositAmount
    : booking.value.totalPrice;
});

const money = (value: number) => {
  return value.toLocaleString("th-TH");
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  selectedFile.value = input.files?.[0] || null;
};

const handleUpload = async () => {
  if (!selectedFile.value) {
    toast.add({
      severity: "warn",
      summary: "กรุณาเลือกไฟล์",
      detail: "กรุณาอัปโหลดสลิปก่อนส่งตรวจสอบ",
      life: 3000,
    });

    return;
  }

  try {
    await bookingStore.uploadSlip(bookingId.value, selectedFile.value.name);

    toast.add({
      severity: "success",
      summary: "ส่งสลิปสำเร็จ",
      detail: "รายการจองของคุณอยู่ระหว่างรออนุมัติ",
      life: 3000,
    });

    router.push("/booking/history");
  } catch {
    toast.add({
      severity: "error",
      summary: "ผิดพลาด",
      detail: "ไม่สามารถอัปโหลดสลิปได้",
      life: 3000,
    });
  }
};

onMounted(() => {
  bookingStore.fetchMyBookings();
});
</script>

<template>
  <section class="page-container">
    <div class="mb-6">
      <h1 class="page-title">ชำระเงินและอัปโหลดสลิป</h1>
      <p class="page-subtitle">
        สแกน QR เพื่อชำระเงิน จากนั้นอัปโหลดสลิปเพื่อรออนุมัติ
      </p>
    </div>

    <div v-if="booking" class="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div class="space-y-6">
        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-qrcode text-emerald-600"></i>
              <span>สแกน QR เพื่อชำระเงิน</span>
            </div>
          </template>

          <template #content>
            <div class="space-y-4">
              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
                <img
                  :src="QR_IMAGE_URL"
                  alt="Payment QR Code"
                  class="mx-auto h-64 w-64 rounded-xl border border-slate-200 bg-white p-3 object-contain"
                />

                <h2 class="mt-4 text-lg font-bold text-slate-800">
                  {{ RECEIVER_NAME }}
                </h2>

                <p class="mt-1 text-sm text-slate-500">
                  {{ PAYMENT_ACCOUNT }}
                </p>

                <div class="mt-4 rounded-xl bg-emerald-50 p-4">
                  <p class="text-sm text-slate-600">ยอดที่ต้องชำระ</p>
                  <p class="mt-1 text-2xl font-bold text-emerald-700">
                    {{ money(amountToPay) }} บาท
                  </p>
                </div>
              </div>

              <div class="rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
                กรุณาสแกน QR และชำระเงินให้เรียบร้อยก่อน จากนั้นอัปโหลดสลิปเพื่อส่งตรวจสอบ
              </div>
            </div>
          </template>
        </Card>

        <Card>
          <template #title>
            <div class="flex items-center gap-2">
              <i class="pi pi-upload text-emerald-600"></i>
              <span>อัปโหลดสลิปชำระเงิน</span>
            </div>
          </template>

          <template #content>
            <div class="space-y-4">
              <div class="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
                <p class="text-base font-semibold text-slate-800">
                  เลือกไฟล์สลิป
                </p>

                <p class="mt-1 text-sm text-slate-500">
                  รองรับ JPG, PNG หรือ PDF
                </p>

                <input
                  class="mt-5 block w-full cursor-pointer rounded-xl border border-slate-200 bg-white p-3 text-sm"
                  type="file"
                  accept="image/*,.pdf"
                  @change="handleFileChange"
                />

                <p v-if="selectedFile" class="mt-3 text-sm text-emerald-600">
                  ไฟล์ที่เลือก: {{ selectedFile.name }}
                </p>
              </div>

              <Button
                label="ส่งสลิปเพื่อตรวจสอบ"
                icon="pi pi-send"
                class="w-full"
                :loading="bookingStore.loading"
                @click="handleUpload"
              />
            </div>
          </template>
        </Card>
      </div>

      <div>
        <Card>
          <template #title>ข้อมูลรายการจอง</template>

          <template #content>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between gap-4">
                <span class="text-slate-500">สนาม</span>
                <strong class="text-right">{{ booking.fieldName }}</strong>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">วันที่</span>
                <strong class="text-right">{{ booking.bookingDate }}</strong>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">เวลา</span>
                <strong class="text-right">
                  {{ booking.startTime }} - {{ booking.endTime }}
                </strong>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">ราคา</span>
                <strong class="text-right">
                  {{ money(booking.pricePerHour) }} บาท / ชั่วโมง
                </strong>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">จำนวนชั่วโมง</span>
                <strong class="text-right">{{ booking.hours }} ชั่วโมง</strong>
              </div>

              <div class="flex justify-between gap-4">
                <span class="text-slate-500">ค่ามัดจำ</span>
                <strong class="text-right">
                  {{ money(booking.depositAmount) }} บาท
                </strong>
              </div>

              <div class="flex justify-between gap-4 border-t border-slate-200 pt-3">
                <span class="font-semibold text-slate-700">ยอดรวมทั้งหมด</span>
                <strong class="text-right text-emerald-700">
                  {{ money(booking.totalPrice) }} บาท
                </strong>
              </div>

              <div class="flex justify-between gap-4 rounded-xl bg-emerald-50 p-4">
                <span class="font-semibold text-slate-700">
                  ยอดที่ต้องชำระตอนนี้
                </span>
                <strong class="text-right text-emerald-700">
                  {{ money(amountToPay) }} บาท
                </strong>
              </div>

              <div class="mt-5 rounded-xl bg-yellow-50 p-4 text-yellow-700">
                หลังจากส่งสลิปแล้ว สถานะจะเปลี่ยนเป็น “รออนุมัติ”
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <div v-else class="card text-center text-slate-500">
      ไม่พบรายการจอง
    </div>
  </section>
</template>