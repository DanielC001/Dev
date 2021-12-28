import React from 'react'
import Sidebar from '../components/Sidebar';
const privado = ({children}) => {
    return (
        <div className='privado'>
            <Sidebar></Sidebar>
            <main>{children}</main>
        </div>
    )
}

export default privado;
