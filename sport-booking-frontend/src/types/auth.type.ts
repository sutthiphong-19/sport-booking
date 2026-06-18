export type UserRole = "USER" | "STAFF" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone?: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  user: User;
};