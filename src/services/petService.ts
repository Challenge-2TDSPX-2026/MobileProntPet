import { apiFetch } from "../api/api";

export type Sex = "Male" | "Female" | "Other";

export interface PetRequest {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: number;
  sex: Sex;
}

export interface PetResponse {
  id: number;
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  weight: number;
  sex: Sex;
  ownerId: number | null;
}

export interface PetPageResponse {
  content: PetResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export async function createPet(
  data: PetRequest
): Promise<PetResponse> {
  return apiFetch<PetResponse>("/pets", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getPets(
  page = 0,
  size = 10
): Promise<PetPageResponse> {
  return apiFetch<PetPageResponse>(
    `/pets?page=${page}&size=${size}`
  );
}

export async function getPetById(
  id: number
): Promise<PetResponse> {
  return apiFetch<PetResponse>(`/pets/${id}`);
}

export async function updatePet(
  id: number,
  data: PetRequest
): Promise<PetResponse> {
  return apiFetch<PetResponse>(`/pets/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deletePet(id: number): Promise<void> {
  await apiFetch<void>(`/pets/${id}`, {
    method: "DELETE",
  });
}

