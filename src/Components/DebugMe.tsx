// DebugMe.tsx
import { useMe } from '../queries/useMe'

export default function DebugMe() {
  const { data, isLoading, isError } = useMe()

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>❌ error</p>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
