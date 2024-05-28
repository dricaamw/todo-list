import { useMutation, useQuery } from "@tanstack/react-query";
import { API, queryClient } from "../services";

export const useBuscarCategorias = () => {
    return useQuery({
        queryKey: ["categorias"],
        queryFn: async () => {
            const request = await API.get('/categorias');
            return request.data;
        }
    })
};

export const useBuscarTarefas = () => {
    return useQuery({
        queryKey: ["tarefas"],
        queryFn: async () => {
            const request = await API.get('/tarefas');
            return request.data;
        }
    })
};

export const useCriarTarefa = () => {
    return useMutation({
        mutationFn: async (dados) => {
            const request = await API.post('/tarefas', dados);
            return request.data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries ({
            queryKeys: ['tarefas']
                  
        })
    } 
});
}

export const useDeletarTarefa = () => {
    return useMutation({
        mutationFn: async (id) => {
            const request = await API.delete(`/tarefas/${id}`);
            return request.data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries ({
            queryKeys: ['tarefas']
                  
        })
    } 
});
}