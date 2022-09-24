import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import Header from "../components/Header"
import Foorter from "../components/Foorter"


const RutaProtegida = () => {

    const {auth, cargando} = useAuth()

    if(cargando){ 
        return "Cargando, aguarde..."
    }

    return (
        <>
            <Header/>
                <main className="py-10 container mx-auto">
                    { auth._id ? <Outlet/> : <Navigate to="/" /> }
                </main>
            <Foorter/>
        </>
    )
}

export default RutaProtegida