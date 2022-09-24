import { Link } from "react-router-dom"
import { useState } from "react"
import axios from 'axios'
import Alerta from "../components/Alerta"

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        if(email.trim() === ''){
            setAlerta({msg:'El email es obligatorio', error:true})
            return
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/olvide-password`, {email})
            setAlerta({msg:res.data.msg , error:false})
            setEmail('')
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
                <form onSubmit={ handleSubmit }  className="shadow-lg p-6  rounded-xl"> 
                    { alerta && <Alerta alerta={alerta} />}
                    <div className="mb-4 ">
                        <label htmlFor="email" className="uppercase block font-medium text-white mb-2">Email *</label>
                        <input onInput={ e => setEmail(e.target.value)} id="email" value={email} className="w-full border p-3 bg-grey-50 rounded-xl" type="email" placeholder="Tu email"  required/>
                    </div>
                    <p className="text-sm text-gray-300">* Campo obligatorio</p>
                    <div>
                        <input  className=" cursor-pointer w-full mt-8 block bg-indigo-700 py-2 px-4  rounded-lg text-white font-medium uppercase md:w-auto md:mx-auto" type="submit" value="Recuperar contraseña" />
                    </div>
                </form>

                <nav className="flex flex-col items-center gap-4 md:flex-row md:justify-evenly mt-10">
                    <Link className="font-semibold text-gray-300" to="/registrar">No tienes cuenta?, crea una</Link>            </nav>
            </div>
        </>
    )
}

export default OlvidePassword