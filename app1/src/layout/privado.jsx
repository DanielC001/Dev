import React from 'react'
import Sidebar from '../components/Sidebar';
//import { useAuth0 } from '@auth0/auth0-react';
import RutaPrivada from '../components/RutaPrivada';
const privado = ({ children }) => {
    //const {user,isAuthenticated,isLoading}= useAuth0();

    return (
        <RutaPrivada>
            <div className='privado'>
                <Sidebar></Sidebar>
                <main>{children}</main>
            </div>
        </RutaPrivada>
    )
}

export default privado;
