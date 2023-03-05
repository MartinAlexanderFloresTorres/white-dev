import { useSearchParams } from 'react-router-dom'
import useAdmin from '../../../hooks/useAdmin'
import { ChevronLeftSvg, ChevronRightSvg } from '../../../assets/svg'

const Paginate = () => {
  // USE ADMIN
  const { totalPages } = useAdmin()

  // USE SEARCH PARAMS
  const [searchParams, setSearchParams] = useSearchParams()

  const pageQ = Number(searchParams.getAll('page')) || 1
  const queryQ = searchParams.getAll('q')
  const tecnologiasQ = searchParams.getAll('tecnologias')

  // HANDLE CHANGE PAGE
  const handleNextPage = () => {
    setSearchParams({ q: queryQ, tecnologias: tecnologiasQ, page: pageQ + 1 })
  }

  const handlePrevPage = () => {
    setSearchParams({ q: queryQ, tecnologias: tecnologiasQ, page: pageQ > 1 ? pageQ - 1 : 1 })
  }

  return (
    <div className='paginador'>
      <button className='btn btn-gray' onClick={handlePrevPage} disabled={pageQ <= 1}>
        <ChevronLeftSvg />
      </button>

      <button className='btn btn-gray' onClick={handleNextPage} disabled={pageQ >= totalPages}>
        <ChevronRightSvg />
      </button>
    </div>
  )
}

export default Paginate
