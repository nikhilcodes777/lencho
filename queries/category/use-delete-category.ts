import { client } from "@/lib/honoclient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"

type ResponseType = InferResponseType<typeof client.api.category.delete.$post>
type RequestType = InferRequestType<typeof client.api.category.delete.$post>

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.category.delete.$post({ json })
      return response.json()
    },
    onSuccess: () => {
      // TODO: Invalidate other queries
      queryClient.invalidateQueries({ queryKey: ["categories"] })

    },
    onError: () => {
      // TODO: Show Toasts
    }

  })
  return mutation
}
