// src/queries/useMe.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/axios'

export const useMe = (options = {}) => {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await api.get('/me')
      return data
    },
    retry: false,
    staleTime: 1000 * 60,
    ...options // 💡 1分くらいキャッシュ保持
  })
}
