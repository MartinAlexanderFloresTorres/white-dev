import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BarSvg } from '../../../assets/svg'
import Buscar from '../buscar/Buscar'
import './Header.css'

const Header = () => {
  // ESTADOS
  const [menu, setMenu] = useState(false)

  // USELOCATION
  const { pathname } = useLocation()

  // HANDLE MENU
  const handleMenu = () => {
    setMenu(!menu)
  }

  return (
    <header className='header'>
      <div className='container header__container'>
        <div className='header__left'>
          <Link to={'/'}>
            <img className='logo' src='/logo.png' alt='Logo' />
          </Link>
          <nav className={`header__nav ${menu ? 'open' : ''}`}>
            <Link to={'/proyectos'} className={pathname === '/proyectos' ? 'active' : ''}>
              Proyectos
            </Link>
            <Link to={'/redes'} className={pathname === '/redes' ? 'active' : ''}>
              Redes Sociales
            </Link>
          </nav>
        </div>

        <div className='header__rigth'>
          <Buscar />
        </div>

        <button className='header__menu' onClick={handleMenu}>
          <BarSvg />
        </button>
      </div>
    </header>
  )
}

export default Header
