import { useState } from 'react'
import { delete_eliminar } from '../services/api/proyectos'
import useAdmin from './useAdmin'

const useDeleteProyecto = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { deleteProyecto } = useAdmin()

  // FUNCIONES
  const eliminarProyecto = async ({ id }) => {
    // CONFIRMAR ELIMINACION
    const confirm = window.confirm('¿Estas seguro de eliminar esta red social?')
    if (!confirm) return

    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SE ELIMINA EL PROYECTO
    try {
      setLoading(true)
      await delete_eliminar({ id })
      // SE ACTUALIZAR EL ESTADO DE PROYECTOS
      deleteProyecto({ id })
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { eliminarProyecto, error, loading }
}

export default useDeleteProyecto
