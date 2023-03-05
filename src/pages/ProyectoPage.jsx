import { useParams } from 'react-router-dom'
import { TrixEditor } from 'react-trix'
import { Link, useLocation } from 'react-router-dom'
import useObtenerProyecto from '../hooks/useObtenerProyecto'
import { get_DMY } from '../helpers'
import { ChevronLeftSvg, GithubSvg, LinkSvg } from '../assets/svg'
import '../css/ProyectoPage.css'
import CuyLoader from '../components/animations/CuyLoader'

const ProyectoPage = () => {
  // USELOCATION
  const { state } = useLocation()

  // USE PARAMS
  const { url } = useParams()

  // USE OBTENER PROYECTO
  const { proyecto, loading, error } = useObtenerProyecto({ url })

  if (loading) return <CuyLoader />

  if (error) {
    return (
      <div className='caja'>
        <div className='container alerta alerta-error'>{error}</div>
      </div>
    )
  }
  return (
    <article className='container caja proyecto'>
      <Link to={state ? state.pathname : '/proyectos'} className='btn btn--volver'>
        <ChevronLeftSvg />
        Volver
      </Link>
      <section className='proyecto__top'>
        <div>
          <a href={proyecto.imagen.secure_url} target='_blank' rel='noreferrer'>
            <img src={proyecto.imagen.secure_url} alt='proyecto' />
          </a>
          <div>
            <h2>{proyecto.nombre}</h2>
            <a className='proyecto__enlace' href={proyecto.web} target='_blank' rel='noreferrer'>
              Visitar sitio web
              <LinkSvg />
            </a>
          </div>
        </div>

        <a href={proyecto.repositorio} target='_blank' rel='noreferrer' className='btn'>
          Ver codigo
          <GithubSvg />
        </a>
      </section>
      <div className='proyecto__imagen'>
        <a href={proyecto.imagen.secure_url} target='_blank' rel='noreferrer' title='Abrir imagen'>
          <img src={proyecto.imagen.secure_url} alt='proyecto' />
        </a>
      </div>

      <div className='proyecto__descripcion'>
        <p>{proyecto.descripcion}</p>

        <div>
          <p>
            Publicado: <b>{get_DMY(proyecto.createdAt)}</b>
          </p>
          <p>
            Actualizado: <b>{get_DMY(proyecto.updatedAt)}</b>
          </p>
        </div>
      </div>

      <div className='proyecto__contenido'>
        <p className='proyecto__fecha'>Actualizado por ultima vez el {get_DMY(proyecto.updatedAt)}</p>
        <div className='proyecto__trixEditor'>
          <TrixEditor value={proyecto.contenido} />
        </div>
      </div>
    </article>
  )
}

export default ProyectoPage
