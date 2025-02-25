import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/Rootlayout'
import Type from './pages/Type'
import Home from './components/Home'
import AuthPage from './auth/AuthPage'
function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="type" element={<Type />} />
        <Route path="multiplayer" element={<AuthPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
