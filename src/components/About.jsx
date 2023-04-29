import { EmailSvg, GithubSvg, LinkedinSvg } from '../assets/svg'

const About = () => {
  return (
    <div className='about'>
      <div className='about__usuario'>
        <img
          src='https://scontent.flim2-2.fna.fbcdn.net/v/t39.30808-1/332489906_1567227573690963_1947827908784445962_n.jpg?stp=dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=X9lTR5ONVFMAX9sjb0T&_nc_ht=scontent.flim2-2.fna&oh=00_AfDgcP2YxTShTqSN7yKkcrZY2wEptUpTKlPrkXjjzdOaqg&oe=6452BDA2'
          alt='usuario'
        />
      </div>

      <div className='about__descripcion'>
        <h2 className='about__descripcion-titulo'>Hola, soy Martin Flores</h2>
        <p className='about__descripcion-experiencia'>
          <b>+3</b> años <b>6</b> meses de experiencia
        </p>

        <a href='#' className='about__descripcion-cv'>
          📃 Descarga mi CV
        </a>

        <div className='about__descripcion-texto'>
          🌟 Desarrollador Frontend 🌟 me encanta crear con JSX, Intl, Dynamic import, Typescript y
          componentes. #Qwik
        </div>
      </div>

      <div className='about__preferiencias'>
        <h2 className='about__preferiencias-titulo'>Preferencias</h2>

        <div className='about__preferiencias-items'>
          <a href='#'>
            <img src='https://jose-aguilar.vercel.app/assets/icons/NextjsIcon.svg' alt='1' />
          </a>

          <a href='#'>
            <img src='https://jose-aguilar.vercel.app/assets/icons/NextjsIcon.svg' alt='1' />
          </a>
          <a href='#'>
            <img src='https://jose-aguilar.vercel.app/assets/icons/NextjsIcon.svg' alt='1' />
          </a>
          <a href='#'>
            <img src='https://jose-aguilar.vercel.app/assets/icons/NextjsIcon.svg' alt='1' />
          </a>
          <a href='#'>
            <img src='https://jose-aguilar.vercel.app/assets/icons/NextjsIcon.svg' alt='1' />
          </a>
        </div>
      </div>

      <div className='about__contacto'>
        <h2 className='about__contacto-titulo'>Contacto</h2>
        <a className='about__contacto-link' href='#'>
          <EmailSvg />
          white@gmail.com
        </a>
        <a className='about__contacto-link' href='#'>
          <LinkedinSvg />
          linkedin.com
        </a>
        <a className='about__contacto-link' href='#'>
          <GithubSvg />
          github.com
        </a>
      </div>
    </div>
  )
}

export default About
