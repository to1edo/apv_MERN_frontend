import { useState ,useEffect} from 'react'
import usePacientes from '../hooks/usePacientes'
import Alerta from './Alerta'
import Paciente from './Paciente'

const ListadoPacientes = () => {

  const {pacientes, alerta, eliminado} = usePacientes()

  const [pacientesFiltrados, setPacientesFiltrados] = useState([])
  const [filtro, setFiltro] = useState('')


  useEffect(() => {
    setPacientesFiltrados([])
    
    let filtrados =[]
    pacientes.forEach(paciente => {
      if(filtro.toLowerCase() === paciente.nombre.toLowerCase()){
        filtrados.push(paciente)
      }
      if(filtro.toLowerCase() === paciente.email.toLowerCase()){
        filtrados.push(paciente)
      }
      if(filtro.toLowerCase() === paciente.propietario.toLowerCase()){
        filtrados.push(paciente)
      }
    });

    if(filtrados.length){
      setPacientesFiltrados(filtrados)
    }

  }, [filtro, pacientes])

  return (
    <>
      {pacientes.length ?
      (
        <>
          <div className='flex flex-col gap-4 justify-between items-center'>
            <h2 className='grow text-gray-300 text-center text-2xl  font-medium  pt-4 md:pt-0'>Tu listado de Pacientes</h2>
            <div className='grow self-start'>
              <label htmlFor="busqueda" className='text-gray-300 font-medium'>Buscar paciente</label>
              <input onChange={(e)=> setFiltro(e.target.value)} className='mt-1 w-full px-4 py-2 rounded-lg' type="text" name="busqueda" id="busqueda" placeholder='email, mascota ó propietario' />
            </div>
          </div>
          { alerta && eliminado && <Alerta alerta={alerta}/>}
          <div className='flex flex-wrap mt-6 gap-4 justify-evenly items-center  max-h-screen overflow-y-auto'>
            { pacientesFiltrados.length ? '' : setPacientesFiltrados(pacientes)}
            { pacientesFiltrados.map( paciente=>{
              return<Paciente key={paciente._id} paciente={paciente} />
            })}
          </div>
        </>

      ) :
      (
        <>
          <h2 className='text-gray-300 text-center text-3xl  font-medium  pt-4 md:pt-0'>No hay pacientes registrados</h2>
          <p className='text-center font-xl pt-8'>Comienza registrando pacientes y aparecerán aquí</p>
        </>
      )}

    </>
  )
}

export default ListadoPacientes