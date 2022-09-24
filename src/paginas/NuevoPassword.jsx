import { useEffect } from "react"
import { useParams,Link } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [alerta, setAlerta] = useState('')
    const [valido, setValido] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [cambiada, setCambiada] = useState(false)

    const params = useParams()
    const {token} = params

    useEffect(()=>{
        async function comprobarToken() {
            try {
                const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/olvide-password/${token}`)
                setValido(true)
            } catch (error) {
                setAlerta({msg:error.response.data.msg , error:true})
            }
            setCargando(false)
        }
        comprobarToken();
    },[])
    


    async function handleSubmit(e) {
        e.preventDefault()

        if([password.trim(), confirmPassword.trim()].includes('')){
            setAlerta({msg:'Todos los campos son obligatorios', error:true})
            return
        }

        if( password.trim().length < 6){
            setAlerta({msg:'La contraseña debe tener al menos 6 caracteres', error: true})
            return;
        }

        if(password !== confirmPassword){
            setAlerta({msg:'Las contraseñas no coinciden', error:true})
            return
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/olvide-password/${token}`,{password, confirmPassword})
            setCambiada(true)
            setAlerta({msg: res.data.msg, error:false})

        } catch (error) {
            setAlerta({msg:error.response.data.msg , error:true})
        }

    }


    return (
        <>
            <div className="mx-4">
                <h1 className="text-gray-300 text-center text-4xl md:text-6xl font-bold pt-4 md:pt-0">Recupera el acceso a tu cuenta</h1>
            </div>
            
            <div className="mt-16 md:mt-0" >
                { cargando && <div className="uppercase text-white font-medium">Verificando, aguarde un momento...</div>}
                { !cargando && alerta.msg && <Alerta alerta={alerta}/>}
                { valido && !cambiada && 
                    <form onSubmit={ handleSubmit }  className="shadow-lg p-6  rounded-xl"> 
                        <div className="mb-4 ">
                            <label htmlFor="password" className="uppercase block font-medium text-white mb-2">Nueva contraseña *</label>
                            <input onInput={ e => setPassword(e.target.value)} id="password" className="w-full border p-3 bg-grey-50 rounded-xl" type="password" placeholder="Tu nueva contraseña"  required/>
                        </div>
                        
                        <div className="mb-4 ">
                            <label htmlFor="confirmPassword" className="uppercase block font-medium text-white mb-2">Confirma la nueva contraseña *</label>
                            <input onInput={ e => setConfirmPassword(e.target.value)} id="confirmPassword" className="w-full border p-3 bg-grey-50 rounded-xl" type="password" placeholder="Confirma tu contraseña"  required/>
                        </div>

                        <p className="text-sm text-gray-300">* Campos obligatorios</p>
                        <div>
                            <input  className=" cursor-pointer w-full mt-8 block bg-indigo-700 py-2 px-4  rounded-lg text-white font-medium uppercase md:w-auto md:mx-auto" type="submit" value="Cambiar contraseña" />
                        </div>
                    </form>
                }

                <nav className="flex flex-col items-center gap-4 md:flex-row md:justify-evenly mt-10">
                    {!cambiada ||  <Link className="font-semibold text-gray-300 " to="/">Iniciar sesión</Link>}
                </nav>
            </div>
        </>
    )
}

export default NuevoPassword