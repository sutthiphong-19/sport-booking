<script setup lang="ts">
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth.store";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const form = reactive({
  email: "admin@test.com",
  password: "123456",
});

const handleBack = () => {
  if (window.history.state?.back) {
    router.back();
    return;
  }

  router.push("/");
};

const handleSubmit = async () => {
  try {
    await authStore.login({
      email: form.email,
      password: form.password,
    });

    toast.add({
      severity: "success",
      summary: "สำเร็จ",
      detail: "เข้าสู่ระบบสำเร็จ",
      life: 3000,
    });

    const redirectPath = String(route.query.redirect || "/");
    router.push(redirectPath);
  } catch {
    toast.add({
      severity: "error",
      summary: "เข้าสู่ระบบไม่สำเร็จ",
      detail: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 px-4">
    <div class="w-full max-w-md">
      <Button
        label="กลับไปก่อนหน้า"
        icon="pi pi-arrow-left"
        severity="secondary"
        outlined
        size="small"
        class="mb-4"
        @click="handleBack"
      />

      <Card>
        <template #title>
          <div>
            <h1 class="text-2xl font-bold text-slate-900">เข้าสู่ระบบ</h1>
            <p class="mt-1 text-sm font-normal text-slate-500">
              เข้าสู่ระบบเพื่อจองสนามกีฬา
            </p>
          </div>
        </template>

        <template #content>
          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">
                อีเมล
              </label>

              <InputText
                v-model="form.email"
                class="w-full"
                type="email"
                placeholder="กรอกอีเมล"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">
                รหัสผ่าน
              </label>

              <Password
                v-model="form.password"
                class="w-full"
                input-class="w-full"
                placeholder="กรอกรหัสผ่าน"
                toggle-mask
                :feedback="false"
              />
            </div>

            <Button
              type="submit"
              label="เข้าสู่ระบบ"
              icon="pi pi-sign-in"
              class="w-full"
              :loading="authStore.loading"
            />
          </form>

          <div class="mt-5 rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
            <p class="font-semibold text-slate-700">บัญชีทดสอบ</p>
            <p>User: user@test.com / 123456</p>
            <p>Admin: admin@test.com / 123456</p>
          </div>

          <p class="mt-4 text-center text-sm text-slate-500">
            ยังไม่มีบัญชี?
            <RouterLink to="/register" class="font-medium text-emerald-600">
              สมัครสมาชิก
            </RouterLink>
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>