import { client } from "@/lib/honoclient"
import { useQuery } from "@tanstack/react-query"
export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const response = await client.api.account.$get()
      if (!response.ok) {
        throw new Error("Failed to fetch accounts")
      }
      const { data } = await response.json()
      return data

    }

  })
  return query
}
