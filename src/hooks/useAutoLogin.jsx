import { useEffect, useState } from 'react'
import { get_auto_login } from '../services/api/usuarios'
import { useLocation, useNavigate } from 'react-router-dom'
import useAdmin from './useAdmin'

const useAutoLogin = () => {
  // ESTADOS
  const [error, setError] = useState('')

  // USE ADMIN
  const { setAutenticado, setLoadingaAuth } = useAdmin()

  // USE LOCATION
  const { pathname } = useLocation()

  // USE NAVIGATE
  const navigate = useNavigate()

  // FUNCIONES
  const autenticar = async () => {
    // LIMPIAR ERROR
    setError('')

    const token = localStorage.getItem('_token_admin_white_dev')
    if (!token) {
      setAutenticado(false)
      setLoadingaAuth(false)
      return
    }
    // SE AGREGA EL SOCIAL
    try {
      setLoadingaAuth(true)
      await get_auto_login()
      // REDIRECCIONAR
      if (pathname === '/admin') navigate('/admin/new-proyecto')
      setAutenticado(true)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
      localStorage.removeItem('_token_admin_white_dev')
      setAutenticado(false)
    }
    setLoadingaAuth(false)
  }

  useEffect(() => {
    autenticar()
  }, [])

  return { error }
}

export default useAutoLogin
