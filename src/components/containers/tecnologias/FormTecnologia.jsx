import { useEffect, useState } from 'react'
import { PhotoSvg } from '../../../assets/svg'
import useNewTecnologia from '../../../hooks/useNewTecnologia'
import useAdmin from '../../../hooks/useAdmin'
import useUpdateTecnologia from '../../../hooks/useUpdateTecnologia'

const FormTecnologia = () => {
  // ESTADOS
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState('')
  const [tecnologia, setTecnologia] = useState('')
  const [alerta, setAlerta] = useState({
    error: false,
    msg: ''
  })

  // USE NEW TECNOLOGIA
  const { newTecnologia, error: errorAdd, loading: loadingAdd } = useNewTecnologia()
  const { updateTecnologia, error: errorPut, loading: loadingPut } = useUpdateTecnologia()

  // USE ADMIN
  const { tecnologiaEdit, setTecnologiaEdit } = useAdmin()

  // AGREGAR NUEVA TECNOLOGIA
  const addTecnologia = async () => {
    if (tecnologia !== '') {
      // ACTUALIZAR TECNOLOGIA
      if (tecnologiaEdit) {
        // SE ACTUALIZA LA TECNOLOGIA
        await updateTecnologia({ nombre: tecnologia, file, id: tecnologiaEdit._id, public_id: tecnologiaEdit.imagen.public_id })
      } else if (file) {
        // SE AGREGA LA TECNOLOGIA
        await newTecnologia({ nombre: tecnologia, file })
      } else {
        setAlerta({
          error: true,
          msg: 'Debe seleccionar una imagen'
        })
        return
      }

      // LIMPIAR ESTADOS
      setTecnologiaEdit(null)
      setTecnologia('')
      setFile(null)
      setUrl('')
    } else {
      setAlerta({
        error: true,
        msg: 'El campo no puede estar vacio'
      })
    }
  }
  // EFFECT PARA EDITAR TECNOLOGIA
  useEffect(() => {
    if (tecnologiaEdit) {
      setTecnologia(tecnologiaEdit.nombre)
      setUrl(tecnologiaEdit.imagen.secure_url)
    }
  }, [tecnologiaEdit])

  // HANDLE CHANGE FILE
  const handleChangeFile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0]
      const url = URL.createObjectURL(file)
      setFile(file)
      setUrl(url)
    }
  }

  return (
    <div className='formulario-tegnologias'>
      {(errorAdd || errorPut) && <p className='alerta alerta-error'>{errorAdd || errorPut}</p>}
      {alerta.error && <p className='alerta alerta-error'>{alerta.msg}</p>}

      <h2>Tecnologias</h2>

      <div>
        <label htmlFor='tecnologia'>
          {url && <img src={url} alt='new' />}
          {!url && <PhotoSvg />}
          <input type='file' id='tecnologia' onChange={handleChangeFile} />
        </label>
        <input type='text' value={tecnologia} onChange={(e) => setTecnologia(e.target.value.trimStart().toUpperCase())} />
        <button className='btn btn-verde' onClick={addTecnologia} type='button' disabled={loadingAdd || loadingPut}>
          {loadingAdd || loadingPut ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </div>
  )
}

export default FormTecnologia
