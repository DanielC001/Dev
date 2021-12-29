import React from 'react'
import { useEffect,useState } from 'react'  //capturar acciones
import axios from 'axios';

const Index = () => {
    const options={
        method:'POST',
        url:'http://localhost:5000/vehiculos/nuevo',
        headers:{'content-type':'application/json'},
        data:{name:'Sandero',marca:'Renault'},
    };

    axios.request(options).then(function(response){
        console.log(response.data);
    }).catch(function(error){
        console.log(error);
    });

    const[nombreVehiculo,setVehiculo]=useState('');
    const[mostrarTabla,setMostarTabla]=useState(true);

    useEffect(()=>{
        console.log('Esto es un UseEffect')
    },[]); 
    /*tiene dos parametros, el 
    1:ejecuta la funcion que se coloca
    2:monitorea lo que se coloque en los corchetes(si se deja vacio se carga solo una vez) */

    //onChange, cuando cambie se ejecuta una función
    const cambiarNombre=(e)=>{
        console.log(e.target.value);
        setVehiculo(e.target.value);
    };

    const enviar=()=>{
        console.log('el nombre del vehiculo es: ',nombreVehiculo);
    }

    const cambiar=()=>{
        setMostarTabla(!mostrarTabla);
    }   
    const TablaVehiculos=()=>{
        return (
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Dato 1</td>
                        <td>Dato 2</td>
                        <td>Dato 3</td>
                    </tr>
                </tbody>
            </table>
        )
    }
    const FormularioCreacion=()=>{
        return (
        <div>
            <form >
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button type="text">Enviar</button>
            </form>
        </div>
        )
    }
    return (
        <form>
            <input type="text" placeholder='Nombre' onChange={cambiarNombre} />
            <input type="text" placeholder='Marca'/>
            <input type="text" placeholder='Modelo'/>
            <button type="button" onClick={enviar}>Enviar</button>
            <button type="button" onClick={cambiar}>{mostrarTabla? 'Crear Nuevo vehiculo' : 'Mostrar Tabla'}</button>
            {mostrarTabla ? <TablaVehiculos/> : <FormularioCreacion/>}
        </form>
    )
}

export default Index;
