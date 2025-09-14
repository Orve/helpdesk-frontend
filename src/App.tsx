import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Login from './pages/Login'
import TicketsPage from './pages/TicketsPage'
import DebugMe from './Components/DebugMe'
import RequireAuth from './routes/RequireAuth'
import { Navigate } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/tickets" replace />} />
         {/* 🔐 ログインが必要なページ */}
        <Route element={<RequireAuth />}>
          <Route path="/tickets" element={<TicketsPage />} />
          <Route path="/debugme" element={<DebugMe />} />
        </Route>
      </Routes>
    </>
  )
}

export default App