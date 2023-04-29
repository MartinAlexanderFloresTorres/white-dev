import './Presentacion.css'

const Presentacion = () => {
  return (
    <section className='presentacion'>
      <div className='presentacion__left'>
        <h1 className='titulo'>whitecode.dev</h1>

        <p>
          ¡Hola! Soy{' '}
          <span className='presentacion__left--name'>Martín Alexander Flores Torres</span>, un
          desarrollador web y apasionado por la tecnología. Me encanta crear cosas nuevas y aprender
          cosas nuevas. Siempre estoy buscando nuevas formas de mejorar mis habilidades y aprender
          nuevas tecnologías.
        </p>

        <p>
          Me encanta trabajar en equipo y aprender de los demás. Me considero una persona muy
          responsable y comprometida con mis proyectos.
        </p>

        <div className='presentacion__botones'>
          <a
            href='/Martin_Alexander_Flores_Torres.pdf'
            target='_blank'
            className='presentacion__cv'
          >
            Ver CV
          </a>
          <a href='/Martin_Alexander_Flores_Torres.pdf' download className='presentacion__cv'>
            📃 Descarga CV
          </a>
        </div>
      </div>

      <div className='presentacion__rigth'>
        <a href='https://www.youtube.com/@whitecode21' target='_blank' rel='noreferrer'>
          <img src='/svg/youtube.svg' alt='youtube' />
        </a>
        <a href='https://www.instagram.com/martin_flores_28' target='_blank' rel='noreferrer'>
          <img src='/svg/instagram.svg' alt='youtube' />
        </a>
        <a href='https://www.facebook.com/garena.flores.9' target='_blank' rel='noreferrer'>
          <img src='/svg/facebook.svg' alt='youtube' />
        </a>
        <a
          href='https://www.linkedin.com/in/martin-alexander-flores-torres-993298245'
          target='_blank'
          rel='noreferrer'
        >
          <img src='/svg/linkedin.svg' alt='youtube' />
        </a>
      </div>
    </section>
  )
}

export default Presentacion
