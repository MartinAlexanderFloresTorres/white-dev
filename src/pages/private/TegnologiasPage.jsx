import DotLoader from '../../components/animations/DotLoader'
import FormTecnologia from '../../components/containers/tecnologias/FormTecnologia'
import Tecnologia from '../../components/containers/tecnologias/Tecnologia'
import useAdmin from '../../hooks/useAdmin'

const TegnologiasPage = () => {
  // USE ADMIN
  const { tecnologias, loadingTecnologias } = useAdmin()

  return (
    <>
      <div className='formulario-admin'>
        <FormTecnologia />
        <ul className='lista-conocimientos'>
          {tecnologias.map((tecnologia) => (
            <Tecnologia tecnologia={tecnologia} key={tecnologia._id} />
          ))}
        </ul>
        {loadingTecnologias && <DotLoader />}
      </div>
    </>
  )
}

export default TegnologiasPage
