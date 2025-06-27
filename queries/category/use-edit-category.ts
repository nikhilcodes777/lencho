import { client } from "@/lib/honoclient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"

type ResponseType = InferResponseType<typeof client.api.category[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.category[":id"]["$patch"]>

export const useEditCategory = (id?: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.category[":id"]["$patch"]({ json, param: { id } })
      return response.json()
    },
    onSuccess: () => {
      // TODO: Invalidate other queries
      queryClient.invalidateQueries({ queryKey: ["category", { id }] })
      queryClient.invalidateQueries({ queryKey: ["categories"] })

    },
    onError: () => {
      // TODO: Show Toasts
    }

  })
  return mutation
}
