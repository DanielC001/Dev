import React from 'react'
import '../App.css'
import{Link} from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className='Sidebar'>
            <ul>
                <li className='Espaciado'>Inicio</li>
                <li>Usuarios</li>
                <li>Vehiculos</li>
            </ul>
        </nav>
    )
}

export default Sidebar;
