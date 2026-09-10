
import { useMutation } from "@tanstack/react-query";

import {
  login,
  LoginRequest,
  LoginResponse,
} from "../services/authService";

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,
  });
}

