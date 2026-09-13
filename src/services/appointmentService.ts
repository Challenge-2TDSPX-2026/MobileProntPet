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
  symptoms: string | null;
  diagnosis: string | null;
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

export interface AppointmentUpdateRequest {
  petId: number;
  clinicId: number;
  appointmentDate: string;
  symptoms: string;
  diagnosis: string;
  observations: string;
  updatedWeight?: number;
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

export async function getAppointmentsByPet(
  petId: number
): Promise<AppointmentResponse[]> {
  return apiFetch<AppointmentResponse[]>(
    `/appointment?petId=${petId}`
  );
}

export async function getClinicAppointments(): Promise<AppointmentResponse[]> {
  return apiFetch<AppointmentResponse[]>("/appointment/clinic/me");
}

export async function updateAppointment(
  id: number,
  data: AppointmentUpdateRequest
): Promise<AppointmentResponse> {
  return apiFetch<AppointmentResponse>(`/appointment/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteAppointment(id: number): Promise<void> {
  await apiFetch<void>(`/appointment/${id}`, {
    method: "DELETE",
  });
}