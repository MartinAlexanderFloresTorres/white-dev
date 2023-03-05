import ClienteAxios from '../../../config/ClienteAxios'

export const post_crear = async ({ nombre, file }) => {
  const formData = new FormData()
  formData.append('nombre', nombre)
  formData.append('file', file)

  const token = localStorage.getItem('_token_admin_white_dev')

  return await ClienteAxios.post('/tecnologias/nuevo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

export const get_mostrar = async () => {
  return await ClienteAxios.get('/tecnologias/mostrar')
}

export const put_actualizar = async ({ id, nombre, file, public_id }) => {
  const formData = new FormData()
  formData.append('nombre', nombre)
  formData.append('public_id', public_id)
  if (file) {
    formData.append('file', file)
  }

  const token = localStorage.getItem('_token_admin_white_dev')

  return await ClienteAxios.put(`/tecnologias/actualizar/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

export const delete_eliminar = async ({ id }) => {
  const token = localStorage.getItem('_token_admin_white_dev')
  return await ClienteAxios.delete(`/tecnologias/eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
