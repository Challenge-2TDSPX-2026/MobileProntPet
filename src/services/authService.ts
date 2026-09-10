
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiFetch } from "../api/api";

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

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem("token");
}

