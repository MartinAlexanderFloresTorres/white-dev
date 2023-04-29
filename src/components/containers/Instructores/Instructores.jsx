import INSTRUCTORES from '../../../constants/instructores'
import Instructor from './Instructor'
import './Instructores.css'

const Instructores = () => {
  return (
    <div className='instructores'>
      <div className='grid-top'>
        <h2 className='titulo'>Intructores</h2>
      </div>

      <div className='instructores-grid'>
        {INSTRUCTORES.map((instructor) => (
          <Instructor key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </div>
  )
}

export default Instructores
