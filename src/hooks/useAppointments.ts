import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createAppointment,
  getAppointments,
  getClinics,
  AppointmentCreateRequest,
} from "../services/appointmentService";

export function useClinics() {
  return useQuery({
    queryKey: ["clinics"],
    queryFn: getClinics,
  });
}

export function useAppointments() {
  return useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AppointmentCreateRequest) =>
      createAppointment(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"],
      });
    },
  });
}