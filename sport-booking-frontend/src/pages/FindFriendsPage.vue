<script setup lang="ts">
import { ref } from "vue";

type TeamId = "red" | "white" | "black" | "yellow";

type Player = {
  name: string;
  sport: string;
  level: string;
  phone: string;
  note: string;
};

type Team = {
  id: TeamId;
  name: string;
  colorName: string;
  headerClass: string;
  badgeClass: string;
  borderClass: string;
  players: Array<Player | null>;
};

const sportOptions = [
  "ฟุตบอล",
  "ฟุตซอล",
  "แบดมินตัน",
  "วอลเลย์บอล",
];

const levelOptions = [
  "มือใหม่",
  "ปานกลาง",
  "เก่ง",
  "มือสมัครเล่น",
  "มือแข่งขัน",
];

const form = ref({
  name: "",
  sport: "",
  level: "",
  phone: "",
  note: "",
  teamId: "red" as TeamId,
});

const teams = ref<Team[]>([
  {
    id: "red",
    name: "ทีมสีแดง",
    colorName: "แดง",
    headerClass: "bg-red-500 text-white",
    badgeClass: "bg-red-100 text-red-700",
    borderClass: "border-red-200",
    players: Array.from({ length: 10 }, () => null),
  },
  {
    id: "white",
    name: "ทีมสีขาว",
    colorName: "ขาว",
    headerClass: "bg-white text-slate-900 border-b border-slate-200",
    badgeClass: "bg-slate-100 text-slate-700",
    borderClass: "border-slate-200",
    players: Array.from({ length: 10 }, () => null),
  },
  {
    id: "black",
    name: "ทีมสีดำ",
    colorName: "ดำ",
    headerClass: "bg-slate-950 text-white",
    badgeClass: "bg-slate-200 text-slate-900",
    borderClass: "border-slate-800",
    players: Array.from({ length: 10 }, () => null),
  },
  {
    id: "yellow",
    name: "ทีมสีเหลือง",
    colorName: "เหลือง",
    headerClass: "bg-yellow-400 text-slate-950",
    badgeClass: "bg-yellow-100 text-yellow-800",
    borderClass: "border-yellow-200",
    players: Array.from({ length: 10 }, () => null),
  },
]);

const getTeamMemberCount = (team: Team) => {
  return team.players.filter(Boolean).length;
};

const resetForm = () => {
  form.value = {
    name: "",
    sport: "",
    level: "",
    phone: "",
    note: "",
    teamId: "red",
  };
};

const handleSubmit = () => {
  if (!form.value.name.trim()) {
    alert("กรุณากรอกชื่อผู้สมัคร");
    return;
  }

  if (!form.value.sport) {
    alert("กรุณาเลือกประเภทกีฬา");
    return;
  }

  if (!form.value.level) {
    alert("กรุณาเลือกระดับการเล่น");
    return;
  }

  if (!form.value.phone.trim()) {
    alert("กรุณากรอกเบอร์ติดต่อ");
    return;
  }

  const selectedTeam = teams.value.find((team) => team.id === form.value.teamId);

  if (!selectedTeam) {
    alert("ไม่พบทีมที่เลือก");
    return;
  }

  const emptyIndex = selectedTeam.players.findIndex((player) => player === null);

  if (emptyIndex === -1) {
    alert(`${selectedTeam.name} เต็มแล้ว`);
    return;
  }

  selectedTeam.players[emptyIndex] = {
    name: form.value.name,
    sport: form.value.sport,
    level: form.value.level,
    phone: form.value.phone,
    note: form.value.note,
  };

  console.log("Find friends form:", form.value);

  resetForm();
};
</script>

<template>
  <main class="min-h-screen bg-slate-50 px-4 py-10">
    <section class="mx-auto max-w-6xl">
      <div class="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p class="text-sm font-semibold text-emerald-600">
          Find Friends
        </p>

        <h1 class="mt-2 text-3xl font-bold text-slate-900">
          เปิดลงชื่อเข้าร่วมหาเพื่อน
        </h1>

        <p class="mt-2 text-slate-500">
          ลงชื่อเพื่อหาเพื่อนร่วมเล่นกีฬา นัดทีม หรือเข้าร่วมกิจกรรมกับผู้เล่นคนอื่น
        </p>
      </div>

      <form
        class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-5 md:grid-cols-2">
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">
              ชื่อผู้สมัคร
            </label>
            <InputText
              v-model="form.name"
              class="w-full"
              placeholder="กรอกชื่อของคุณ"
            />
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">
              เบอร์ติดต่อ
            </label>
            <InputText
              v-model="form.phone"
              class="w-full"
              placeholder="กรอกเบอร์ติดต่อ"
            />
          </div>

          <!-- เปลี่ยนเป็น Dropdown -->
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">
              ประเภทกีฬา
            </label>

            <select
              v-model="form.sport"
              class="h-[42px] w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="" disabled>
                เลือกประเภทกีฬา
              </option>

              <option
                v-for="sport in sportOptions"
                :key="sport"
                :value="sport"
              >
                {{ sport }}
              </option>
            </select>
          </div>

          <!-- เปลี่ยนเป็น Dropdown -->
          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">
              ระดับการเล่น
            </label>

            <select
              v-model="form.level"
              class="h-[42px] w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="" disabled>
                เลือกระดับการเล่น
              </option>

              <option
                v-for="level in levelOptions"
                :key="level"
                :value="level"
              >
                {{ level }}
              </option>
            </select>
          </div>

          <div>
            <label class="mb-1 block text-sm font-semibold text-slate-700">
              เลือกทีม
            </label>

            <select
              v-model="form.teamId"
              class="h-[42px] w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option
                v-for="team in teams"
                :key="team.id"
                :value="team.id"
              >
                {{ team.name }}
              </option>
            </select>
          </div>

          <div class="md:col-span-2">
            <label class="mb-1 block text-sm font-semibold text-slate-700">
              รายละเอียดเพิ่มเติม
            </label>
            <Textarea
              v-model="form.note"
              class="w-full"
              rows="4"
              placeholder="เช่น อยากเล่นวันไหน เวลาไหน หรือขาดกี่คน"
            />
          </div>
        </div>

        <!-- ตารางทีม -->
        <div class="mt-8">
          <div class="mb-4">
            <h2 class="text-xl font-bold text-slate-900">
              ตารางรายชื่อทีม
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              แบ่งเป็น 4 ทีม ทีมละ 10 คน
            </p>
          </div>

          <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div
              v-for="team in teams"
              :key="team.id"
              class="overflow-hidden rounded-2xl border bg-white shadow-sm"
              :class="team.borderClass"
            >
              <div
                class="flex items-center justify-between px-4 py-3"
                :class="team.headerClass"
              >
                <h3 class="font-bold">
                  {{ team.name }}
                </h3>

                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="team.badgeClass"
                >
                  {{ getTeamMemberCount(team) }} / 10 คน
                </span>
              </div>

              <div class="divide-y divide-slate-100">
                <div
                  v-for="(player, index) in team.players"
                  :key="`${team.id}-${index}`"
                  class="min-h-[58px] px-4 py-3 text-sm"
                >
                  <div class="flex items-start gap-3">
                    <span
                      class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600"
                    >
                      {{ index + 1 }}
                    </span>

                    <div class="min-w-0 flex-1">
                      <template v-if="player">
                        <div class="truncate font-semibold text-slate-900">
                          {{ player.name }}
                        </div>

                        <div class="mt-1 truncate text-xs text-slate-500">
                          {{ player.sport }}
                          <span v-if="player.level"> • {{ player.level }}</span>
                        </div>
                      </template>

                      <template v-else>
                        <div class="text-slate-400">
                          ว่าง
                        </div>

                        <div class="mt-1 text-xs text-slate-300">
                          รอผู้สมัคร
                        </div>
                      </template>
                    </div>

                    <span
                      v-if="!player"
                      class="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-600"
                    >
                      ว่าง
                    </span>

                    <span
                      v-else
                      class="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                    >
                      ลงชื่อแล้ว
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <Button
            type="submit"
            label="ลงชื่อเข้าร่วมหาเพื่อน"
            icon="pi pi-users"
          />
        </div>
      </form>
    </section>
  </main>
</template>