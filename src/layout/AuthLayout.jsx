import { Outlet } from 'react-router-dom'
import Foorter from '../components/Foorter'

const AuthLayout = () => {
    return (
		<>
            <main className="container px-8 py-4 md:px-0 mx-auto md:grid grid-cols-2 gap-16 items-center">

				<Outlet/>
			
			</main>
			
			<Foorter/>
		</>

    )
}

export default AuthLayout