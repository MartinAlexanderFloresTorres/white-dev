import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SearchSvg } from '../../../assets/svg'

const Buscar = () => {
  // ESTADOS
  const [query, setQuery] = useState('')

  // USE SEARCH PARAMS
  const [searchParams] = useSearchParams()

  // OBTENER LOS PARAMETROS DE LA URL
  const tecnologiasQ = searchParams.getAll('tecnologias')

  // USENAVIGATE
  const navigate = useNavigate()

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { value } = e.target
    // REGEX
    const regex = /[^a-zA-Z0-9 ]/g // SOLO PERMITIR LETRAS Y NUMEROS
    // VALIDAR
    if (regex.test(value)) return
    setQuery(value.trimStart())
  }

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault()

    // REDIRECCIONAR
    navigate(`/proyectos?q=${query}&tecnologias=${tecnologiasQ}&page=1`)

    // LIMPIAR EL INPUT
    setQuery('')
  }

  return (
    <form className='formulario' onSubmit={handleSubmit}>
      <button type='submit' title='Buscar'>
        <SearchSvg />
      </button>
      <input type='search' value={query} onChange={handleChange} placeholder='Buscar' />
    </form>
  )
}

export default Buscar
