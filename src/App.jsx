
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'

import {AuthProvider} from './context/AuthProvider'
import {PacientesProvider} from './context/PacientesProvider'
import RutaProtegida from './layout/RutaProtegida'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import Perfil from './paginas/Perfil'
import CambiarPassword from './paginas/CambiarPassword'

function App () {

    return (
        <BrowserRouter>
            <AuthProvider>
                <PacientesProvider>
                    <Routes>
                        <Route path='/' element={<AuthLayout/>}>
                            <Route index element={<Login/>} />
                            <Route path='registrar' element={ <Registrar/>}/>
                            <Route path='confirmar/:token' element={ <ConfirmarCuenta/>}/>
                            <Route path='olvide-password' element={ <OlvidePassword/>}/>
                            <Route path='olvide-password/:token' element={ <NuevoPassword/>}/>
                        </Route>

                        <Route path='/admin' element={<RutaProtegida/>}>
                            <Route index element={<AdministrarPacientes/>} />
                            <Route path='perfil' element={<Perfil/>} />
                            <Route path='cambiar-password' element={<CambiarPassword/>} />
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
