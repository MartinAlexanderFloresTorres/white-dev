import { useState } from 'react'
import { post_crear } from '../services/api/socials'
import useAdmin from './useAdmin'

const useNewSocial = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { addSocial, socials } = useAdmin()

  // FUNCIONES
  const newSocial = async ({ nombre, enlace, descripcion, file }) => {
    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SI EL NOMBRE YA EXISTE, SE DETIENE
    if (socials.find((social) => social.nombre === nombre)) {
      setError('El nombre ya existe')
      return
    }

    // SE AGREGA EL SOCIAL
    try {
      setLoading(true)
      const { data } = await post_crear({ nombre, enlace, descripcion, file })
      // SE AGREGA EL SOCIAL A LA LISTA
      addSocial(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { newSocial, error, loading }
}

export default useNewSocial
