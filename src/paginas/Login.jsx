import { Link, useNavigate } from "react-router-dom"
import { useState} from "react"
import Alerta from "../components/Alerta"
import axios from 'axios'
import useAuth from "../hooks/useAuth"
import Spinner from "../components/Spinner"
const Login = () => {

    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ alerta, setAlerta ] = useState({})
    const [cargando, setCargando] = useState(false)
    const {setAuth} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {

        e.preventDefault();

        if( email.trim() === ''){
            setAlerta({msg:'El email es obligatorio', error: true})
            return;
        }

        if( password.trim() === ''){
            setAlerta({msg:'La contraseña es obligatoria', error: true})
            return;
        }

        if( password.trim().length < 6){
            setAlerta({msg:'La contraseña debe tener al menos 6 caracteres', error: true})
            return;
        }
        setCargando(true)
        try {
            const {data}= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/login`,{email, password})
            localStorage.setItem('JWT', data.jwt)
            setAuth(data)

            // navigate('/admin')
            window.location.href = '/admin' 

        } catch (error) {
            setAlerta({msg:error.response.data.msg, error: true})
        }
        setCargando(false)

    }

    const {msg} = alerta

    return (
        <>
            <div className="mx-4">
                <h1 className="text-gray-300 text-center text-4xl md:text-6xl font-bold pt-4 md:pt-0">Inicia sesión y administra tus <span className="">pacientes</span></h1>
            </div>
            
            <div className="mt-8 md:mt-8" >
                <form  onSubmit={ handleSubmit } className="shadow-lg p-6  rounded-xl"> 

                    { msg && <Alerta alerta = {alerta} /> }

                    <div className="mb-4 ">
                        <label htmlFor="email" className="uppercase block font-medium text-white mb-2">Email *</label>
                        <input onChange={(e)=> setEmail(e.target.value)} id="email" className="w-full border p-3 bg-grey-50 rounded-xl" type="email" placeholder="Tu email"required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="uppercase block text-white font-medium mb-2">Contraseña *</label>
                        <input onChange={(e)=> setPassword(e.target.value)} id="password" className="w-full border p-3 bg-grey-50 rounded-xl" type="password" placeholder="Tu contraseña" required />
                    </div>
                    <p className="text-sm text-gray-300">* Campos obligatorios</p>
                
                    { cargando && <Spinner/>}

                    <div>
                        <input  className=" cursor-pointer w-full mt-8 block bg-indigo-700 py-2 px-4 rounded-lg text-white font-medium uppercase md:w-auto md:mx-auto" type="submit" value="Iniciar sesión" />
                    </div>
                </form>

                <nav className="flex flex-col items-center gap-4 md:flex-row md:justify-evenly mt-10">
                    <Link className="font-semibold text-gray-300" to="/registrar">No tienes cuenta?, crea una</Link>
                    <Link className="font-semibold text-gray-300" to="/olvide-password">Olvidé mi  contraseña</Link>
                </nav>
            </div>
        </>
    )
}

export default Login