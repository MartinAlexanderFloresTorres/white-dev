import { useState } from 'react'
import { put_actualizar } from '../services/api/socials'
import useAdmin from './useAdmin'

const useUpdateSocial = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { updateSocial, socials } = useAdmin()

  // FUNCIONES
  const actualizarSocial = async ({ id, nombre, enlace, descripcion, file }) => {
    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SI EL NOMBRE YA EXISTE, SE DETIENE
    if (socials.find((social) => social.nombre === nombre && social._id !== id)) {
      setError('El nombre ya existe')
      return
    }

    // SE ACTUALIZA EL SOCIAL
    try {
      setLoading(true)
      const { data } = await put_actualizar({ id, nombre, enlace, descripcion, file })
      // SINCRONIZAR LOS DATOS
      updateSocial(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { actualizarSocial, error, loading }
}

export default useUpdateSocial
