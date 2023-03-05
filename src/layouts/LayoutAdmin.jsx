import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '../components/containers/header/Header'
import Footer from '../components/containers/footer/Footer'
import useAdmin from '../hooks/useAdmin'
import CuyLoader from '../components/animations/CuyLoader'
import useAutoLogin from '../hooks/useAutoLogin'

const LayoutAdmin = () => {
  // USELOCATION
  const { pathname } = useLocation()

  // USE AUTOLOGIN
  const { error } = useAutoLogin()

  // USE ADMIN
  const { loadingaAuth, autenticado } = useAdmin()

  if (loadingaAuth) {
    return (
      <div className='caja'>
        <CuyLoader />
      </div>
    )
  }

  if (error) {
    return (
      <div className='caja'>
        <div className='alerta alerta-error'>{error}</div>
      </div>
    )
  }

  if (!autenticado) {
    if (pathname !== '/admin') {
      return <Navigate to='/' />
    }
  }

  return (
    <>
      <Header />

      {pathname !== '/admin' && (
        <section className='botones'>
          <Link to={'/admin/new-proyecto'} className={`btn ${pathname === '/admin/new-proyecto' ? 'btn-verde' : 'btn-active'}`}>
            New Proyecto
          </Link>
          <Link to={'/admin/new-social'} className={`btn ${pathname === '/admin/new-social' ? 'btn-verde' : 'btn-active'}`}>
            New Social
          </Link>
          <Link to={'/admin/tecnologias'} className={`btn ${pathname === '/admin/tecnologias' ? 'btn-verde' : 'btn-active'}`}>
            Tecnologias
          </Link>
        </section>
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default LayoutAdmin
