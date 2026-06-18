<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useBookingStore } from "@/stores/booking.store";
import { useFieldStore } from "@/stores/field.store";

const router = useRouter();
const toast = useToast();
const bookingStore = useBookingStore();
const fieldStore = useFieldStore();

fieldStore.fetchFields();

const form = reactive({
  fieldId: "",
  bookingDate: "",
  startTime: "18:00",
  endTime: "20:00",
});

const handleSubmit = async () => {
  try {
    if (!form.fieldId || !form.bookingDate || !form.startTime || !form.endTime) {
      toast.add({
        severity: "warn",
        summary: "กรอกข้อมูลไม่ครบ",
        detail: "กรุณาเลือกสนาม วันที่ และเวลา",
        life: 3000,
      });
      return;
    }

    await bookingStore.checkSelectedTimeAvailability({
      fieldId: form.fieldId,
      bookingDate: form.bookingDate,
      startTime: form.startTime,
      endTime: form.endTime,
    });

    bookingStore.prepareSummary({
      fieldId: form.fieldId,
      bookingDate: form.bookingDate,
      startTime: form.startTime,
      endTime: form.endTime,
    });

    router.push("/booking/summary");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "ไม่สามารถตรวจสอบเวลาได้";

    toast.add({
      severity: "error",
      summary: "ช่วงเวลาไม่พร้อมใช้งาน",
      detail: message,
      life: 3000,
    });
  }
};
</script>

<template>
  <section class="page-container space-y-6">
    <div>
      <h1 class="page-title">จองสนาม</h1>
      <p class="page-subtitle">
        เลือกสนาม วันที่ และกำหนดเวลาได้เอง
      </p>
    </div>

    <Card>
      <template #content>
        <form class="grid gap-4 md:grid-cols-2" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              เลือกสนาม
            </label>

            <select
              v-model="form.fieldId"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            >
              <option value="">-- เลือกสนาม --</option>

              <option
                v-for="field in fieldStore.activeFields"
                :key="field.id"
                :value="field.id"
              >
                {{ field.name }} - {{ field.pricePerHour.toLocaleString() }} บาท/ชั่วโมง
              </option>
            </select>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              วันที่จอง
            </label>

            <input
              v-model="form.bookingDate"
              type="date"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              เวลาเริ่มต้น
            </label>

            <input
              v-model="form.startTime"
              type="time"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              เวลาสิ้นสุด
            </label>

            <input
              v-model="form.endTime"
              type="time"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div class="md:col-span-2">
            <Button
              type="submit"
              label="ตรวจสอบเวลาและไปหน้าสรุป"
              icon="pi pi-calendar-check"
              :loading="bookingStore.loading"
            />
          </div>
        </form>
      </template>
    </Card>
  </section>
</template>