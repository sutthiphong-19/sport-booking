<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useAnnouncementStore } from "@/stores/announcement.store";

type CompetitionRegistration = {
  id: string;
  announcementId: string;
  teamName: string;
  contactName: string;
  phone: string;
  email: string;
  note?: string;
  createdAt: string;
};

const REGISTRATION_STORAGE_KEY = "competition_registrations";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const announcementStore = useAnnouncementStore();

const announcementId = computed(() => String(route.params.id || ""));

const announcement = computed(() => {
  return announcementStore.getAnnouncementById(announcementId.value);
});

const form = reactive({
  teamName: "",
  contactName: "",
  phone: "",
  email: "",
  note: "",
});

const getStoredRegistrations = (): CompetitionRegistration[] => {
  const raw = localStorage.getItem(REGISTRATION_STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as CompetitionRegistration[];
  } catch {
    localStorage.removeItem(REGISTRATION_STORAGE_KEY);
    return [];
  }
};

const saveRegistration = () => {
  if (!announcement.value) {
    toast.add({
      severity: "error",
      summary: "ไม่พบประกาศ",
      detail: "ไม่สามารถสมัครรายการแข่งขันนี้ได้",
      life: 3000,
    });
    return;
  }

  if (!form.teamName.trim() || !form.contactName.trim() || !form.phone.trim()) {
    toast.add({
      severity: "warn",
      summary: "กรอกข้อมูลไม่ครบ",
      detail: "กรุณากรอกชื่อทีม ชื่อผู้ติดต่อ และเบอร์โทร",
      life: 3000,
    });
    return;
  }

  const registrations = getStoredRegistrations();

  const registration: CompetitionRegistration = {
    id: crypto.randomUUID(),
    announcementId: announcement.value.id,
    teamName: form.teamName.trim(),
    contactName: form.contactName.trim(),
    phone: form.phone.trim(),
    email: form.email.trim(),
    note: form.note.trim(),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    REGISTRATION_STORAGE_KEY,
    JSON.stringify([registration, ...registrations])
  );

  toast.add({
    severity: "success",
    summary: "สมัครสำเร็จ",
    detail: "ระบบบันทึกข้อมูลการสมัครแข่งขันเรียบร้อยแล้ว",
    life: 3000,
  });

  router.push(`/announcements/${announcement.value.id}`);
};
</script>

<template>
  <section class="bg-slate-50 px-4 py-8">
    <div class="mx-auto max-w-3xl">
      <RouterLink
        :to="`/announcements/${announcementId}`"
        class="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
      >
        <i class="pi pi-arrow-left"></i>
        กลับรายละเอียดประกาศ
      </RouterLink>

      <div
        v-if="announcement"
        class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="mb-6 border-b border-slate-200 pb-5">
          <p class="text-sm font-semibold text-emerald-600">
            แบบฟอร์มสมัครเข้าร่วมการแข่งขัน
          </p>

          <h1 class="mt-2 text-2xl font-bold text-slate-900">
            {{ announcement.title }}
          </h1>

          <p class="mt-2 text-sm text-slate-500">
            {{ announcement.date }} | {{ announcement.time }} | {{ announcement.location }}
          </p>
        </div>

        <form class="space-y-5" @submit.prevent="saveRegistration">
          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              ชื่อทีม / ชื่อผู้สมัคร
            </label>
            <InputText
              v-model="form.teamName"
              class="w-full"
              placeholder="เช่น ทีม Sport Booking FC"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              ชื่อผู้ติดต่อ
            </label>
            <InputText
              v-model="form.contactName"
              class="w-full"
              placeholder="ชื่อ-นามสกุล"
            />
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">
                เบอร์โทร
              </label>
              <InputText
                v-model="form.phone"
                class="w-full"
                placeholder="099-999-9999"
              />
            </div>

            <div>
              <label class="mb-1 block text-sm font-medium text-slate-700">
                อีเมล
              </label>
              <InputText
                v-model="form.email"
                class="w-full"
                placeholder="example@email.com"
              />
            </div>
          </div>

          <div>
            <label class="mb-1 block text-sm font-medium text-slate-700">
              หมายเหตุเพิ่มเติม
            </label>
            <textarea
              v-model="form.note"
              rows="4"
              class="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500"
              placeholder="เช่น จำนวนสมาชิกในทีม หรือรายละเอียดเพิ่มเติม"
            ></textarea>
          </div>

          <div class="flex flex-wrap gap-3 border-t border-slate-200 pt-5">
            <Button
              type="submit"
              label="ยืนยันการสมัคร"
              icon="pi pi-check-circle"
              severity="success"
            />

            <RouterLink :to="`/announcements/${announcement.id}`">
              <Button
                type="button"
                label="ยกเลิก"
                icon="pi pi-times"
                severity="secondary"
                outlined
              />
            </RouterLink>
          </div>
        </form>
      </div>

      <div v-else class="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <h1 class="text-xl font-bold text-slate-900">
          ไม่พบรายการแข่งขัน
        </h1>
        <p class="mt-2 text-slate-500">
          รายการนี้อาจถูกลบหรือไม่มีอยู่ในระบบ
        </p>
      </div>
    </div>
  </section>
</template>