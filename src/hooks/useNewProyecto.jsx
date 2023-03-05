import { useState } from 'react'
import { post_crear } from '../services/api/proyectos'
import useAdmin from './useAdmin'

const useNewProyecto = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { addProyecto, proyectos } = useAdmin()

  // FUNCIONES
  const newProyecto = async ({ file, nombre, repositorio, web, descripcion, contenido, tecnologias }) => {
    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SI EL PROYECTO YA EXISTE, NO SE AGREGA
    if (proyectos.find((p) => p.nombre.toLocaleLowerCase().trim() === nombre.toLocaleLowerCase().trim())) {
      setError('El proyecto ya existe')
      return
    }

    // SE AGREGA LA TECNOLOGIA
    try {
      setLoading(true)
      const { data } = await post_crear({ file, nombre, repositorio, web, descripcion, contenido, tecnologias })
      // SE AGREGA LA TECNOLOGIA AL ESTADO
      addProyecto(data)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { newProyecto, error, loading }
}

export default useNewProyecto
