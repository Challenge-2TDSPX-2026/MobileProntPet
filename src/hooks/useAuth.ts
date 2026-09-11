import { useMutation } from "@tanstack/react-query";

import {
  login,
  register,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../services/authService";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
}

export function useRegister() {
  return useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: register,
  });
}