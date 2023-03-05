import { useEffect, useState } from 'react'
import useNewSocial from '../../../hooks/useNewSocial'
import { PhotoSvg } from '../../../assets/svg'
import useAdmin from '../../../hooks/useAdmin'
import useUpdateSocial from '../../../hooks/useUpdateSocial'

const DEFAULT_STATE = {
  campos: {
    nombre: '',
    descripcion: '',
    enlace: '',
    imagen: {
      file: null,
      url: ''
    }
  },
  alerta: { msg: '', error: false }
}

const FormSocial = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)

  // USE NEW SOCIAL
  const { newSocial, error: errorSocial, loading: loadingSocial } = useNewSocial()

  // USE UPDATE SOCIAL
  const { actualizarSocial, error: errorUpdate, loading: loadingUpdate } = useUpdateSocial()

  // USE ADMIN
  const { socialEdit, setSocialEdit } = useAdmin()

  // USE EFFECT EDIT
  useEffect(() => {
    if (socialEdit) {
      setCampos({
        nombre: socialEdit.nombre,
        descripcion: socialEdit.descripcion,
        enlace: socialEdit.enlace,
        imagen: {
          file: null,
          url: socialEdit.imagen.secure_url
        }
      })
    }
  }, [socialEdit])

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'imagen') {
      if (e.target.files.length > 0) {
        const file = e.target.files[0]
        const url = URL.createObjectURL(file)
        setCampos((prevState) => ({ ...prevState, imagen: { file, url } }))
        return
      }
    }

    setCampos((prevState) => ({ ...prevState, [name]: value }))
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar
    if (!campos.nombre.trim() || !campos.enlace.trim() || !campos.descripcion.trim()) {
      setAlerta({ msg: 'Todos los campos son obligatorios', error: true })
      return
    }

    if (!socialEdit) {
      if (!campos.imagen.file) {
        setAlerta({ msg: 'La imagen es obligatoria', error: true })
        return
      }
    }

    setAlerta(DEFAULT_STATE.alerta)
    // MODO EDITAR
    if (socialEdit) {
      await actualizarSocial({ id: socialEdit._id, nombre: campos.nombre, enlace: campos.enlace, descripcion: campos.descripcion, file: campos.imagen.file })
    } else {
      await newSocial({ nombre: campos.nombre, enlace: campos.enlace, descripcion: campos.descripcion, file: campos.imagen.file })
    }

    // Limpiar
    setSocialEdit(null)
    setCampos(DEFAULT_STATE.campos)
    setAlerta(DEFAULT_STATE.alerta)
  }

  return (
    <form className='formulario-admin' onSubmit={handleSubmit}>
      {errorSocial && <p className='alerta-error'>{errorSocial}</p>}
      {alerta.msg && <p className={`alerta alerta-error`}>{alerta.msg}</p>}

      <div className='grid-bottom-top'>
        <label htmlFor='imagen'>
          Imagen
          <div className='imagen-social'>
            {campos.imagen.url && <img src={campos.imagen.url} alt='new' />}
            {!campos.imagen.url && <PhotoSvg />}
          </div>
          <input type='file' id='imagen' onChange={handleChange} name='imagen' />
        </label>

        <label htmlFor='nombre'>
          Nombre
          <input type='text' id='nombre' value={campos.nombre} onChange={handleChange} name='nombre' placeholder='Nombre de la red social' />
        </label>

        <label htmlFor='enlace'>
          Enlace
          <input type='url' id='enlace' value={campos.enlace} onChange={handleChange} name='enlace' placeholder='Nombre de la red social' />
        </label>
      </div>

      <label htmlFor='descripcion'>
        Descripcion
        <textarea id='descripcion' value={campos.descripcion} onChange={handleChange} name='descripcion' placeholder='descripcion de la red social' />
      </label>

      <button type='submit' className='btn btn-primary' disabled={loadingSocial}>
        {loadingSocial || loadingUpdate ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  )
}

export default FormSocial
