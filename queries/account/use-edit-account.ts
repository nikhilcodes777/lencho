import { client } from "@/lib/honoclient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"

type ResponseType = InferResponseType<typeof client.api.account[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.account[":id"]["$patch"]>

export const useEditAccount = (id?: string) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.account[":id"]["$patch"]({ json, param: { id } })
      return response.json()
    },
    onSuccess: () => {
      // TODO: Invalidate other queries
      queryClient.invalidateQueries({ queryKey: ["account", { id }] })
      queryClient.invalidateQueries({ queryKey: ["accounts"] })

    },
    onError: () => {
      // TODO: Show Toasts
    }

  })
  return mutation
}
