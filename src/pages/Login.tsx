// src/pages/Login.tsx
import { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/axios'
import { useQueryClient } from '@tanstack/react-query'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.get('http://localhost:8000/sanctum/csrf-cookie', {
        withCredentials: true,
      })
      await api.post('/auth/login', 
        {
          email,
          password,
        }, {
          withCredentials: true,
          headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    ) // ← これも必要

      // me 情報再取得（キャッシュ更新 or Zustand更新）
      await queryClient.invalidateQueries({ queryKey: ['me'] })
      navigate('/tickets') // ログイン後のリダイレクト先
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string; errors?: Record<string, string[]> }>
      const msg =
        error?.response?.data?.message || // Laravel全体のエラー
        error?.response?.data?.errors?.email?.[0] || // emailだけのバリデーション
        error?.response?.data?.errors?.password?.[0] || // passwordのバリデーション
        'ログインに失敗しました'

      setError(msg)
      console.error('login error:', error?.response ?? err)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">ログイン</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          ログイン
        </button>
      </form>
    </div>
  )
}
