import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Header = () => {

    const {cerrarSesion} = useAuth()

    return (
        <header className="py-4  bg-indigo-900/100 ">
            <div className="container mx-auto flex gap-8 flex-col md:flex-row justify-between items-center">
                <h1 className="text-center font-bold text-2xl md:text-2xl">Panel de Administración</h1>
                
                <nav className="flex flex-col gap-6 md:flex-row items-center">
                    <Link className="p-2 text-white text-base md:text-xl font-bold uppercase hover:text-indigo-300" to="">Pacientes</Link>
                    <Link className="p-2 text-white text-base md:text-xl font-bold uppercase hover:text-indigo-300" to="perfil">Perfil</Link>
                    <button onClick={ cerrarSesion } className="p-2 rounded-lg bg-indigo-400 text-white text-base md:text-xl font-bold uppercase hover:text-indigo-300">Cerrar Sesión</button>
                </nav>
            </div>

            
        </header>
    )
}

export default Header