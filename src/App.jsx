import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Layout from './layouts/Layout'
import ProyectosPage from './pages/ProyectosPage'
import RedesPage from './pages/RedesPage'
import ProyectoPage from './pages/ProyectoPage'
import AutenticarPage from './pages/private/AutenticarPage'
import DasboardPage from './pages/private/DasboardPage'
import LayoutAdmin from './layouts/LayoutAdmin'
import AgregarProyectoPage from './pages/private/AgregarProyectoPage'
import NewSocial from './pages/private/NewSocial'
import TegnologiasPage from './pages/private/TegnologiasPage'
import AdminProvider from './providers/AdminProvider'
import EditarProyectoPage from './pages/private/EditarProyectoPage'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/proyectos' element={<ProyectosPage />} />
            <Route path='/proyectos/:url' element={<ProyectoPage />} />
            <Route path='/redes' element={<RedesPage />} />
          </Route>

          <Route path='admin' element={<LayoutAdmin />}>
            <Route index element={<AutenticarPage />} />
            <Route path='new-proyecto' element={<AgregarProyectoPage />} />
            <Route path='proyectos/editar/:url' element={<EditarProyectoPage />} />
            <Route path='new-social' element={<NewSocial />} />
            <Route path='tecnologias' element={<TegnologiasPage />} />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  )
}

export default App
