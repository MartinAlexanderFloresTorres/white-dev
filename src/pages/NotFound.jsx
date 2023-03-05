import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='container caja NotFound'>
      <h1>404</h1>
      <h2>Pagina no encontrada</h2>

      <Link to='/' className='btn btn-gray'>
        Ir al inicio
      </Link>
    </div>
  )
}

export default NotFound
