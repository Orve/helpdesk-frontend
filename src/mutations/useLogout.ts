// src/mutations/useLogout.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/axios'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['me'] }) // ログイン情報削除
      navigate('/login') // ログイン画面へGO
    },
  })
}
