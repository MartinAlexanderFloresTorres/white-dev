import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiltroSvg } from '../../../assets/svg'
import useAdmin from '../../../hooks/useAdmin'
import useFiltros from '../../../hooks/useFiltros'

const Filtro = () => {
  // USE ADMIN
  const { tecnologias, loadingTecnologias } = useAdmin()
  const [tecnologiasSeleccionadas, setTecnologiasSeleccionadas] = useState([])

  // USE SEARCH PARAMS
  const [, setSearchParams] = useSearchParams()

  // USE FILTROS
  const { tecnologiasQ, queryQ, pageQ } = useFiltros()

  // USE EFFECT
  useEffect(() => {
    if (tecnologiasQ.length > 0) {
      // OBTENER EL ARRAY DE TECNOLOGIAS
      const tecnologiasArray = tecnologiasQ[0].split(',')
      setTecnologiasSeleccionadas(tecnologiasArray)
    }

    if (!pageQ | (pageQ < 0)) {
      setSearchParams({ q: queryQ, tecnologias: tecnologiasQ, page: 1 })
    }
  }, [])

  // HANDLE CHANGE TECNOLOGIA
  const handleChangeTecnologia = (tecnologia) => {
    if (tecnologiasQ.length > 0) {
      // OBTENER EL ARRAY DE TECNOLOGIAS
      const tecnologiasArray = tecnologiasQ[0].split(',')
      // OBTENER EL INDEX DE LA TECNOLOGIA EN EL ARRAY
      const index = tecnologiasArray.indexOf(tecnologia._id)

      // Si no esta en el array, lo agregamos
      if (index === -1) {
        tecnologiasArray.push(tecnologia._id)
      } else {
        // Si esta en el array, lo eliminamos
        tecnologiasArray.splice(index, 1)
      }

      // CONVERTIR EL ARRAY EN STRING Y REEMPLAZAR LA PRIMERA COMA POR NADA
      const tecnologiasString = tecnologiasArray.join(',').replace(/^,/, '')
      setSearchParams({ q: queryQ, tecnologias: tecnologiasString, page: 1 })

      setTecnologiasSeleccionadas(tecnologiasArray)
      return
    }

    setTecnologiasSeleccionadas([tecnologia._id])
    setSearchParams({ q: queryQ, tecnologias: tecnologia._id, page: 1 })
  }

  // HANDLE RESET
  const handleReset = () => {
    setSearchParams({ page: 1 })
    setTecnologiasSeleccionadas([])
  }

  return (
    <aside className='asidebar-aside'>
      <div className='asidebar-flex'>
        <h3>Filtrar por</h3>
        <FiltroSvg />
      </div>

      <div className='asidebar-aside__content'>
        {loadingTecnologias ? (
          <div className='spinner'>
            <span>L</span>
            <span>O</span>
            <span>A</span>
            <span>D</span>
            <span>I</span>
            <span>N</span>
            <span>G</span>
          </div>
        ) : tecnologias.length > 0 ? (
          <div className='asidebar-aside__tecnologias'>
            {tecnologias.map((tecnologia) => (
              <button key={tecnologia._id} className={tecnologiasSeleccionadas.includes(tecnologia._id) ? 'btn-gray' : ''} onClick={() => handleChangeTecnologia(tecnologia)}>
                <img src={tecnologia.imagen.secure_url} alt='tecnologia' />
                <span>{tecnologia.nombre}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className='alerta alerta-info'>No hay tecnologias</div>
        )}

        <button onClick={handleReset} className='btn btn-gray'>
          Restablecer
        </button>
      </div>
    </aside>
  )
}

export default Filtro
