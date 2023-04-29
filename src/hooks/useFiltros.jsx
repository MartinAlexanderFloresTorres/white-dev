import { useSearchParams } from 'react-router-dom'
import { get_filtrar } from '../services/api/proyectos'
import useAdmin from './useAdmin'
import { useEffect } from 'react'

const useFiltros = () => {
  // USE ADMIN
  const { setProyectos, setTotalPages, setLoadingProyectos } = useAdmin()

  // USE SEARCH PARAMS
  const [searchParams] = useSearchParams()

  // OBTENER LOS PARAMETROS DE LA URL
  const tecnologiasQ = searchParams.getAll('tecnologias')
  const queryQ = searchParams.getAll('q')
  const pageQ = searchParams.getAll('page')[0]

  useEffect(() => {
    ;(async () => {
      try {
        setLoadingProyectos(true)
        const { data } = await get_filtrar({
          tecnologias: tecnologiasQ,
          query: queryQ,
          page: pageQ
        })
        setProyectos(data.docs)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.log(error)
      }
      setLoadingProyectos(false)
    })()
  }, [searchParams])

  return { tecnologiasQ, queryQ, pageQ }
}

export default useFiltros
