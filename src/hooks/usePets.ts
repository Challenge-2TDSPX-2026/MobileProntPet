import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createPet,
  deletePet,
  getPetById,
  getPets,
  updatePet,
  PetRequest,
  getMyPets
} from "../services/petService";

export function usePets(page = 0, size = 10) {
  return useQuery({
    queryKey: ["pets", page, size],
    queryFn: () => getPets(page, size),
  });
}

export function usePet(id: number) {
  return useQuery({
    queryKey: ["pet", id],
    queryFn: () => getPetById(id),
    enabled: !!id,
  });
}


export function useMyPets(page = 0, size = 10) {
  return useQuery({
    queryKey: ["myPets", page, size],
    queryFn: () => getMyPets(page, size),
  });
}

export function useCreatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PetRequest) => createPet(data),

    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ["myPets"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["pets"],
      });
    },
  });
}

export function useUpdatePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: PetRequest;
    }) => updatePet(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["pets"],
      });

      queryClient.invalidateQueries({
        queryKey: ["pet", variables.id],
      });
    },
  });
}


export function useDeletePet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePet(id),

    onSuccess: async (_, id) => {
      await queryClient.invalidateQueries({
        queryKey: ["myPets"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["pets"],
      });

      queryClient.removeQueries({
        queryKey: ["pet", id],
      });
    },

    onError: (error: any) => {
      console.error("Erro ao deletar pet:", error);

      if (error?.status === 409) {
        console.log("Pet possui consulta agendada.");
      }
    },
  });
}


