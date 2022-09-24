import { Link } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import Alerta from "../components/Alerta"

const Registrar = () => {


    const [ nombre, setNombre ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassowrd ] = useState('')
    const [ alerta, setAlerta] = useState('')

    async function handleSubmit(e) {

        e.preventDefault();

        if( [nombre.trim(), email.trim(), password.trim(), confirmPassword.trim()].includes('')){
            setAlerta({msg:'Todos los campos son obligatorios', error: true})
            return;
        }

        if( password.trim().length < 6){
            setAlerta({msg:'La contraseña debe tener al menos 6 caracteres', error: true})
            return;
        }

        if( password !== confirmPassword){
            setAlerta({msg:'Las contraseñas no coinciden', error: true})
            return;
        }

        setAlerta({})

        try {

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`,{nombre, email, password})
            setAlerta({msg:'Te hemos enviado un email para confirmar tu cuenta', error: false})

            setNombre('');
            setEmail('');
            setPassword('');
            setConfirmPassowrd('');

        } catch (error) {
            setAlerta({msg:error.response.data.msg, error: true})
        }
    }

    const {msg} = alerta

    return (
        <>
            <div className="mx-4">
                <h1 className="text-gray-300 text-center text-4xl md:text-6xl font-bold  pt-4 md:pt-0">Empecemos creando tu cuenta</h1>
            </div>
            <div className="mt-8 md:mt-4" >

                
                <form onSubmit={ handleSubmit }  className="shadow-lg p-6  rounded-xl"> 

                { msg && <Alerta alerta = {alerta} /> }

                    <div className="mb-4 ">
                        <label  htmlFor="nombre" className="uppercase text-white block font-medium  mb-2">Nombre *</label>
                        <input onChange={(e)=> setNombre(e.target.value)} value={nombre}  id="nombre" className="w-full border p-2 bg-grey-50 rounded-xl" type="text" placeholder="Tu nombre" required />
                    </div>


                    <div className="mb-4 ">
                        <label htmlFor="email" className="uppercase text-white block font-medium  mb-2">Email *</label>
                        <input onChange={(e)=> setEmail(e.target.value)} value={email} id="email" className="w-full border p-2 bg-grey-50 rounded-xl" type="email" placeholder="Tu email" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="uppercase text-white block font-medium mb-2">Contraseña *</label>
                        <input onChange={(e)=> setPassword(e.target.value)}  id="password" className="w-full border p-2 bg-grey-50 rounded-xl" type="password" value={password} placeholder="Tu contraseña" required />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="passwordConfirm" className="uppercase text-white block font-medium mb-2">Confirmar contraseña *</label>
                        <input onChange={(e)=> setConfirmPassowrd(e.target.value)}  id="passwordConfirm" className="w-full border p-2 bg-grey-50 rounded-xl" type="password" value={confirmPassword} placeholder="Confirma tu contraseña" required />
                    </div>
                    <p className="text-sm text-gray-300">* Campos obligatorios</p>
                    <div>
                        <input className=" cursor-pointer w-full mt-6 block bg-indigo-700 py-2 px-4 rounded-lg text-white font-medium uppercase md:w-auto md:mx-auto" type="submit" value="Crear cuenta" />
                    </div>
                </form>

                <nav className="flex flex-col items-center gap-4 md:flex-row md:justify-evenly mt-4">
                    <Link className="font-semibold text-gray-300 my-4 md:my-0" to="/">Ya tienes cuenta?, inicia sesión</Link>
                </nav>
            </div>
        </>
    )
}

export default Registrar