import { useState } from 'react'
import { put_actualizar } from '../services/api/tecnologias'
import useAdmin from './useAdmin'

const useUpdateTecnologia = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { updateTecnologia: updateTecnologiaState, tecnologias } = useAdmin()

  // FUNCIONES
  const updateTecnologia = async ({ nombre, file, id, public_id }) => {
    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SI LA TECONOLOGIA YA EXISTE, NO SE AGREGA PERO SI ES LA MISMA SE ACTUALIZA
    if (tecnologias.find((t) => t.nombre.toLocaleLowerCase().trim() === nombre.toLocaleLowerCase().trim() && t._id !== id)) {
      setError('La tecnologia ya existe')
      return
    }

    // SE ACTUALIZA LA TECNOLOGIA
    try {
      setLoading(true)
      const { data } = await put_actualizar({ nombre, file, id, public_id })
      // SE ACTUALIZAR EL ESTADO DE TECNOLOGIAS
      updateTecnologiaState(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { updateTecnologia, error, loading }
}

export default useUpdateTecnologia
