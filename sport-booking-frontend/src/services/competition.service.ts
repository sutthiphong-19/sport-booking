import { api } from "./api";

export interface Competition {
  id: string;
  title: string;
  description: string;
  location?: string | null;
  startDate: string;
  endDate: string;
  status: "OPEN" | "CLOSED" | "CANCELLED";
  maxTeams?: number | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    applications: number;
  };
}

export interface ApplyCompetitionPayload {
  teamName: string;
  contactName: string;
  phone: string;
  email?: string;
  note?: string;
}

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export async function getCompetitions() {
  const response = await api.get<ApiResponse<Competition[]>>("/competitions");
  return response.data.data;
}

export async function getCompetitionById(id: string) {
  const response = await api.get<ApiResponse<Competition>>(`/competitions/${id}`);
  return response.data.data;
}

export async function applyCompetition(
  competitionId: string,
  payload: ApplyCompetitionPayload
) {
  const response = await api.post<ApiResponse<unknown>>(
    `/competitions/${competitionId}/apply`,
    payload
  );

  return response.data;
}