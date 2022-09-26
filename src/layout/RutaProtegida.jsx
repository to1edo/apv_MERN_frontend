import { Outlet, Navigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

import Header from "../components/Header"
import Foorter from "../components/Foorter"
import Spinner from "../components/Spinner"

const RutaProtegida = () => {

    const {auth, cargando} = useAuth()

    if(cargando){ 
        return( 
            <>
                <p className="text-center my-8 text-xl">Cargando, aguarde un momento</p>
                <Spinner/>
            </>
        )
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