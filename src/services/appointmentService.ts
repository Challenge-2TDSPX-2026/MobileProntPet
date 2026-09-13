import { apiFetch } from "../api/api";

export interface AppointmentCreateRequest {
  petId: number;
  clinicId: number;
  appointmentDate: string;
}

export interface ClinicResponse {
  id: number;
  name: string;
  CNPJ: string;
  address: string;
  phone: string;
  openingHours: string;
  closingHours: string;
}

export interface AppointmentResponse {
  id: number;
  speciality: string | null;
  symptoms: string | null;
  dignosis: string | null;
  observations: string | null;
  clinic: ClinicResponse;
  pet: {
    id: number;
    name: string;
    species: string;
    breed: string;
    birthDate: string;
    weight: number;
    sex: string;
    ownerId: number | null;
  };
  appointmentDate: string;
  updatedWeight: number | null;
}

export async function getClinics(): Promise<ClinicResponse[]> {
  return apiFetch<ClinicResponse[]>("/clinics");
}

export async function createAppointment(
  data: AppointmentCreateRequest
): Promise<AppointmentResponse> {
  return apiFetch<AppointmentResponse>("/appointment", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getAppointments(): Promise<AppointmentResponse[]> {
  return apiFetch<AppointmentResponse[]>("/appointment");
}