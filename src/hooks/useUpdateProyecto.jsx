import { useState } from 'react'
import { put_actualizar } from '../services/api/proyectos'
import useAdmin from './useAdmin'
import { useNavigate } from 'react-router-dom'

const useUpdateProyecto = () => {
  // ESTADOS
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // USEADMIN
  const { updateProyecto, proyectos } = useAdmin()

  // USE NAVIGATE
  const navigate = useNavigate()

  // FUNCIONES
  const actualizarProyecto = async ({ id, file, nombre, repositorio, web, descripcion, contenido, tecnologias }) => {
    // LIMPIAR ERROR
    setError('')

    // SI ESTA CARGANDO, SE DETIENE
    if (loading) return

    // SI EL NOMBRE YA EXISTE, SE DETIENE
    if (proyectos.find((p) => p.nombre === nombre && p._id !== id)) {
      setError('El nombre ya existe')
      return
    }

    // SE ACTUALIZA EL PROYECTO
    try {
      setLoading(true)
      const { data } = await put_actualizar({ id, file, nombre, repositorio, web, descripcion, contenido, tecnologias })
      // SINCRONIZAR LOS DATOS
      updateProyecto(data)
      // REDIRECIONAR
      navigate(`/proyectos/${data.url}`)
    } catch (error) {
      console.log(error)
      const { msg } = error?.response?.data
      setError(msg)
    }
    setLoading(false)
  }

  return { actualizarProyecto, error, loading }
}

export default useUpdateProyecto
