import { LinkSvg } from '../../../assets/svg'

const Instructor = ({ instructor }) => {
  const { nombre, imagen, descripcion, url } = instructor
  return (
    <div className='instructor__item'>
      <img src={imagen} alt={nombre} />
      <div className='instructor__info'>
        <div className='instructor__item-titulo'>{nombre}</div>

        <p className='instructor__item-descripcion'>{descripcion}</p>

        <a className='instructor__visitar' href={url} target='_blank' rel='noreferrer'>
          <LinkSvg />
        </a>
      </div>
    </div>
  )
}

export default Instructor
