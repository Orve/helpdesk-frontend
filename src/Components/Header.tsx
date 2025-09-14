import { useMe } from '../queries/useMe'
import { useLogout } from '../mutations/useLogout'

function Header() {
  const { data: me, isLoading, isError } = useMe({
    retry: false,
  })
  const logout = useLogout()

  if (isLoading) return <div>読み込み中…</div>
  if (isError || !me) return <div>未ログイン</div>

  return (
    <div className="flex items-center justify-between p-4">
      <span>こんにちは、{me.name} さん！</span>
      <button onClick={() => logout.mutate()} className="text-sm bg-red-500 text-white px-3 py-1 rounded">
        ログアウト
      </button>
    </div>
  )
}
export default Header