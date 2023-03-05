import ClienteAxios from '../../../config/ClienteAxios'

// Crear
export const post_autenticar = async ({ email, password }) => {
  return await ClienteAxios.post('/usuarios/autenticar', { email, password })
}

// Auto login
export const get_auto_login = async () => {
  const token = localStorage.getItem('_token_admin_white_dev')

  return await ClienteAxios.get('/usuarios/auto-login', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
