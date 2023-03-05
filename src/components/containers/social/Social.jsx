import { Link } from 'react-router-dom'
import { LinkSvg } from '../../../assets/svg'

const Social = ({ social }) => {
  const { nombre, descripcion, enlace, imagen } = social
  return (
    <article className='card-redes'>
      <div className='card-redes-top'>
        <Link to={enlace} target='_blank' rel='noreferrer'>
          <img src={imagen.secure_url} alt={nombre} className='card-redes-img' />
          <p>{nombre}</p>
        </Link>

        <Link to={enlace} className='btn'>
          <LinkSvg />
        </Link>
      </div>

      <p className='card-redes-texto'>{descripcion}</p>
    </article>
  )
}

export default Social
