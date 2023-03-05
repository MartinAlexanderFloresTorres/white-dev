import DotLoader from '../../components/animations/DotLoader'
import FormSocial from '../../components/containers/socials/FormSocial'
import SocialAdmin from '../../components/containers/socials/SocialAdmin'
import useAdmin from '../../hooks/useAdmin'

const NewSocial = () => {
  // USE ADMIN
  const { socials, loadingSocials } = useAdmin()

  return (
    <>
      <FormSocial />
      <div className='container-dos'>
        <div className='grid-bottom'>
          {socials.map((social) => (
            <SocialAdmin key={social._id} social={social} />
          ))}
        </div>
        {loadingSocials && <DotLoader />}
      </div>
    </>
  )
}

export default NewSocial
