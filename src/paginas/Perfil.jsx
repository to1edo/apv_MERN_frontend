import { Link } from "react-router-dom"
import { useState , useEffect} from "react"
import Alerta from "../components/Alerta"
import useAuth from "../hooks/useAuth"

const Perfil = () => {

    const {auth, actualizarPerfil} = useAuth()

    const [alerta, setAlerta] = useState('')
    const [perfil, setPerfil] = useState({})
    
    useEffect(() => {

        setPerfil(auth)

    }, [auth])

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const {nombre, email} = perfil
        if([nombre.trim(), email.trim()].includes('')){
            setAlerta({msg:'El nombre y Email son obligatorios', error:true})
            return
        }

        const estado = await actualizarPerfil(perfil)
        setAlerta(estado)
    }

    return (
        <>
            <div className="px-8 flex gap-12  justify-evenly md:justify-start">
                <Link className="font-bold text-xl text-indigo-500" to="/admin/perfil">Editar Datos</Link>
                <Link className="font-bold text-xl" to="/admin/cambiar-password">Cambiar Contraseña</Link>
            </div>

            <div className="mx-4">
                <h1 className="text-gray-300 text-center text-xl md:text-2xl font-bold  pt-4">Modificar datos personales</h1>
            </div>

            <div className="mt-8 md:mt-4 max-w-xl mx-auto " >
                
                <form onSubmit={ handleSubmit }  className="shadow-lg p-6  rounded-xl"> 

                { alerta && <Alerta alerta = {alerta} /> }

                    <div className="mb-4 ">
                        <label  htmlFor="nombre" className="uppercase text-white block font-medium  mb-2">Nombre *</label>
                        <input name="nombre" onChange={(e)=> setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })} value={perfil.nombre || ''}  id="nombre" className="w-full border p-2 bg-grey-50 rounded-xl" type="text" placeholder="Tu nombre"/>
                    </div>

                    <div className="mb-4 ">
                        <label htmlFor="email" className="uppercase block font-medium text-white mb-2">Email *</label>
                        <input name="email" onChange={(e)=> setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })} value={perfil.email || ''} id="email" className="w-full border p-3 bg-grey-50 rounded-xl" type="email" placeholder="Tu email"required />
                    </div>

                    <div className="mb-4 ">
                        <label  htmlFor="telefono" className="uppercase text-white block font-medium  mb-2">Telefono</label>
                        <input name="telefono" onInput={(e)=>setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })} value={perfil.telefono || ''}  id="telefono" className="w-full border p-2 bg-grey-50 rounded-xl" type="text" placeholder="Tu telefono"/>
                    </div>

                    <div className="mb-4 ">
                        <label  htmlFor="web" className="uppercase text-white block font-medium  mb-2">Tu Web</label>
                        <input name="web" onChange={(e)=> setPerfil({
                            ...perfil,
                            [e.target.name]: e.target.value
                        })} value={perfil.web || ''}  id="web" className="w-full border p-2 bg-grey-50 rounded-xl" type="text" placeholder="Tu web"/>
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

export default Perfil