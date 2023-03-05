import { Outlet } from 'react-router-dom'
import Header from '../components/containers/header/Header'
import Footer from '../components/containers/footer/Footer'

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
