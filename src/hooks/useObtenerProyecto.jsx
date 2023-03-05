import { useEffect, useState } from 'react'
import { get_obtenerById } from '../services/api/proyectos'

const useObtenerProyecto = ({ url }) => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [proyecto, setProyecto] = useState({})

  // EFFECTS
  useEffect(() => {
    if (url) obtenerProyecto({ url })
  }, [])

  // FUNCIONES
  const obtenerProyecto = async ({ url }) => {
    // LIMPIAR ERROR
    setError('')

    // SE AGREGA EL SOCIAL
    try {
      setLoading(true)
      const { data } = await get_obtenerById({ url })
      setProyecto(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { proyecto, error, loading }
}

export default useObtenerProyecto
