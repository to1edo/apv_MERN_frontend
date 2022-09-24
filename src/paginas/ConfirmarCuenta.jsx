import { useEffect,useState } from "react"
import { useParams,Link } from "react-router-dom"
import axios from "axios"
import Alerta from "../components/Alerta"

const ConfirmarCuenta = () => {

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [alerta, setAlerta] = useState('')
    const [cargando, setCargando] = useState(true)

    const params = useParams()
    const {token} = params
    
    useEffect(()=>{

        const confirmarCuenta = async()=>{

            const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${token}`
            
            try {

                const res = await axios(url)
                setAlerta({msg:res.data.msg , error: false})
                setCuentaConfirmada(true)
                
            } catch (error) {
                setAlerta({msg:error.response.data.msg , error: true})
            }
            setCargando(false)
        }

        confirmarCuenta()
    },[])


    return (
        <>
            <div className="mx-4">
                <h1 className="text-gray-300 text-center text-4xl md:text-6xl font-bold pt-4 md:pt-0">Confirma tu cuenta y empieza a administrar tus pacientes</h1>
            </div>
            
            <div className="mt-16 md:mt-0" >
                <div  className="shadow-lg p-6 text-center rounded-xl"> 
                    { cargando && <div className="uppercase text-white font-medium">Verificando, aguarde un momento...</div>}
                    { !cargando && <Alerta alerta={alerta}/>}
                    { cuentaConfirmada && <Link className="font-semibold text-gray-300 " to="/">Iniciar sesión</Link> }
                </div>
            </div>
        </>
    )
}

export default ConfirmarCuenta