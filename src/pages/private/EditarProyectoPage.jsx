import { useEffect, useRef, useState } from 'react'
import { TrixEditor } from 'react-trix'
import 'trix/dist/trix.esm'
import 'trix/dist/trix.css'
import useAdmin from '../../hooks/useAdmin'
import FormTecnologia from '../../components/containers/tecnologias/FormTecnologia'
import useObtenerProyecto from '../../hooks/useObtenerProyecto'
import { useParams } from 'react-router-dom'
import useUpdateProyecto from '../../hooks/useUpdateProyecto'
import DotLoader from '../../components/animations/DotLoader'

const DEFAULT_STATE = {
  campos: {
    nombre: '',
    categoria: '',
    repositorio: '',
    web: '',
    imagen: {
      file: null,
      secure_url: ''
    },
    descripcion: '',
    contenido: '',
    tecnologias: []
  },
  alerta: { msg: '', error: false }
}

const EditarProyectoPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)

  // USEADMIN
  const { tecnologias, loadingTecnologias } = useAdmin()

  // USE REF PARA EL EDITOR
  const editorRef = useRef()

  // USE PARAMS
  const { url } = useParams()

  // USE OBETENER PROYECTO
  const { proyecto, error: errorObtener, loading: loadingObtener } = useObtenerProyecto({ url })

  // USE NEW PROYECTO
  const { actualizarProyecto, error, loading } = useUpdateProyecto()

  useEffect(() => {
    if (proyecto) {
      setCampos((prevState) => ({ ...prevState, ...proyecto }))

      // INSERTAR LA CONTENIDO EN EL EDITOR
      if (editorRef.current) {
        editorRef.current.insertHTML(proyecto.contenido)
      }
    }
  }, [proyecto])

  // HANDLE CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'imagen') {
      if (e.target.files.length > 0) {
        const file = e.target.files[0]
        const secure_url = URL.createObjectURL(file)
        setCampos((prevState) => ({ ...prevState, imagen: { file, secure_url } }))
        return
      }
    }

    setCampos((prevState) => ({ ...prevState, [name]: value }))
  }

  // EVENTO PARA AGREGAR EL EDITOR
  const handleEditorReady = (editor) => {
    editorRef.current = editor
  }

  // EVENTO PARA CAMBIAR EL ESTADO DE LA DESCRIPCION
  const handleChangeContenido = (html, text) => {
    setCampos((prevState) => ({ ...prevState, contenido: html }))
  }

  // TECNOLOGIAS SELECCIONADOS
  const selectedTecnologiaIds = campos.tecnologias.map((t) => {
    if (typeof t === 'object') {
      return t._id
    } else {
      return t
    }
  })

  // EVENTO PARA AGREGAR O QUITAR UNA TECNOLOGIA
  const toggleTecnologia = ({ _id }) => {
    const { tecnologias } = campos

    // SI EL SKILL YA ESTA EN EL ARRAY, LO QUITAMOS
    if (selectedTecnologiaIds.includes(_id)) {
      const newTecnologias = tecnologias.filter((t) => t._id !== _id)
      setCampos((prevState) => ({ ...prevState, tecnologias: newTecnologias }))
    } else {
      setCampos((prevState) => ({ ...prevState, tecnologias: [...tecnologias, _id] }))
    }
  }

  // HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault()

    // VALIDACIONES
    if (campos.nombre.trim() === '') {
      setAlerta({ msg: 'El nombre es obligatorio', error: true })
      return
    }

    if (campos.repositorio.trim() === '') {
      setAlerta({ msg: 'El repositorio es obligatorio', error: true })
      return
    }

    if (campos.web.trim() === '') {
      setAlerta({ msg: 'La web es obligatoria', error: true })
      return
    }

    if (campos.imagen.file === null) {
      setAlerta({ msg: 'La imagen es obligatoria', error: true })
      return
    }

    if (campos.descripcion.trim() === '') {
      setAlerta({ msg: 'La descripcion es obligatoria', error: true })
      return
    }

    if (campos.contenido.trim() === '') {
      setAlerta({ msg: 'El contenido es obligatorio', error: true })
      return
    }

    if (campos.tecnologias.length === 0) {
      setAlerta({ msg: 'Las tecnologias son obligatorias', error: true })
      return
    }

    // SI TODO ESTA BIEN, SE ENVIA EL FORMULARIO
    await actualizarProyecto({
      nombre: campos.nombre,
      categoria: campos.categoria,
      repositorio: campos.repositorio,
      web: campos.web,
      file: campos.imagen.file,
      descripcion: campos.descripcion,
      contenido: campos.contenido,
      tecnologias: selectedTecnologiaIds,
      id: proyecto._id
    })

    // SE LIMPIA EL FORMULARIO
    setCampos(DEFAULT_STATE.campos)
    setAlerta(DEFAULT_STATE.alerta)
  }

  if (loadingObtener) {
    return null
  }

  if (errorObtener) {
    return (
      <div className='caja'>
        <div className='container alerta alerta-error'>{errorObtener}</div>
      </div>
    )
  }

  return (
    <section className='container'>
      <form className='formulario-admin' onSubmit={handleSubmit}>
        {alerta.msg && <div className={`alerta ${alerta.error ? 'alerta-error' : 'alerta-exito'}`}>{alerta.msg}</div>}
        {error && <div className='alerta alerta-error'>{error}</div>}

        <label htmlFor='nombre'>
          Nombre
          <input type='text' id='nombre' value={campos.nombre} onChange={handleChange} name='nombre' placeholder='Nombre del proyecto' />
        </label>

        <div className='grid-bottom'>
          <label htmlFor='repositorio'>
            Repositorio
            <input type='url' id='repositorio' value={campos.repositorio} onChange={handleChange} name='repositorio' placeholder='repositorio del proyecto' />
          </label>
          <label htmlFor='web'>
            web
            <input type='url' id='web' value={campos.web} onChange={handleChange} name='web' placeholder='Nombre del proyecto' />
          </label>
        </div>

        <label htmlFor='imagen'>
          Imagen
          {campos.imagen.secure_url && <img src={campos.imagen.secure_url} alt='imagen del proyecto' className='imagen-proyecto' />}
          {!campos.imagen.secure_url && <p className='imagen-proyecto'>Subir Imagen</p>}
          <input type='file' accept='image/png, image/jpeg,image/jpg,image/gif,image/svg' id='imagen' onChange={handleChange} name='imagen' />
        </label>

        <label htmlFor='descripcion'>
          Descripcion
          <textarea id='descripcion' value={campos.descripcion} onChange={handleChange} name='descripcion' placeholder='descripcion del proyecto' />
        </label>

        <TrixEditor onChange={handleChangeContenido} onEditorReady={handleEditorReady} ref={editorRef} />

        <FormTecnologia />

        <ul className='lista-conocimientos'>
          {tecnologias.map((tecnologia) => (
            <li key={tecnologia._id} className={`tecnologia ${selectedTecnologiaIds.includes(tecnologia._id) ? 'activo' : ''}`} onClick={() => toggleTecnologia({ _id: tecnologia._id })}>
              <img src={tecnologia.imagen.secure_url} alt={tecnologia.nombre} />
              <span>{tecnologia.nombre}</span>
            </li>
          ))}
          {loadingTecnologias && <DotLoader />}
        </ul>
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </form>
    </section>
  )
}

export default EditarProyectoPage
