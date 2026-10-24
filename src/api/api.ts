import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "https://javaprontpet.onrender.com";

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
    const responseBody = await response.text();

    console.log("Erro HTTP:", response.status);
    console.log("Corpo da resposta:", responseBody);

    let message = `Erro na API: ${response.status}`;

    if (responseBody) {
      try {
        const errorData = JSON.parse(responseBody);

        message =
          errorData?.message ??
          errorData?.detail ??
          errorData?.error ??
          responseBody;
      } catch {
        message = responseBody;
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

