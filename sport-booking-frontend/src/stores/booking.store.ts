import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { useFieldStore } from "@/stores/field.store";
import type { User } from "@/types/auth.type";
import type { Booking, BookingSummary } from "@/types/booking.type";

type BookingState = {
  currentSummary: BookingSummary | null;
  bookings: Booking[];
  loading: boolean;
};

const BOOKINGS_STORAGE_KEY = "sport_bookings";
const BOOKING_SUMMARY_KEY = "booking_summary";
const GUEST_BOOKING_USER_ID = "guest-booking-user";

const getBookingUser = (user: User | null) => {
  if (user) return user;

  // ชั่วคราว: อนุญาตให้ผู้ใช้ที่ยังไม่ล็อกอินจองได้ โดยผูกข้อมูลไว้กับ guest user
  // หากต้องการกลับไปบังคับล็อกอินภายหลัง ให้ลบ fallback นี้และใช้ authStore.user โดยตรง
  return {
    id: GUEST_BOOKING_USER_ID,
    name: "Guest User",
    email: "guest@sport-booking.local",
    role: "USER" as const,
  };
};

const getStoredBookings = (): Booking[] => {
  const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);

  if (!raw) return [];

  try {
    return JSON.parse(raw) as Booking[];
  } catch {
    localStorage.removeItem(BOOKINGS_STORAGE_KEY);
    return [];
  }
};

const getStoredSummary = (): BookingSummary | null => {
  const raw = localStorage.getItem(BOOKING_SUMMARY_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw) as BookingSummary;
  } catch {
    localStorage.removeItem(BOOKING_SUMMARY_KEY);
    return null;
  }
};

const saveBookings = (bookings: Booking[]) => {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
};

const timeToMinutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};

const getHourDiff = (startTime: string, endTime: string) => {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  return Math.max((end - start) / 60, 1);
};

const isTimeOverlap = (
  startA: string,
  endA: string,
  startB: string,
  endB: string
) => {
  const aStart = timeToMinutes(startA);
  const aEnd = timeToMinutes(endA);
  const bStart = timeToMinutes(startB);
  const bEnd = timeToMinutes(endB);

  return aStart < bEnd && bStart < aEnd;
};

const isActiveBookingStatus = (status: Booking["status"]) => {
  return !["REJECTED", "CANCELLED"].includes(status);
};

const validateSelectedTime = (startTime: string, endTime: string) => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);

  if (startMinutes >= endMinutes) {
    throw new Error("เวลาเริ่มต้นต้องน้อยกว่าเวลาสิ้นสุด");
  }
};

export const useBookingStore = defineStore("booking", {
  state: (): BookingState => ({
    currentSummary: getStoredSummary(),
    bookings: getStoredBookings(),
    loading: false,
  }),

  actions: {
    fetchAllBookings() {
      this.bookings = getStoredBookings();
    },

    fetchMyBookings() {
      const authStore = useAuthStore();
      const allBookings = getStoredBookings();
      const bookingUser = getBookingUser(authStore.user);

      this.bookings = allBookings.filter((booking) => {
        return booking.userId === bookingUser.id;
      });
    },

    async checkSelectedTimeAvailability(payload: {
      fieldId: string;
      bookingDate: string;
      startTime: string;
      endTime: string;
    }) {
      this.loading = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 300));

        validateSelectedTime(payload.startTime, payload.endTime);

        const allBookings = getStoredBookings();

        const hasBooking = allBookings.some((booking) => {
          return (
            isActiveBookingStatus(booking.status) &&
            booking.fieldId === payload.fieldId &&
            booking.bookingDate === payload.bookingDate &&
            isTimeOverlap(
              booking.startTime,
              booking.endTime,
              payload.startTime,
              payload.endTime
            )
          );
        });

        if (hasBooking) {
          throw new Error("ช่วงเวลานี้ถูกจองแล้ว กรุณาเลือกเวลาอื่น");
        }

        return true;
      } finally {
        this.loading = false;
      }
    },

    prepareSummary(payload: {
      fieldId: string;
      bookingDate: string;
      startTime: string;
      endTime: string;
    }) {
      const fieldStore = useFieldStore();
      fieldStore.fetchFields();

      const field = fieldStore.fields.find((item) => {
        return item.id === payload.fieldId;
      });

      if (!field) {
        throw new Error("Field not found");
      }

      validateSelectedTime(payload.startTime, payload.endTime);

      const hours = getHourDiff(payload.startTime, payload.endTime);
      const totalPrice = field.pricePerHour * hours;

      const summary: BookingSummary = {
        fieldId: field.id,
        fieldName: field.name,
        bookingDate: payload.bookingDate,
        startTime: payload.startTime,
        endTime: payload.endTime,
        pricePerHour: field.pricePerHour,
        hours,
        depositAmount: 500,
        totalPrice,
      };

      this.currentSummary = summary;
      localStorage.setItem(BOOKING_SUMMARY_KEY, JSON.stringify(summary));

      return summary;
    },

    async confirmBooking(note?: string) {
      const authStore = useAuthStore();
      const bookingUser = getBookingUser(authStore.user);

      if (!this.currentSummary) {
        throw new Error("Booking summary not found");
      }

      if (this.loading) {
        throw new Error("Booking is processing");
      }

      this.loading = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const allBookings = getStoredBookings();

        const duplicatedBooking = allBookings.find((booking) => {
          if (!this.currentSummary) return false;

          return (
            isActiveBookingStatus(booking.status) &&
            booking.fieldId === this.currentSummary.fieldId &&
            booking.bookingDate === this.currentSummary.bookingDate &&
            isTimeOverlap(
              booking.startTime,
              booking.endTime,
              this.currentSummary.startTime,
              this.currentSummary.endTime
            )
          );
        });

        if (duplicatedBooking) {
          throw new Error("ช่วงเวลานี้ถูกจองแล้ว กรุณาเลือกเวลาอื่น");
        }

        const booking: Booking = {
          ...this.currentSummary,
          id: crypto.randomUUID(),
          userId: bookingUser.id,
          status: "PENDING_PAYMENT",
          paymentStatus: "PENDING",
          note,
          createdAt: new Date().toISOString(),
        };

        const updatedBookings = [booking, ...allBookings];

        saveBookings(updatedBookings);

        this.bookings = updatedBookings.filter((item) => {
          return item.userId === bookingUser.id;
        });

        return booking;
      } finally {
        this.loading = false;
      }
    },

    async uploadSlip(bookingId: string, fileName: string) {
      this.loading = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        const allBookings = getStoredBookings();

        const updatedBookings = allBookings.map((booking) => {
          if (booking.id !== bookingId) return booking;

          return {
            ...booking,
            slipFileName: fileName,
            status: "WAITING_APPROVAL" as const,
            paymentStatus: "WAITING_CHECK" as const,
          };
        });

        saveBookings(updatedBookings);

        const authStore = useAuthStore();
        const bookingUser = getBookingUser(authStore.user);

        this.bookings = updatedBookings.filter((booking) => {
          return booking.userId === bookingUser.id;
        });
      } finally {
        this.loading = false;
      }
    },

    async approveBooking(bookingId: string) {
      this.loading = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const allBookings = getStoredBookings();

        const updatedBookings = allBookings.map((booking) => {
          if (booking.id !== bookingId) return booking;

          return {
            ...booking,
            status: "APPROVED" as const,
            paymentStatus: "APPROVED" as const,
            approvedAt: new Date().toISOString(),
            rejectReason: undefined,
          };
        });

        saveBookings(updatedBookings);
        this.bookings = updatedBookings;
      } finally {
        this.loading = false;
      }
    },

    async rejectBooking(bookingId: string, rejectReason: string) {
      this.loading = true;

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const allBookings = getStoredBookings();

        const updatedBookings = allBookings.map((booking) => {
          if (booking.id !== bookingId) return booking;

          return {
            ...booking,
            status: "REJECTED" as const,
            paymentStatus: "REJECTED" as const,
            rejectReason,
            rejectedAt: new Date().toISOString(),
          };
        });

        saveBookings(updatedBookings);
        this.bookings = updatedBookings;
      } finally {
        this.loading = false;
      }
    },
  },
});
