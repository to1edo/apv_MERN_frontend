import usePacientes from '../hooks/usePacientes'
import Alerta from './Alerta'
import Paciente from './Paciente'

const ListadoPacientes = () => {

  const {pacientes, alerta, eliminado} = usePacientes()
  return (
    <>
      {pacientes.length ?
      (
        <>
          <h2 className='text-gray-300 text-center text-2xl  font-medium  pt-4 md:pt-0'>Tu listado de Pacientes</h2>
          { alerta && eliminado && <Alerta alerta={alerta}/>}
          <div className='flex flex-wrap mt-6 gap-4 justify-evenly  max-h-screen overflow-y-auto'>
            { pacientes.map( paciente=>{
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