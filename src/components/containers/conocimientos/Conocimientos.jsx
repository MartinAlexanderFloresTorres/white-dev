import useAdmin from '../../../hooks/useAdmin'
import DotLoader from '../../animations/DotLoader'
import './Conocimientos.css'

const Conocimientos = () => {
  // USE ADMIN
  const { tecnologias, loadingTecnologias } = useAdmin()

  return (
    <div className='conocimientos'>
      <div className='grid-top'>
        <h2 className='titulo'>Conocimientos</h2>
      </div>

      {loadingTecnologias ? (
        <DotLoader />
      ) : (
        <div className='conocimientos-grid'>
          {tecnologias.map((tecnologia) => (
            <div className='conocimiento__item' key={tecnologia._id}>
              <img src={tecnologia.imagen.secure_url} alt={tecnologia.nombre} />
              <div className='conocimiento__item-titulo'>{tecnologia.nombre}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Conocimientos
