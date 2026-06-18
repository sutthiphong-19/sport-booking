export type SportField = {
  id: string;
  name: string;
  sportType: string;
  description: string;
  address: string;
  pricePerHour: number;
  openTime: string;
  closeTime: string;
  imageUrl: string;
  isActive: boolean;
  latitude?: number;
  longitude?: number;
};

export type FieldFormPayload = Omit<SportField, "id">;