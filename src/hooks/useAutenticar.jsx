import { useState } from 'react'
import { post_autenticar } from '../services/api/usuarios'
import { useNavigate } from 'react-router-dom'
import useAdmin from './useAdmin'

const useAutenticar = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USE NAVIGATE
  const navigate = useNavigate()

  // USE ADMIN
  const { setAutenticado } = useAdmin()

  // FUNCIONES
  const autenticar = async ({ email, password }) => {
    // LIMPIAR ERROR
    setError('')

    // SE AGREGA EL SOCIAL
    try {
      setLoading(true)
      const { data } = await post_autenticar({ email, password })
      localStorage.setItem('_token_admin_white_dev', data.token)

      // REDIRECCIONAR
      navigate('/admin/new-proyecto')
      setAutenticado(true)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { autenticar, error, loading }
}

export default useAutenticar
