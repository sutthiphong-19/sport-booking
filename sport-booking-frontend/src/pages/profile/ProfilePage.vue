<script setup lang="ts">
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth.store";

const toast = useToast();
const authStore = useAuthStore();

const form = reactive({
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  phone: authStore.user?.phone || "",
});

const handleSave = () => {
  authStore.updateProfile({
    name: form.name,
    phone: form.phone,
  });

  toast.add({
    severity: "success",
    summary: "สำเร็จ",
    detail: "บันทึกข้อมูลผู้ใช้เรียบร้อย",
    life: 3000,
  });
};
</script>

<template>
  <section class="page-container">
    <div class="mb-6">
      <h1 class="page-title">ข้อมูลผู้ใช้</h1>
      <p class="page-subtitle">จัดการข้อมูลส่วนตัวของคุณ</p>
    </div>

    <Card class="max-w-2xl">
      <template #content>
        <form class="space-y-4" @submit.prevent="handleSave">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              ชื่อ-นามสกุล
            </label>
            <InputText v-model="form.name" class="w-full" />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              อีเมล
            </label>
            <InputText v-model="form.email" class="w-full" disabled />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              เบอร์โทรศัพท์
            </label>
            <InputText v-model="form.phone" class="w-full" />
          </div>

          <Button
            type="submit"
            label="บันทึกข้อมูล"
            icon="pi pi-save"
            class="w-full"
          />
        </form>
      </template>
    </Card>
  </section>
</template>