import DotLoader from '../components/animations/DotLoader'
import Social from '../components/containers/social/Social'
import useAdmin from '../hooks/useAdmin'

const RedesPage = () => {
  // USE ADMIN
  const { socials, loadingSocials } = useAdmin()

  return (
    <section className='container caja'>
      <section className='container-grid'>
        <div className='grid-top'>
          <h2 className='titulo'>Mis Redes</h2>
        </div>

        <div className='grid-bottom'>{loadingSocials ? <DotLoader /> : socials.length > 0 ? socials.map((social) => <Social key={social._id} social={social} />) : <div className='alerta alerta-info'>No hay redes sociales</div>}</div>
      </section>
    </section>
  )
}

export default RedesPage
