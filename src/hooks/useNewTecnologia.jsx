import { useState } from 'react'
import { post_crear } from '../services/api/tecnologias'
import useAdmin from './useAdmin'

const useNewTecnologia = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { addTecnologia, tecnologias } = useAdmin()

  // FUNCIONES
  const newTecnologia = async ({ nombre, file }) => {
    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SI LA TECONOLOGIA YA EXISTE, NO SE AGREGA
    if (tecnologias.find((t) => t.nombre.toLocaleLowerCase().trim() === nombre.toLocaleLowerCase().trim())) {
      setError('La tecnologia ya existe')
      return
    }

    // SE AGREGA LA TECNOLOGIA
    try {
      setLoading(true)
      const { data } = await post_crear({ nombre, file })
      // SE AGREGA LA TECNOLOGIA AL ESTADO
      addTecnologia(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { newTecnologia, error, loading }
}

export default useNewTecnologia
