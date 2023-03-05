import { Link } from 'react-router-dom'
import { get_DMY } from '../../../helpers'
import useDeleteProyecto from '../../../hooks/useDeleteProyecto'
import { LinkSvg } from '../../../assets/svg'

const Proyecto = ({ proyecto, editar }) => {
  const { nombre, url, descripcion, tecnologias, imagen, createdAt } = proyecto

  // USE DELETE PROYECTO
  const { eliminarProyecto, error, loading } = useDeleteProyecto()

  if (!editar) {
    return (
      <div className='card'>
        <Link to={`/proyectos/${url}`}>
          <img className='card-imagen' src={imagen.secure_url} alt='proyecto' />
          <div className='card-container'>
            <div className='card-info'>
              <h3 title={nombre}>{nombre}</h3>
              <p>
                {tecnologias.map((tecnologia) => (
                  <span key={tecnologia._id}>#{tecnologia.nombre} </span>
                ))}
              </p>
            </div>
            <p className='card-descripcion' title={descripcion}>
              {descripcion}
            </p>

            <div className='card-bottom'>
              <div className='card-tecnologias'>
                {tecnologias.map((tecnologia) => (
                  <img title={tecnologia?.nombre} key={tecnologia?._id} src={tecnologia?.imagen?.secure_url} alt='tecnologia' />
                ))}
              </div>

              <p className='card-fecha'>{get_DMY(createdAt)}</p>
            </div>
          </div>
        </Link>

        <a className='card-flex' href={proyecto.web} target='_blank' rel='noreferrer'>
          Visitar
          <LinkSvg />
        </a>
      </div>
    )
  }

  return (
    <div className='card'>
      <a className='card-flex' href={proyecto.web} target='_blank' rel='noreferrer'>
        Visitar
        <LinkSvg />
      </a>
      <img className='card-imagen' src={imagen.secure_url} alt='proyecto' />
      <div className='card-container'>
        <div className='card-info'>
          <h3 title={nombre}>{nombre}</h3>
          <p>
            {tecnologias.map((tecnologia) => (
              <span key={tecnologia._id}>#{tecnologia.nombre} </span>
            ))}
          </p>
        </div>
        <p className='card-descripcion' title={descripcion}>
          {descripcion}
        </p>

        <div className='card-bottom'>
          <div className='card-tecnologias'>
            {tecnologias.map((tecnologia) => (
              <img title={tecnologia?.nombre} key={tecnologia?._id} src={tecnologia?.imagen?.secure_url} alt='tecnologia' />
            ))}
          </div>

          <p className='card-fecha'>{get_DMY(createdAt)}</p>
        </div>
      </div>

      <div className='botones'>
        <Link to={`/proyectos/${url}`} className='btn btn-gray'>
          Ver
        </Link>
        <Link to={`/admin/proyectos/editar/${proyecto.url}`} className='btn btn-verde'>
          Editar
        </Link>

        <button className='btn btn-rojo' onClick={() => eliminarProyecto({ id: proyecto._id })}>
          {loading ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  )
}

export default Proyecto
