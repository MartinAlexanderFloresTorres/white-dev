import { useRef, useState } from 'react'
import { TrixEditor } from 'react-trix'
import 'trix/dist/trix.esm'
import 'trix/dist/trix.css'
import useAdmin from '../../hooks/useAdmin'
import FormTecnologia from '../../components/containers/tecnologias/FormTecnologia'
import useNewProyecto from '../../hooks/useNewProyecto'
import Proyecto from '../../components/containers/proyecto/Proyecto'
import Paginate from '../../components/containers/paginate/Paginate'
import useFiltros from '../../hooks/useFiltros'
import CuyLoader from '../../components/animations/CuyLoader'
import DotLoader from '../../components/animations/DotLoader'

const DEFAULT_STATE = {
  campos: {
    nombre: '',
    categoria: '',
    repositorio: '',
    web: '',
    imagen: {
      file: null,
      url: ''
    },
    descripcion: '',
    contenido: '',
    tecnologias: []
  },
  alerta: { msg: '', error: false }
}

const AgregarProyectoPage = () => {
  // ESTADOS
  const [campos, setCampos] = useState(DEFAULT_STATE.campos)
  const [alerta, setAlerta] = useState(DEFAULT_STATE.alerta)

  // USEADMIN
  const { tecnologias, proyectos, loadingProyectos, loadingTecnologias } = useAdmin()

  // USE FILTROS
  useFiltros()

  // USE REF PARA EL EDITOR
  const editorRef = useRef()

  // USE NEW PROYECTO
  const { newProyecto, error, loading } = useNewProyecto()

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

  // EVENTO PARA CAMBIAR EL ESTADO DE LA DESCRIPCION
  const handleChangeContenido = (html, text) => {
    setCampos((prevState) => ({ ...prevState, contenido: html }))
  }

  // TECNOLOGIAS SELECCIONADOS
  const selectedTecnologiaIds = campos.tecnologias.map((tecnologia) => tecnologia._id)

  // EVENTO PARA AGREGAR O QUITAR UNA TECNOLOGIA
  const toggleTecnologia = ({ tecnologia }) => {
    const { tecnologias } = campos
    // SI EL SKILL YA ESTA EN EL ARRAY, LO QUITAMOS
    if (selectedTecnologiaIds.includes(tecnologia._id)) {
      const newTecnologias = tecnologias.filter((s) => s._id !== tecnologia._id)
      setCampos((prevState) => ({ ...prevState, tecnologias: newTecnologias }))
    } else {
      setCampos((prevState) => ({ ...prevState, tecnologias: [...tecnologias, tecnologia] }))
    }
  }

  // HANDLE SUBMIT
  const handleSubmit = (e) => {
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
    newProyecto({
      nombre: campos.nombre,
      categoria: campos.categoria,
      repositorio: campos.repositorio,
      web: campos.web,
      file: campos.imagen.file,
      descripcion: campos.descripcion,
      contenido: campos.contenido,
      tecnologias: selectedTecnologiaIds
    })

    // SE LIMPIA EL FORMULARIO
    setCampos(DEFAULT_STATE.campos)
    setAlerta(DEFAULT_STATE.alerta)
    editorRef.current.editor.loadHTML('')
  }

  return (
    <section className='container caja'>
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
          {campos.imagen.url && <img src={campos.imagen.url} alt='imagen del proyecto' className='imagen-proyecto' />}
          {!campos.imagen.url && <p className='imagen-proyecto'>Subir Imagen</p>}
          <input type='file' accept='image/png, image/jpeg,image/jpg,image/gif,image/svg' id='imagen' onChange={handleChange} name='imagen' />
        </label>

        <label htmlFor='descripcion'>
          Descripcion
          <textarea id='descripcion' value={campos.descripcion} onChange={handleChange} name='descripcion' placeholder='descripcion del proyecto' />
        </label>

        <TrixEditor onChange={handleChangeContenido} ref={editorRef} />

        <FormTecnologia />

        <ul className='lista-conocimientos'>
          {tecnologias.map((tecnologia) => (
            <li key={tecnologia._id} className={`tecnologia ${selectedTecnologiaIds.includes(tecnologia._id) ? 'activo' : ''}`} onClick={() => toggleTecnologia({ tecnologia })}>
              <img src={tecnologia.imagen.secure_url} alt={tecnologia.nombre} />
              <span>{tecnologia.nombre}</span>
            </li>
          ))}
        </ul>

        {loadingTecnologias && <DotLoader />}
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {loading ? 'Guardando...' : 'Agregar Proyecto'}
        </button>
      </form>

      <div className='container-dos grid-bottom'>{loadingProyectos ? <CuyLoader /> : proyectos.length > 0 ? proyectos.map((proyecto) => <Proyecto key={proyecto._id} proyecto={proyecto} editar={true} />) : <div className='alerta alerta-info'>No hay proyectos</div>}</div>
      <div className='container-dos'>{proyectos.length > 0 && <Paginate />}</div>
    </section>
  )
}

export default AgregarProyectoPage
