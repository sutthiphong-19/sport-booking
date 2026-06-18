export type BookingStatus =
  | "PENDING_PAYMENT"
  | "WAITING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export type PaymentStatus =
  | "PENDING"
  | "WAITING_CHECK"
  | "APPROVED"
  | "REJECTED";

export type TimeSlot = {
  label: string;
  startTime: string;
  endTime: string;
  available: boolean;
};

export type BookingSummary = {
  fieldId: string;
  fieldName: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  pricePerHour: number;
  hours: number;
  depositAmount: number;
  totalPrice: number;
};

export type Booking = BookingSummary & {
  id: string;
  userId: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  slipFileName?: string;
  note?: string;
  rejectReason?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdAt: string;
};