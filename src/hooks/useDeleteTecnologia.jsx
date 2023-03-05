import { useState } from 'react'
import { delete_eliminar } from '../services/api/tecnologias'
import useAdmin from './useAdmin'

const useDeleteTecnologia = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { deleteTecnologia } = useAdmin()

  // FUNCIONES
  const eliminarTecnologia = async ({ id }) => {
    // CONFIRMAR ELIMINACION
    const confirm = window.confirm('¿Estas seguro de eliminar la tecnologia?')
    if (!confirm) return

    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SE ELIMINA LA TECNOLOGIA
    try {
      setLoading(true)
      await delete_eliminar({ id })
      // SE ACTUALIZAR EL ESTADO DE TECNOLOGIAS
      deleteTecnologia({ id })
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { eliminarTecnologia, error, loading }
}

export default useDeleteTecnologia
