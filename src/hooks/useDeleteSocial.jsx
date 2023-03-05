import { useState } from 'react'
import { delete_eliminar } from '../services/api/socials'
import useAdmin from './useAdmin'

const useDeleteSocial = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { deleteSocial } = useAdmin()

  // FUNCIONES
  const eliminarSocial = async ({ id }) => {
    // CONFIRMAR ELIMINACION
    const confirm = window.confirm('¿Estas seguro de eliminar esta red social?')
    if (!confirm) return

    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SE ELIMINA EL SOCIAL
    try {
      setLoading(true)
      await delete_eliminar({ id })
      // SE ACTUALIZAR EL ESTADO DE SOCIALS
      deleteSocial({ id })
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { eliminarSocial, error, loading }
}

export default useDeleteSocial
