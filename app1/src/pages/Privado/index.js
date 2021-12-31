import React from 'react'
import { useEffect, useState, useRef } from 'react'  //capturar acciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import axios from 'axios';
//import {obtenerVeh} from '../../utils/api'
import '../../App.css'

const Index = () => {
    const [vehiculoss, setVehiculoss] = useState([]);
    const [ejecutarConsulta, setEjeConsulta] = useState(true);
    const [nombreVehiculo, setVehiculo] = useState('');
    const [mostrarTabla, setMostarTabla] = useState(true);
    const [colorBoton, setColorBoton] = useState('botonAzul');
    const [textoBoton, setTextoBoton] = useState('Crear Nuevo Vehiculo')
    /*
    const vehiculosBackend = [
        {
            nombre: "fiesta",
            marca: "ford"
        }, {
            nombre: "hilux",
            marca: "toyota"
        }, {
            nombre: "spark",
            marca: "chevrolet"
        }
    ]
    */
    const obtenerVeh = async (setVehiculoss, setEjeConsulta) => {
        const options = { method: 'GET', url: 'http://locahost:5000/vehiculos/' };
        await axios
            .request(options)
            .then(function (response) {
                setVehiculoss(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
        setEjeConsulta(false);
    };
    //obtenerVeh();
    useEffect(() => {
        //obtener informacion del backend
        if (ejecutarConsulta) {
            obtenerVeh();
        }
    }, [ejecutarConsulta])

    useEffect(() => {
        if (mostrarTabla) {
            setEjeConsulta(true);
        }
    }, [mostrarTabla]);
    /*
        useEffect(()=>{
    
        },[]);
    */
    /*
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
*/


    useEffect(() => {
        console.log('Esto es un UseEffect')
    }, []);
    /*tiene dos parametros, el 
    1:ejecuta la funcion que se coloca
    2:monitorea lo que se coloque en los corchetes(si se deja vacio se carga solo una vez) */

    //onChange, cuando cambie se ejecuta una función
    const cambiarNombre = (e) => {
        console.log(e.target.value);
        setVehiculo(e.target.value);
    };

    const enviar = () => {
        console.log('el nombre del vehiculo es: ', nombreVehiculo);
    }

    const cambiar = () => {
        setMostarTabla(!mostrarTabla);
    }

    useEffect(() => {
        if (mostrarTabla) {
            setTextoBoton('Crear Nuevo Vehiculo');
            setColorBoton('botonAzul');
        } else {
            setTextoBoton('Mostrar vehiculos');
            setColorBoton('botonVerde');
        }
    }, [mostrarTabla]);

    const TablaVehiculos = ({ listaVehiculoss, setEjeConsulta }) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Marca</th>
                    </tr>
                </thead>
                <tbody>
                    {listaVehiculoss.map((vehiculo) => {
                        return (
                            <tr key={nanoid()}>
                                <td>{vehiculo.name}</td>
                                <td>{vehiculo.marca}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        )
    }
    //const FormularioCreacion=({funcionMostrarTabla,funcionAgregarVehiculo,listaVehiculoss})=>{
    const FormularioCreacion = ({ setMostrarTabla, setVehiculoss, listaVehiculoss }) => {
        //para el useRef
        const form = useRef(null);
        //
        const [name, setNombre] = useState('');
        const [marca, setMarca] = useState('');

        const enviaralBack = () => {
            console.log('name', name, 'marca', marca);
            if (name === '' || marca === '') {
                toast.error('error');
            } else {
                toast.success("Mensaje");
                //funcionMostrarTabla(true);
                // funcionAgregarVehiculo([...listaVehiculoss,{nombre:nombre,marca:marca},]);
            }

        };

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
            setMostarTabla(true);
            toast.success('OK');
            //setVehiculoss([...listaVehiculoss,nuevoVehiculo]);
            //console.log('datos enviados',fd);
        }

        return (
            <div>
                <form ref={form} onSubmit={submitForm} >
                    <label htmlFor="name">
                        <input name='name' type="text" placeholder='Nombre' />
                        {/*required 
                    value={nombre}
                    onChange={(e)=>{
                        setNombre(e.target.value);
                    }}*/}
                    </label>
                    <label htmlFor="marca">
                        <input name='marca' type="text" placeholder='Marca' required />
                        {/*value={marca}
                    required
                    onChange={(e)=>{
                        setMarca(e.target.value);
                    }}*/};
                    </label>
                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
        /* <button type="submit" onClick={enviaralBack}>Enviar</button> Primera forma*/
    }
    return (
        <div>
            <input type="text" placeholder='Nombre' onChange={cambiarNombre} />
            <input type="text" placeholder='Marca' />
            <input type="text" placeholder='Modelo' />
            <button type="button" onClick={enviar}>Enviar</button>
            <button type="button" onClick={cambiar} className={colorBoton}>{textoBoton}</button>
            {mostrarTabla ? <TablaVehiculos listaVehiculoss={vehiculoss} setEjeConsulta={setEjeConsulta} /> : <FormularioCreacion
                setMostrarTabla={setMostarTabla} setVehiculoss={setVehiculoss} listaVehiculoss={vehiculoss}
            />}
            <ToastContainer position='bottom-center' autoClose={5000} />
        </div>
    )
}
//{mostrarTabla? 'Crear Nuevo vehiculo' : 'Mostrar Tabla'}
export default Index;
