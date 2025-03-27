import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import Home from './components/Home'
import AuthPage from './auth/AuthPage'
import TypingTest from './pages/TypingTest.jsx'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="type" element={<TypingTest />} />
        <Route path="multiplayer" element={<AuthPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
