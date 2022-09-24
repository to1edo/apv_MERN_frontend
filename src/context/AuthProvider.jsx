import {useState, useEffect, createContext} from 'react'
import axios from 'axios';

const AuthContext = createContext()

const AuthProvider = ({children})=>{

    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})

    
    useEffect(()=>{
        const autenticarUsuario = async ()=>{

            const token = localStorage.getItem('JWT');

            if(!token){
                setCargando(false)
                return
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                
                const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil`, config)
                setAuth(res.data.veterinario) 
                
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)
        }

        autenticarUsuario()
    },[])

    const actualizarPerfil = async(perfil)=>{

        const token = localStorage.getItem('JWT');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
                
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil/${perfil._id}`, perfil ,config)
            return {msg: res.data.msg, error:false}
            
        } catch (error) {
            return {msg: error.response.data.msg, error:true}
        }

    }


    const actualizarPassword = async(datos)=>{

        const token = localStorage.getItem('JWT');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
                
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/actualizar-password`, datos ,config)
            return {msg: res.data.msg, error:false}
            
        } catch (error) {
            return {msg: error.response.data.msg, error:true}
        }

    }

    const cerrarSesion = ()=>{
        localStorage.removeItem('JWT')
        setAuth({}) 
    }

    return(
        <AuthContext.Provider value={ {auth, setAuth, cargando, actualizarPerfil, actualizarPassword, cerrarSesion} }>
            {children}
        </AuthContext.Provider>
    )
}


export{ AuthProvider }

export default AuthContext