import { api } from "./api";

export interface SportField {
  id: string;
  name: string;
  sportType: string;
  location?: string | null;
  pricePerHour: string;
  imageUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export async function getSportFields() {
  const response = await api.get<ApiResponse<SportField[]>>("/fields");
  return response.data.data;
}