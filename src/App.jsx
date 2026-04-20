import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import ChatBox from './components/ChatBox.jsx'
import Login from './components/Login.jsx'
import Quiz from './components/Quiz.jsx'
import './styles/App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [page, setPage] = useState('chat') // 'chat' | 'quiz' | 'login'
  const [user, setUser] = useState(null)

  const handleLogin = (userData) => {
    setUser(userData)
    setPage('chat')
  }

  const handleNavigate = (target) => {
    if (target === 'chat' && !user) {
      setPage('login')
    } else {
      setPage(target)
    }
    setSidebarOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    setPage('chat')
  }

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNavigate={handleNavigate}
        currentPage={page}
        user={user}
        onLogout={handleLogout}
      />

      <main className="main-content">
        {page === 'login' && (
          <Login onLogin={handleLogin} />
        )}
        {page === 'quiz' && (
          <Quiz />
        )}
        {page === 'chat' && (
          <ChatBox
            onMenuClick={() => setSidebarOpen(true)}
            user={user}
            onLoginRequest={() => setPage('login')}
          />
        )}
      </main>
    </div>
  )
}

export default App