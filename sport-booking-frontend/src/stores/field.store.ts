import { defineStore } from "pinia";
import type { FieldFormPayload, SportField } from "@/types/field.type";

type FieldState = {
  fields: SportField[];
  loading: boolean;
};

const FIELDS_STORAGE_KEY = "sport_fields";

const defaultFields: SportField[] = [
  {
    id: "1",
    name: "สนามฟุตบอล A",
    sportType: "ฟุตบอล",
    description: "สนามฟุตบอลหญ้าเทียม พร้อมไฟส่องสว่าง",
    address: "กรุงเทพมหานคร",
    pricePerHour: 800,
    openTime: "08:00",
    closeTime: "22:00",
    imageUrl: "/fields/field-football.jpg",
    isActive: true,
    latitude: 13.7563,
    longitude: 100.5018,
  },
  {
    id: "2",
    name: "สนามฟุตซอล B",
    sportType: "ฟุตซอล",
    description: "สนามฟุตซอลในร่ม เหมาะสำหรับทีมเล็ก",
    address: "กรุงเทพมหานคร",
    pricePerHour: 600,
    openTime: "09:00",
    closeTime: "23:00",
    imageUrl: "/fields/field-futsal.jpg",
    isActive: true,
    latitude: 13.7563,
    longitude: 100.5018,
  },
];

const getStoredFields = (): SportField[] => {
  const raw = localStorage.getItem(FIELDS_STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(FIELDS_STORAGE_KEY, JSON.stringify(defaultFields));
    return defaultFields;
  }

  try {
    return JSON.parse(raw) as SportField[];
  } catch {
    localStorage.setItem(FIELDS_STORAGE_KEY, JSON.stringify(defaultFields));
    return defaultFields;
  }
};

const saveFields = (fields: SportField[]) => {
  localStorage.setItem(FIELDS_STORAGE_KEY, JSON.stringify(fields));
};

export const useFieldStore = defineStore("field", {
  state: (): FieldState => ({
    fields: getStoredFields(),
    loading: false,
  }),

  getters: {
    activeFields: (state) => {
      return state.fields.filter((field) => field.isActive);
    },

    getFieldById: (state) => {
      return (id: string) => state.fields.find((field) => field.id === id);
    },
  },

  actions: {
    fetchFields() {
      this.fields = getStoredFields();
    },

    createField(payload: FieldFormPayload) {
      const field: SportField = {
        ...payload,
        id: crypto.randomUUID(),
      };

      this.fields = [field, ...this.fields];
      saveFields(this.fields);

      return field;
    },

    updateField(id: string, payload: FieldFormPayload) {
      this.fields = this.fields.map((field) => {
        if (field.id !== id) return field;

        return {
          ...field,
          ...payload,
        };
      });

      saveFields(this.fields);
    },

    deleteField(id: string) {
      this.fields = this.fields.filter((field) => field.id !== id);
      saveFields(this.fields);
    },

    toggleFieldStatus(id: string) {
      this.fields = this.fields.map((field) => {
        if (field.id !== id) return field;

        return {
          ...field,
          isActive: !field.isActive,
        };
      });

      saveFields(this.fields);
    },
  },
});