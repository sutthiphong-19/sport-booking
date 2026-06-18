<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const form = reactive({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const handleBack = () => {
  if (window.history.state?.back) {
    router.back();
    return;
  }

  router.push("/");
};

const handleSocialLogin = async (provider: "google" | "facebook") => {
  try {
    await authStore.loginWithSocial(provider);

    toast.add({
      severity: "success",
      summary: "สำเร็จ",
      detail:
        provider === "google"
          ? "เข้าสู่ระบบด้วย Google สำเร็จ"
          : "เข้าสู่ระบบด้วย Facebook สำเร็จ",
      life: 3000,
    });

    router.push("/");
  } catch {
    toast.add({
      severity: "error",
      summary: "ผิดพลาด",
      detail:
        provider === "google"
          ? "ไม่สามารถเข้าสู่ระบบด้วย Google ได้"
          : "ไม่สามารถเข้าสู่ระบบด้วย Facebook ได้",
      life: 3000,
    });
  }
};

const handleSubmit = async () => {
  if (form.password !== form.confirmPassword) {
    toast.add({
      severity: "warn",
      summary: "ตรวจสอบข้อมูล",
      detail: "รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน",
      life: 3000,
    });

    return;
  }

  try {
    await authStore.register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    toast.add({
      severity: "success",
      summary: "สำเร็จ",
      detail: "สมัครสมาชิกสำเร็จ กรุณาเข้าสู่ระบบ",
      life: 3000,
    });

    router.push("/login");
  } catch {
    toast.add({
      severity: "error",
      summary: "ผิดพลาด",
      detail: "ไม่สามารถสมัครสมาชิกได้",
      life: 3000,
    });
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
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
            <h1 class="text-2xl font-bold text-slate-900">สมัครสมาชิก</h1>
            <p class="mt-1 text-sm font-normal text-slate-500">
              สร้างบัญชีสำหรับจองสนามกีฬา
            </p>
          </div>
        </template>

        <template #content>
          <div class="grid gap-3 sm:grid-cols-2">
            <Button
              label="Google"
              icon="pi pi-google"
              severity="secondary"
              outlined
              class="w-full"
              :loading="authStore.loading"
              @click="handleSocialLogin('google')"
            />

            <Button
              label="Facebook"
              icon="pi pi-facebook"
              severity="info"
              outlined
              class="w-full"
              :loading="authStore.loading"
              @click="handleSocialLogin('facebook')"
            />
          </div>

          <div class="my-5 flex items-center gap-3">
            <div class="h-px flex-1 bg-slate-200"></div>
            <span class="text-xs text-slate-400">หรือสมัครด้วยอีเมล</span>
            <div class="h-px flex-1 bg-slate-200"></div>
          </div>

          <form class="space-y-4" @submit.prevent="handleSubmit">
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">
                ชื่อ-นามสกุล
              </label>

              <InputText
                v-model="form.name"
                class="w-full"
                placeholder="กรอกชื่อ-นามสกุล"
              />
            </div>

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
                เบอร์โทรศัพท์
              </label>

              <InputText
                v-model="form.phone"
                class="w-full"
                placeholder="กรอกเบอร์โทรศัพท์"
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
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">
                ยืนยันรหัสผ่าน
              </label>

              <Password
                v-model="form.confirmPassword"
                class="w-full"
                input-class="w-full"
                placeholder="ยืนยันรหัสผ่าน"
                toggle-mask
                :feedback="false"
              />
            </div>

            <Button
              type="submit"
              label="สมัครสมาชิก"
              icon="pi pi-user-plus"
              class="w-full"
              :loading="authStore.loading"
            />
          </form>

          <p class="mt-4 text-center text-sm text-slate-500">
            มีบัญชีแล้ว?
            <RouterLink to="/login" class="font-medium text-emerald-600">
              เข้าสู่ระบบ
            </RouterLink>
          </p>
        </template>
      </Card>
    </div>
  </div>
</template>