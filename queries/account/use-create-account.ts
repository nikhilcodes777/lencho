import { client } from "@/lib/honoclient"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { InferResponseType, InferRequestType } from "hono"

type ResponseType = InferResponseType<typeof client.api.account.$post>
type RequestType = InferRequestType<typeof client.api.account.$post>

export const useCreateAccount = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.account.$post({ json })
      return response.json()
    },
    onSuccess: () => {
      // TODO: Invalidate other queries
      queryClient.invalidateQueries({ queryKey: ["accounts"] })

    },
    onError: () => {
      // TODO: Show Toasts
    }

  })
  return mutation
}
