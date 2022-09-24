import usePacientes from "../hooks/usePacientes"


const Paciente = ({ paciente}) => {

    const {setearPaciente, eliminarPaciente} = usePacientes()

    const formatearFecha = (fecha)=>{
        const nuevaFecha = new Date(fecha.split('-'))
        return Intl.DateTimeFormat('es-ES',{ dateStyle:'long'}).format(nuevaFecha)
    }

    return (
        <>
            <div className="mr-8 text-black font-medium bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-900 rounded-xl my-4  p-4 md:p-6 ">
                <p className="text-right"><span className=" text-3xl text-white  font-extra-bold ">{paciente.nombre}</span> </p>
                <p >Propietario: <span className=" font-normal text-white ">{paciente.propietario}</span> </p>
                <p >Email: <span className="  font-normal text-white ">{paciente.email}</span> </p>
                <p >Fecha del Alta: <span className="  font-normal text-white ">{formatearFecha(paciente.fechaAlta.slice(0,10))}</span> </p>
                <p className="mt-2">Sintomas:  <span className=' font-normal text-white '>{paciente.sintomas}</span> </p>
                
                <div className="flex justify-between mt-6">
                    <button onClick={()=>setearPaciente(paciente)} className="uppercase py-1 px-4 text-white rounded-lg bg-indigo-600 hover:bg-indigo-700">Editar</button>
                    <button onClick={()=>eliminarPaciente(paciente)} className="uppercase py-2 px-4 text-white rounded-lg bg-red-700 hover:bg-red-800">Eliminar</button>
                </div>
            </div>

        </>
    )
}

export default Paciente