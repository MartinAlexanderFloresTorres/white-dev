import Proyecto from '../components/containers/proyecto/Proyecto'
import useAdmin from '../hooks/useAdmin'
import Filtro from '../components/containers/filtro/Filtro'
import Paginate from '../components/containers/paginate/Paginate'
import CuyLoader from '../components/animations/CuyLoader'

const ProyectosPage = () => {
  // USE ADMIN
  const { proyectos, loadingProyectos } = useAdmin()

  return (
    <section className='container caja'>
      <section className='asidebar'>
        <Filtro />
        <section>
          {proyectos.length > 0 && <Paginate />}
          <div className='grid-bottom'>{loadingProyectos ? <CuyLoader /> : proyectos.length > 0 ? proyectos.map((proyecto) => <Proyecto key={proyecto._id} proyecto={proyecto} />) : <div className='alerta alerta-info'>No hay proyectos</div>}</div>
          {proyectos.length > 0 && <Paginate />}
        </section>
      </section>
    </section>
  )
}

export default ProyectosPage
