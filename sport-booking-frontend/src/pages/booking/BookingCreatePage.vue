<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import { useBookingStore } from "@/stores/booking.store";
import { useFieldStore } from "@/stores/field.store";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const bookingStore = useBookingStore();
const fieldStore = useFieldStore();

fieldStore.fetchFields();

const form = reactive({
  fieldId: String(route.query.fieldId ?? ""),
  bookingDate: "",
  startTime: "18:00",
  endTime: "20:00",
});

const formControlClass =
  "w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 shadow-inner shadow-black/10 outline-none transition placeholder:text-slate-500 hover:border-emerald-400/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20";

const fieldOptions = computed(() =>
  fieldStore.activeFields.map((field) => ({
    label: `${field.name} - ${field.pricePerHour.toLocaleString()} บาท/ชั่วโมง`,
    value: field.id,
  }))
);

const selectPassThrough = {
  root: {
    class:
      "w-full rounded-xl border border-slate-700 bg-slate-900/80 text-slate-100 shadow-inner shadow-black/10 transition hover:border-emerald-400/70",
  },
  label: { class: "px-4 py-3 text-slate-100 placeholder:text-slate-500" },
  dropdown: { class: "pr-4 text-slate-400" },
  overlay: { class: "mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-2xl" },
  list: { class: "p-2" },
  option: {
    class:
      "rounded-lg px-3 py-3 text-slate-100 transition hover:bg-emerald-500/12 hover:text-emerald-300 data-[p-focused=true]:bg-emerald-500/12 data-[p-focused=true]:text-emerald-300",
  },
};

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
    const message = error instanceof Error ? error.message : "ไม่สามารถตรวจสอบเวลาได้";

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
        <form class="grid gap-5 md:grid-cols-2" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-300">
              เลือกสนาม
            </label>

            <Select
              v-model="form.fieldId"
              :options="fieldOptions"
              option-label="label"
              option-value="value"
              placeholder="-- เลือกสนาม --"
              :pt="selectPassThrough"
              :class="form.fieldId ? '!border-emerald-400 !ring-2 !ring-emerald-400/20' : ''"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-300">
              วันที่จอง
            </label>

            <input
              v-model="form.bookingDate"
              type="date"
              :class="formControlClass"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-300">
              เวลาเริ่มต้น
            </label>

            <input
              v-model="form.startTime"
              type="time"
              :class="formControlClass"
            />
          </div>

          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-300">
              เวลาสิ้นสุด
            </label>

            <input
              v-model="form.endTime"
              type="time"
              :class="formControlClass"
            />
          </div>

          <div class="md:col-span-2 pt-1">
            <Button
              type="submit"
              label="ตรวจสอบเวลาและไปหน้าสรุป"
              icon="pi pi-calendar-check"
              class="!rounded-xl !border-0 !bg-emerald-500 !px-5 !py-3 !font-semibold !text-slate-950 hover:!bg-emerald-400"
              :loading="bookingStore.loading"
            />
          </div>
        </form>
      </template>
    </Card>
  </section>
</template>
