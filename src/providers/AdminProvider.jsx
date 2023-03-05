import { createContext, useEffect, useState } from 'react'
import { get_mostrar } from '../services/api/tecnologias'
import { get_obtener } from '../services/api/proyectos'
import { get_show } from '../services/api/socials'
import { useLocation } from 'react-router-dom'
import useAutoLogin from '../hooks/useAutoLogin'

export const AdminContext = createContext()

const AdminProvider = ({ children }) => {
  // ESTADOS
  const [proyectos, setProyectos] = useState([])
  const [proyectoEdit, setProyectoEdit] = useState(null)
  const [loadingProyectos, setLoadingProyectos] = useState(true)
  const [totalPages, setTotalPages] = useState(0)

  const [tecnologias, setTecnologias] = useState([])
  const [tecnologiaEdit, setTecnologiaEdit] = useState(null)
  const [loadingTecnologias, setLoadingTecnologias] = useState(true)

  const [socials, setSocials] = useState([])
  const [socialEdit, setSocialEdit] = useState(null)
  const [loadingSocials, setLoadingSocials] = useState(true)

  const [autenticado, setAutenticado] = useState(false)
  const [loadingaAuth, setLoadingaAuth] = useState(true)

  // USE LOCATION
  const { pathname } = useLocation()

  // OBTENER TECNOLOGIAS
  const getTecnologias = async () => {
    try {
      setLoadingTecnologias(true)
      const { data } = await get_mostrar()
      setTecnologias(data)
    } catch (error) {
      console.log(error)
    }
    setLoadingTecnologias(false)
  }

  // OBTENER PROYECTOS
  const getProyectos = async () => {
    try {
      setLoadingProyectos(true)
      const { data } = await get_obtener()
      setProyectos(data.docs)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.log(error)
    }
    setLoadingProyectos(false)
  }

  // OBTENER SOCIALS
  const getSocials = async () => {
    try {
      setLoadingSocials(true)
      const { data } = await get_show()
      setSocials(data)
    } catch (error) {
      console.log(error)
    }
    setLoadingSocials(false)
  }

  // USEEFFECT
  useEffect(() => {
    if (pathname !== '/proyectos') {
      getProyectos()
    }
    getTecnologias()
    getSocials()
  }, [])

  // FUNCIONES

  // ---- TECNOLOGIAS ----
  const addTecnologia = (tecnologia) => {
    setTecnologias([...tecnologias, tecnologia])
  }

  const deleteTecnologia = ({ id }) => {
    setTecnologias(tecnologias.filter((tecnologia) => tecnologia._id !== id))
  }

  const updateTecnologia = (tecnologia) => {
    setTecnologias(tecnologias.map((tec) => (tec._id === tecnologia._id ? tecnologia : tec)))
  }

  // ---- SOCIALS ----
  const addSocial = (social) => {
    setSocials([...socials, social])
  }

  const deleteSocial = ({ id }) => {
    setSocials(socials.filter((social) => social._id !== id))
  }

  const updateSocial = (social) => {
    setSocials(socials.map((soc) => (soc._id === social._id ? social : soc)))
  }

  // -------- PROYECTOS --------
  const addProyecto = (proyecto) => {
    setProyectos([...proyectos, proyecto])
  }

  const deleteProyecto = ({ id }) => {
    setProyectos(proyectos.filter((proyecto) => proyecto._id !== id))
  }

  const updateProyecto = (proyecto) => {
    setProyectos(proyectos.map((pro) => (pro._id === proyecto._id ? proyecto : pro)))
  }

  return (
    <AdminContext.Provider
      value={{
        tecnologias,
        tecnologiaEdit,
        loadingTecnologias,
        setTecnologiaEdit,
        addTecnologia,
        deleteTecnologia,
        updateTecnologia,
        socials,
        socialEdit,
        loadingSocials,
        setSocialEdit,
        addSocial,
        updateSocial,
        deleteSocial,
        proyectos,
        setProyectos,
        proyectoEdit,
        loadingProyectos,
        setLoadingProyectos,
        setProyectoEdit,
        addProyecto,
        deleteProyecto,
        updateProyecto,
        totalPages,
        setTotalPages,
        loadingaAuth,
        autenticado,
        setAutenticado,
        setLoadingaAuth
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider
