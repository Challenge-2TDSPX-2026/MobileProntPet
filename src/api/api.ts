import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://10.0.2.2:8080";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await AsyncStorage.getItem("token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",

      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),

      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = `Erro na API: ${response.status}`;

    try {
      const errorData = await response.json();

      if (errorData?.message) {
        message = errorData.message;
      }
    } catch {
      try {
        const errorText = await response.text();

        if (errorText) {
          message = errorText;
        }
      } catch {
        // Mantém a mensagem padrão
      }
    }

    throw new ApiError(message, response.status);
  }

  // DELETE retorna 204 e não possui JSON
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

