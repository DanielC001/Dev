import React from 'react'
import '../App.css'
//componentes
import Header from '../components/Header'
import Footer from '../components/Footer'
const publico = ({children}) => {
    return (
        <div className='distribucion'>
            <Header></Header>
            <main>{children}</main>
            <Footer></Footer>
        </div>
    )
}

export default publico
