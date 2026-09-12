import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "../api/api";

// ==========================
// LOGIN
// ==========================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  await AsyncStorage.setItem("token", response.token);

  return response;
}

// ==========================
// CADASTRO
// ==========================

export interface OwnerRequest {
  name: string;
  email:string;
  cpf: string;
  phone: string;
}

export interface ClinicRequest {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  openingHours: string;
  closingHours: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: "ROLE_USER" | "ROLE_VET";
  owner?: OwnerRequest;
  clinic?: ClinicRequest;
}

export interface RegisterResponse {
  id: number;
  email: string;
  role: string;
}

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  return apiFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ==========================
// LOGOUT
// ==========================

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem("token");
}