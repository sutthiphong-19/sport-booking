<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useFieldStore } from "@/stores/field.store";
import type { FieldFormPayload, SportField } from "@/types/field.type";

const toast = useToast();
const fieldStore = useFieldStore();

const editingId = ref<string | null>(null);

const form = reactive<FieldFormPayload>({
  name: "",
  sportType: "",
  description: "",
  address: "",
  pricePerHour: 0,
  openTime: "08:00",
  closeTime: "22:00",
  imageUrl: "",
  isActive: true,
  latitude: undefined,
  longitude: undefined,
});

const isEditing = computed(() => Boolean(editingId.value));

const resetForm = () => {
  editingId.value = null;

  form.name = "";
  form.sportType = "";
  form.description = "";
  form.address = "";
  form.pricePerHour = 0;
  form.openTime = "08:00";
  form.closeTime = "22:00";
  form.imageUrl = "";
  form.isActive = true;
  form.latitude = undefined;
  form.longitude = undefined;
};

const handleSubmit = () => {
  if (!form.name.trim()) {
    toast.add({
      severity: "warn",
      summary: "กรุณากรอกชื่อสนาม",
      life: 2500,
    });
    return;
  }

  if (form.pricePerHour <= 0) {
    toast.add({
      severity: "warn",
      summary: "กรุณากรอกราคาต่อชั่วโมง",
      life: 2500,
    });
    return;
  }

  if (editingId.value) {
    fieldStore.updateField(editingId.value, { ...form });

    toast.add({
      severity: "success",
      summary: "แก้ไขสนามสำเร็จ",
      life: 2500,
    });
  } else {
    fieldStore.createField({ ...form });

    toast.add({
      severity: "success",
      summary: "เพิ่มสนามสำเร็จ",
      life: 2500,
    });
  }

  resetForm();
};

const handleEdit = (field: SportField) => {
  editingId.value = field.id;

  form.name = field.name;
  form.sportType = field.sportType;
  form.description = field.description;
  form.address = field.address;
  form.pricePerHour = field.pricePerHour;
  form.openTime = field.openTime;
  form.closeTime = field.closeTime;
  form.imageUrl = field.imageUrl;
  form.isActive = field.isActive;
  form.latitude = field.latitude;
  form.longitude = field.longitude;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleDelete = (field: SportField) => {
  const confirmed = window.confirm(`ต้องการลบสนาม "${field.name}" ใช่ไหม?`);

  if (!confirmed) return;

  fieldStore.deleteField(field.id);

  toast.add({
    severity: "success",
    summary: "ลบสนามสำเร็จ",
    life: 2500,
  });
};

onMounted(() => {
  fieldStore.fetchFields();
});
</script>

<template>
  <section class="page-container space-y-6">
    <div>
      <h1 class="page-title">จัดการสนาม</h1>
      <p class="page-subtitle">
        เพิ่ม แก้ไข ปิดใช้งาน หรือลบสนามกีฬา
      </p>
    </div>

    <Card>
      <template #title>
        {{ isEditing ? "แก้ไขสนาม" : "เพิ่มสนามใหม่" }}
      </template>

      <template #content>
        <form class="grid gap-4 md:grid-cols-2" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              ชื่อสนาม
            </label>
            <InputText v-model="form.name" class="w-full" placeholder="เช่น สนามฟุตบอล A" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              ประเภทกีฬา
            </label>
            <InputText v-model="form.sportType" class="w-full" placeholder="เช่น ฟุตบอล / ฟุตซอล" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              ราคา / ชั่วโมง
            </label>
            <input
              v-model.number="form.pricePerHour"
              type="number"
              min="0"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              รูปภาพ URL
            </label>
            <InputText v-model="form.imageUrl" class="w-full" placeholder="/fields/field-football.jpg" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              เวลาเปิด
            </label>
            <input
              v-model="form.openTime"
              type="time"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              เวลาปิด
            </label>
            <input
              v-model="form.closeTime"
              type="time"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              Latitude
            </label>
            <input
              v-model.number="form.latitude"
              type="number"
              step="any"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              Longitude
            </label>
            <input
              v-model.number="form.longitude"
              type="number"
              step="any"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
            />
          </div>

          <div class="md:col-span-2">
            <label class="mb-1 block text-sm font-medium text-slate-700">
              ที่อยู่
            </label>
            <InputText v-model="form.address" class="w-full" placeholder="ที่อยู่สนาม" />
          </div>

          <div class="md:col-span-2">
            <label class="mb-1 block text-sm font-medium text-slate-700">
              รายละเอียด
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
              placeholder="รายละเอียดสนาม"
            ></textarea>
          </div>

          <label class="flex items-center gap-2 text-sm text-slate-700 md:col-span-2">
            <input v-model="form.isActive" type="checkbox" />
            เปิดใช้งานสนามนี้
          </label>

          <div class="flex gap-2 md:col-span-2">
            <Button
              type="submit"
              :label="isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มสนาม'"
              icon="pi pi-save"
            />

            <Button
              type="button"
              label="ล้างฟอร์ม"
              icon="pi pi-refresh"
              severity="secondary"
              outlined
              @click="resetForm"
            />
          </div>
        </form>
      </template>
    </Card>

    <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card v-for="field in fieldStore.fields" :key="field.id">
        <template #title>
          <div class="flex items-start justify-between gap-3">
            <span>{{ field.name }}</span>
            <Tag
              :severity="field.isActive ? 'success' : 'danger'"
              :value="field.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'"
            />
          </div>
        </template>

        <template #content>
          <div class="space-y-3">
            <img
              v-if="field.imageUrl"
              :src="field.imageUrl"
              :alt="field.name"
              class="h-40 w-full rounded-xl object-cover"
            />

            <div class="space-y-1 text-sm text-slate-600">
              <p><strong>ประเภท:</strong> {{ field.sportType || "-" }}</p>
              <p><strong>ราคา:</strong> {{ field.pricePerHour.toLocaleString() }} บาท/ชั่วโมง</p>
              <p><strong>เวลา:</strong> {{ field.openTime }} - {{ field.closeTime }}</p>
              <p><strong>ที่อยู่:</strong> {{ field.address || "-" }}</p>
            </div>

            <div class="flex flex-wrap gap-2">
              <Button
                label="แก้ไข"
                icon="pi pi-pencil"
                size="small"
                severity="secondary"
                outlined
                @click="handleEdit(field)"
              />

              <Button
                :label="field.isActive ? 'ปิดใช้งาน' : 'เปิดใช้งาน'"
                icon="pi pi-power-off"
                size="small"
                severity="warning"
                outlined
                @click="fieldStore.toggleFieldStatus(field.id)"
              />

              <Button
                label="ลบ"
                icon="pi pi-trash"
                size="small"
                severity="danger"
                outlined
                @click="handleDelete(field)"
              />
            </div>
          </div>
        </template>
      </Card>
    </div>
  </section>
</template>