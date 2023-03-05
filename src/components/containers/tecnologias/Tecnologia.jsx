import React from 'react'
import useDeleteTecnologia from '../../../hooks/useDeleteTecnologia'
import useAdmin from '../../../hooks/useAdmin'

const Tecnologia = ({ tecnologia }) => {
  // USE DELETE TECNOLOGIA
  const { eliminarTecnologia, error, loading } = useDeleteTecnologia()

  // USE ADMIN
  const { setTecnologiaEdit } = useAdmin()

  const { _id, nombre, imagen } = tecnologia

  return (
    <li className='tecnologia-item' key={_id}>
      {error && <p className='alerta alerta-error alerta--flotante'>{error}</p>}
      <div className='tecnologia-top'>
        <img src={imagen.secure_url} alt={nombre} />
        <span>{nombre}</span>
      </div>
      <div>
        <button className='btn btn-verde' onClick={() => setTecnologiaEdit(tecnologia)}>
          Editar
        </button>
        <button className='btn btn-rojo' onClick={() => eliminarTecnologia({ id: _id })} disabled={loading}>
          {loading ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </li>
  )
}

export default Tecnologia
