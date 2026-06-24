import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";

import MainLayout from "@/layouts/MainLayout.vue";

import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

import FieldListPage from "@/pages/fields/FieldListPage.vue";
import FieldDetailPage from "@/pages/fields/FieldDetailPage.vue";

import BookingCreatePage from "@/pages/booking/BookingCreatePage.vue";
import BookingHistoryPage from "@/pages/booking/BookingHistoryPage.vue";
import BookingSummaryPage from "@/pages/booking/BookingSummaryPage.vue";

import PaymentUploadPage from "@/pages/payment/PaymentUploadPage.vue";
import ProfilePage from "@/pages/profile/ProfilePage.vue";

import AdminDashboardPage from "@/pages/admin/AdminDashboardPage.vue";
import AdminBookingsPage from "@/pages/admin/AdminBookingsPage.vue";
import AdminFieldsPage from "@/pages/admin/AdminFieldsPage.vue";
import AnnouncementDetailPage from "@/pages/AnnouncementDetailPage.vue";
import CompetitionRegisterPage from "@/pages/CompetitionRegisterPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          name: "home",
          component: HomePage,
        },
        {
          path: "fields",
          name: "fields",
          component: FieldListPage,
        },
        {
          path: "fields/:id",
          name: "field-detail",
          component: FieldDetailPage,
        },
        {
          path: "booking/create",
          name: "booking-create",
          component: BookingCreatePage,
          // ชั่วคราว: เปิดให้ผู้ใช้ที่ยังไม่ล็อกอินเข้า flow การจองได้ก่อน
          // หากต้องการกลับไปบังคับล็อกอินภายหลัง ให้ใส่ requiresAuth: true กลับมา
        },
        {
          path: "booking/summary",
          name: "booking-summary",
          component: BookingSummaryPage,
          // ชั่วคราว: เปิดให้ผู้ใช้ที่ยังไม่ล็อกอินเข้า flow การจองได้ก่อน
          // หากต้องการกลับไปบังคับล็อกอินภายหลัง ให้ใส่ requiresAuth: true กลับมา
        },
        {
          path: "booking/history",
          name: "booking-history",
          component: BookingHistoryPage,
          // ชั่วคราว: เปิดให้ผู้ใช้ที่ยังไม่ล็อกอินดูประวัติการจองของ guest ได้
          // หากต้องการกลับไปบังคับล็อกอินภายหลัง ให้ใส่ requiresAuth: true กลับมา
        },
        {
          path: "payment/upload/:id",
          name: "payment-upload",
          component: PaymentUploadPage,
          // ชั่วคราว: เปิดให้ผู้ใช้ที่ยังไม่ล็อกอินอัปโหลดสลิปจาก flow การจองได้
          // หากต้องการกลับไปบังคับล็อกอินภายหลัง ให้ใส่ requiresAuth: true กลับมา
        },
        {
          path: "profile",
          name: "profile",
          component: ProfilePage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "announcements/:id",
          name: "announcement-detail",
          component: AnnouncementDetailPage,
        },
        {
          path: "announcements/:id/register",
          name: "competition-register",
          component: CompetitionRegisterPage,
        },
        {
          path: "admin",
          name: "admin-dashboard",
          component: AdminDashboardPage,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: "admin/bookings",
          name: "admin-bookings",
          component: AdminBookingsPage,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          },
        },
        {
          path: "admin/fields",
          name: "admin-fields",
          component: AdminFieldsPage,
          meta: {
            requiresAuth: true,
            requiresAdmin: true,
          }
        }
      ],
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      meta: {
        guestOnly: true,
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundPage,
    },
    {
      path: "/shoe-rental",
      name: "shoe-rental",
      component: () => import("@/pages/ShoeRentalPage.vue"),
    },
    {
      path: "/find-friends",
      name: "find-friends",
      component: () => import("@/pages/FindFriendsPage.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  if (to.meta.requiresAdmin && !authStore.isAdmin) {
    return {
      name: "home",
    };
  }

  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return {
      name: "home",
    };
  }

  return true;
});

export default router;
