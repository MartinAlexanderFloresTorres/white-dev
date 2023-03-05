import { useContext } from 'react'
import { AdminContext } from '../providers/AdminProvider'

const useAdmin = () => {
  return useContext(AdminContext)
}

export default useAdmin
