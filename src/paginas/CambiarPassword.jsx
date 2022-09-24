import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

    const { auth, actualizarPassword} = useAuth()

    const [alerta, setAlerta] = useState('')
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()

        
        if([password.trim(), newPassword.trim(), confirmPassword.trim()].includes('')){
            setAlerta({msg:'Todos los campos son obligatorios', error:true})
            return
        }

        if(newPassword.length < 6){
            setAlerta({msg:'La contraseña de tener al menos 6 caracteres', error:true})
            return
        }

        if(newPassword !== confirmPassword){
            setAlerta({msg:'Las contraseñas no coinciden', error:true})
            return
        }

        const estado = await actualizarPassword({password,newPassword, id: auth._id})
        setAlerta(estado)
        
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    return (
        <>
            <div className="px-8 flex gap-12  justify-evenly md:justify-start">
                <Link className="font-bold text-xl" to="/admin/perfil">Editar Datos</Link>
                <Link className="font-bold text-xl text-indigo-500" to="/admin/cambiar-password">Cambiar Contraseña</Link>
            </div>

            <div className="mx-4">
                <h1 className="text-gray-300 text-center text-xl md:text-2xl font-bold  pt-4">Cambiar tu Contraseña</h1>
            </div>

            <div className="mt-8 md:mt-4 max-w-xl mx-auto " >
                
                <form onSubmit={ handleSubmit }  className="shadow-lg p-6  rounded-xl"> 

                { alerta && <Alerta alerta = {alerta} /> }

                    <div className="mb-4 ">
                        <label htmlFor="password" className="uppercase block font-medium text-white mb-2">Contraseña actual *</label>
                        <input onInput={ e => setPassword(e.target.value)} value={password} id="password" className="w-full border p-3 bg-grey-50 rounded-xl" type="password" placeholder="Tu nueva contraseña"  required/>
                    </div>

                    <div className="mb-4 ">
                        <label htmlFor="newPassword" className="uppercase block font-medium text-white mb-2">Nueva contraseña *</label>
                        <input onInput={ e => setNewPassword(e.target.value)} value={newPassword} id="newPassword" className="w-full border p-3 bg-grey-50 rounded-xl" type="password" placeholder="Tu nueva contraseña"  required/>
                    </div>
                    
                    <div className="mb-4 ">
                        <label htmlFor="confirmPassword" className="uppercase block font-medium text-white mb-2">Confirma la nueva contraseña *</label>
                        <input onInput={ e => setConfirmPassword(e.target.value)} value={confirmPassword} id="confirmPassword" className="w-full border p-3 bg-grey-50 rounded-xl" type="password" placeholder="Confirma tu contraseña"  required/>
                    </div>

                    <p className="text-sm text-gray-300">* Campos obligatorios</p>
                
                    <div>
                        <input className=" cursor-pointer w-full mt-6 block bg-indigo-700 py-2 px-4 rounded-lg text-white font-medium uppercase md:w-auto md:mx-auto" type="submit" value="Guardar Cambios" />
                    </div>
                </form>

            </div>
        </>
    )
}

export default CambiarPassword