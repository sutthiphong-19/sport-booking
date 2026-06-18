import { defineStore } from "pinia";
import { api } from "@/services/api";
import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/auth.type";

type AuthState = {
  user: User | null;
  token: string | null;
  loading: boolean;
};

type SocialProvider = "google" | "facebook";

const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    name: "Demo User",
    email: "user@test.com",
    password: "123456",
    role: "USER",
  },
  {
    id: "2",
    name: "Demo Admin",
    email: "admin@test.com",
    password: "123456",
    role: "ADMIN",
  },
];

const getStoredUser = (): User | null => {
  const rawUser = localStorage.getItem("user");

  if (!rawUser) return null;

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
};

const saveAuthSession = (authResponse: AuthResponse) => {
  localStorage.setItem("access_token", authResponse.accessToken);
  localStorage.setItem("user", JSON.stringify(authResponse.user));
};

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: getStoredUser(),
    token: localStorage.getItem("access_token"),
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => Boolean(state.token && state.user),
    isAdmin: (state) => state.user?.role === "ADMIN",
  },

  actions: {
    async login(payload: LoginPayload) {
      this.loading = true;

      try {
        let authResponse: AuthResponse;

        if (import.meta.env.VITE_USE_MOCK_AUTH === "true") {
          await new Promise((resolve) => setTimeout(resolve, 500));

          const foundUser = mockUsers.find(
            (user) =>
              user.email === payload.email &&
              user.password === payload.password
          );

          if (!foundUser) {
            throw new Error("Invalid email or password");
          }

          authResponse = {
            accessToken: `mock-token-${Date.now()}`,
            user: {
              id: foundUser.id,
              name: foundUser.name,
              email: foundUser.email,
              phone: foundUser.phone,
              role: foundUser.role,
            },
          };
        } else {
          const { data } = await api.post<AuthResponse>("/auth/login", payload);
          authResponse = data;
        }

        this.token = authResponse.accessToken;
        this.user = authResponse.user;

        saveAuthSession(authResponse);

        return authResponse;
      } finally {
        this.loading = false;
      }
    },

    async loginWithSocial(provider: SocialProvider) {
      this.loading = true;

      try {
        let authResponse: AuthResponse;

        if (import.meta.env.VITE_USE_MOCK_AUTH === "true") {
          await new Promise((resolve) => setTimeout(resolve, 600));

          authResponse = {
            accessToken: `mock-${provider}-token-${Date.now()}`,
            user: {
              id: `${provider}-user-1`,
              name: provider === "google" ? "Google User" : "Facebook User",
              email:
                provider === "google"
                  ? "google.user@test.com"
                  : "facebook.user@test.com",
              role: "USER",
            },
          };
        } else {
          const { data } = await api.post<AuthResponse>(
            `/auth/social/${provider}`
          );

          authResponse = data;
        }

        this.token = authResponse.accessToken;
        this.user = authResponse.user;

        saveAuthSession(authResponse);

        return authResponse;
      } finally {
        this.loading = false;
      }
    },

    async register(payload: RegisterPayload) {
      this.loading = true;

      try {
        if (import.meta.env.VITE_USE_MOCK_AUTH === "true") {
          await new Promise((resolve) => setTimeout(resolve, 500));

          return {
            message: "register success",
            payload,
          };
        }

        const { data } = await api.post("/auth/register", payload);
        return data;
      } finally {
        this.loading = false;
      }
    },

    updateProfile(payload: { name: string; phone?: string }) {
      if (!this.user) return;

      this.user = {
        ...this.user,
        name: payload.name,
        phone: payload.phone,
      };

      localStorage.setItem("user", JSON.stringify(this.user));
    },

    logout() {
      this.user = null;
      this.token = null;

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    },
  },
});