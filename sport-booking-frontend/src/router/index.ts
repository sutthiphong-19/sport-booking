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
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "booking/summary",
          name: "booking-summary",
          component: BookingSummaryPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "booking/history",
          name: "booking-history",
          component: BookingHistoryPage,
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: "payment/upload/:id",
          name: "payment-upload",
          component: PaymentUploadPage,
          meta: {
            requiresAuth: true,
          },
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