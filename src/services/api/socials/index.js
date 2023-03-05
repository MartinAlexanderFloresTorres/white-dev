import ClienteAxios from '../../../config/ClienteAxios'

// Crear
export const post_crear = async ({ nombre, enlace, descripcion, file }) => {
  const formData = new FormData()
  formData.append('nombre', nombre)
  formData.append('enlace', enlace)
  formData.append('descripcion', descripcion)
  formData.append('file', file)

  const token = localStorage.getItem('_token_admin_white_dev')

  return await ClienteAxios.post('/socials/crear', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

// Actualizar
export const put_actualizar = async ({ id, nombre, enlace, descripcion, file }) => {
  const formData = new FormData()
  formData.append('nombre', nombre)
  formData.append('enlace', enlace)
  formData.append('descripcion', descripcion)
  if (file) {
    formData.append('file', file)
  }

  const token = localStorage.getItem('_token_admin_white_dev')

  return await ClienteAxios.put(`/socials/actualizar/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

// Eliminar
export const delete_eliminar = async ({ id }) => {
  const token = localStorage.getItem('_token_admin_white_dev')
  return await ClienteAxios.delete(`/socials/eliminar/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// Mostrar
export const get_show = async () => {
  return await ClienteAxios.get('/socials')
}
