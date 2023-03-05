import ClienteAxios from '../../../config/ClienteAxios'

// Crear Proyecto
export const post_crear = async ({ file, nombre, repositorio, web, descripcion, contenido, tecnologias }) => {
  const formData = new FormData()
  formData.append('nombre', nombre)
  formData.append('repositorio', repositorio)
  formData.append('web', web)
  formData.append('descripcion', descripcion)
  formData.append('contenido', contenido)

  formData.append('tecnologias', JSON.stringify(tecnologias))
  formData.append('file', file)

  const token = localStorage.getItem('_token_admin_white_dev')

  return await ClienteAxios.post('/proyectos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

// Obtener Proyectos
export const get_obtener = async () => {
  return await ClienteAxios.get('/proyectos')
}

// Obtener Proyecto
export const get_obtenerById = async ({ url }) => {
  return await ClienteAxios.get(`/proyectos/${url}`)
}

// Actualizar Proyecto
export const put_actualizar = async ({ id, file, nombre, repositorio, web, descripcion, contenido, tecnologias }) => {
  const formData = new FormData()
  formData.append('nombre', nombre)
  formData.append('repositorio', repositorio)
  formData.append('web', web)
  formData.append('descripcion', descripcion)
  formData.append('contenido', contenido)

  formData.append('tecnologias', JSON.stringify(tecnologias))

  if (file) {
    formData.append('file', file)
  }

  const token = localStorage.getItem('_token_admin_white_dev')

  return await ClienteAxios.put(`/proyectos/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  })
}

// Eliminar Proyecto
export const delete_eliminar = async ({ id }) => {
  const token = localStorage.getItem('_token_admin_white_dev')
  return await ClienteAxios.delete(`/proyectos/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// Filtrar Proyectos
export const get_filtrar = async ({ query, tecnologias, page = 1 }) => {
  return await ClienteAxios.get(`/proyectos?q=${query}&tecnologias=${tecnologias}&page=${page}`)
}
