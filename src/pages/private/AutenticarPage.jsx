import { useState } from 'react'
import useAutenticar from '../../hooks/useAutenticar'
import useAdmin from '../../hooks/useAdmin'

const AutenticarPage = () => {
  // ESTADOS
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  // USE AUTENTICAR
  const { autenticar, error, loading } = useAutenticar()

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault()

    // VALIDAR
    if (email.trim() === '' || password.trim() === '') return

    // AUTENTICAR
    autenticar({ email, password })
  }

  return (
    <section className='container-formulario'>
      <img src='/logo.png' alt='Logo' />
      <h2 className='titulo'>Admin</h2>
      <form className='formulario-admin' onSubmit={handleSubmit}>
        {error && <p className='alerta alerta-error'>{error}</p>}

        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />

        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />

        <input type='submit' value={loading ? 'Autenticando...' : 'Autenticar'} className='btn btn-gray' />
      </form>
    </section>
  )
}

export default AutenticarPage
