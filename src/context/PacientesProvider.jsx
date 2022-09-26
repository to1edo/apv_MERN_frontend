import {useState, useEffect, createContext} from 'react'
import axios from 'axios';
import useAuth from "../hooks/useAuth"
const PacientesContext = createContext()

const PacientesProvider = ({children})=>{

    const [pacientes, setPacientes] = useState([])
    const [alerta, setAlerta] = useState('')
    const [paciente, setPaciente] = useState({})
    const [eliminado, setEliminado] = useState(false)
    const {auth} = useAuth()

    useEffect(()=>{
        const obtenerPacientes = async()=>{
            const token = localStorage.getItem('JWT');

            if(!token){
                return
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes`, config)
                
                setPacientes(res.data.map( paciente => paciente ))

            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

        obtenerPacientes()
    },[])


    const setearPaciente = async(paciente)=>{
        setPaciente(paciente)
    }


    async function guardarPaciente(paciente) {

        const token = localStorage.getItem('JWT')
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente._id){
            try {
                const {data} = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${paciente._id}` , paciente, config)

                const {createdAt,__v,updatedAt, ...pacienteActualizado} = data

                let listaPacientes = pacientes.map(paciente =>{

                    if(paciente._id === pacienteActualizado._id){
                        return pacienteActualizado
                    }
                    return paciente
                })

                setPacientes(listaPacientes)
                console.log(listaPacientes)
                setAlerta({msg:`Exito, ${data.nombre} ha sido guardado correctamente`, error: false})

                setTimeout(() => {
                    setAlerta('')
                }, 4000);

            } catch (error) {
                console.log(error)
            }

        }else{
            
            try {
                delete paciente._id  //avoid set null to id
                const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes` , paciente, config)


                const {createdAt,__v,updatedAt, ...pacienteGuardado} = data
                setPacientes([pacienteGuardado,...pacientes])
                setAlerta({msg:`Exito, ${data.nombre} ha sido guardado correctamente`, error: false})

                setTimeout(() => {
                    setAlerta('')
                }, 4000);

            } catch (error) {
                console.log(error)
            }
        }


    }

    async function eliminarPaciente(paciente){

        const confimar =  confirm('Desea eliminar el paciente?')

        if(confimar){

            const token = localStorage.getItem('JWT')
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
        
            try {
                const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${paciente._id}` ,config)

                let listaPacientes = pacientes.filter(item =>{

                    if(item._id !== paciente._id){
                        return item
                    }
                })

                setPacientes(listaPacientes)

                setEliminado(true)
                setAlerta({msg:data.msg, error:false})
                setTimeout(() => {
                    setEliminado(false)
                    setAlerta({})
                }, 3000);

            } catch (error) {
                console.log(error)
            }

        }

    }

    return(
        <PacientesContext.Provider value={
        {   guardarPaciente,
            pacientes,
            alerta,
            setAlerta,
            setearPaciente,
            eliminarPaciente,
            eliminado,
            paciente }
        }>
            {children}
        </PacientesContext.Provider>
    )
}


export{ PacientesProvider }

export default PacientesContext