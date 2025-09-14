// src/routes/RequireAuth.tsx
import { useMe } from '../queries/useMe'
import { Navigate, Outlet } from 'react-router-dom'

export default function RequireAuth() {
  const { data: me, isLoading } = useMe()

  if (isLoading) return <p>判定中...</p>
  if (!me) return <Navigate to="/login" replace />

  return <Outlet />
}
