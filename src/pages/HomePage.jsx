import { Link } from 'react-router-dom'
import Presentacion from '../components/containers/presentacion/Presentacion'
import Proyecto from '../components/containers/proyecto/Proyecto'
import useAdmin from '../hooks/useAdmin'
import useFiltros from '../hooks/useFiltros'
import Paginate from '../components/containers/paginate/Paginate'
import CuyLoader from '../components/animations/CuyLoader'
import { ChevronRightSvg } from '../assets/svg'

const HomePage = () => {
  // USE ADMIN
  const { proyectos, loadingProyectos } = useAdmin()

  // USE FILTROS
  useFiltros()

  return (
    <section className='container caja'>
      <Presentacion />

      <section className='container-grid'>
        <div className='grid-top'>
          <h2 className='titulo'>Proyectos</h2>
          <Link to={'/proyectos?page=1'} className='btn btn-gray'>
            <ChevronRightSvg />
          </Link>
        </div>

        <div className='grid-bottom'>{loadingProyectos ? <CuyLoader /> : proyectos.length > 0 ? proyectos.map((proyecto) => <Proyecto key={proyecto._id} proyecto={proyecto} />) : <div className='alerta alerta-info'>No hay proyectos</div>}</div>

        {proyectos.length > 0 && <Paginate />}
      </section>
    </section>
  )
}

export default HomePage
