import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
const RutaPrivada = ({children}) => {
    const {isAuthenticated, isLoading} = useAuth0();
    if(isLoading) return <div>Cargando .....</div>

    return isAuthenticated ? <>{children}</> : <div>No autorizado</div>
}

export default RutaPrivada;
