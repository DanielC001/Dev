import { nanoid } from 'nanoid';
import React from 'react'
import { useEffect, useState, useRef } from 'react'  //capturar acciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios';
//import {obtenerVeh} from '../../utils/api'
import '../../App.css'


const Vehiculos = () => {
    const [mostrarTabla, setMostrarTabla] = useState(true);
    const [vehiculos, setVehiculos] = useState([]);
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Vehiculo');
    const [colorBoton, setColorBoton] = useState('botonAzul');

    useEffect(() => {
        const obtenerVeh = async () => {
            const options = { method: 'GET', url: 'http://localhost:5000/vehiculos/' };
            await axios
                .request(options)
                .then(function (response) {
                    console.log(response.data);
                    setVehiculos(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            //setEjeConsulta(false);
        };
        if (mostrarTabla) {
            obtenerVeh();
        }
    }, [mostrarTabla]);

    const cambiarNombre = (e) => {
        console.log(e.target.value);
        setVehiculos(e.target.value);
    };

    const cambiar = () => {
        setMostrarTabla(!mostrarTabla);
    }

    return (
        <div>
            <input type="text" placeholder='Nombre' onChange={cambiarNombre} />
            <input type="text" placeholder='Marca' />
            <input type="text" placeholder='Modelo' />
            <button type="button" onClick={cambiar} className={colorBoton}>{textoBoton}</button>
            {mostrarTabla ? <TablaVehiculos listaVehiculos={vehiculos}/> : <FormularioCreacionVehiculos
                setMostrarTabla={setMostrarTabla} setVehiculos={setVehiculos} listaVehiculos={vehiculos}
            />}
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
    )
}

const TablaVehiculos = ({ listaVehiculos }) => {
    useEffect(() => {
        console.log(listaVehiculos);
    }, [listaVehiculos]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Marca</th>
                </tr>
            </thead>
            <tbody>
                {listaVehiculos.map((vehiculo) => {
                    return (
                        <tr key={nanoid()}>
                            <td>{vehiculo.name}</td>
                            <td>{vehiculo.marca}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

const FormularioCreacionVehiculos = ({ setMostrarTabla, listaVehiculos, setVehiculos }) => {
    const form = useRef(null);
    //
    const [name, setNombre] = useState('');
    const [marca, setMarca] = useState('');

    const submitForm = async (e) => {
        e.preventDefault();
        const fd = new FormData(form.current);

        const nuevoVehiculo = {};
        fd.forEach((val, key) => {
            nuevoVehiculo[key] = val;
            //console.log(key,val);
        });
        const options = {
            method: 'POST',
            url: 'http://localhost:5000/vehiculos/nuevo/',
            headers: { 'content-type': 'application/json' },
            data: { name: nuevoVehiculo.name, marca: nuevoVehiculo.marca },
        };

        await axios.request(options).then(function (response) {
            console.log(response.data);
            toast.success('OK');
        }).catch(function (error) {
            console.log(error);
        });
        setMostrarTabla(true);
        toast.success('OK');
    }

    return (
        <div>
            <form ref={form} onSubmit={submitForm} >
                <label htmlFor="name">
                    <input name='name' type="text" placeholder='Nombre' />
                </label>
                <label htmlFor="marca">
                    <input name='marca' type="text" placeholder='Marca' required />
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
    )
};

export default Vehiculos;
