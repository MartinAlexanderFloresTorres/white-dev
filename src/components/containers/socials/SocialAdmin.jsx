import Social from '../social/Social'
import useAdmin from '../../../hooks/useAdmin'
import useDeleteSocial from '../../../hooks/useDeleteSocial'

const SocialAdmin = ({ social }) => {
  // USE ADMIN
  const { setSocialEdit } = useAdmin()

  // USE DELETE SOCIAL
  const { eliminarSocial, error, loading } = useDeleteSocial()

  return (
    <div key={social._id} className='card-redes'>
      <Social social={social} />
      <div className='botones'>
        <button className='btn btn-verde' onClick={() => setSocialEdit(social)}>
          Editar
        </button>

        <button className='btn btn-rojo' onClick={() => eliminarSocial({ id: social._id })}>
          {loading ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  )
}

export default SocialAdmin
