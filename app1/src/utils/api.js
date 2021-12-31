import axios from "axios";

export const obtenerVeh = async(setVehiculos,setEjeConsulta)=>{
    const options={method:'GET',url:'http://locahost:5000/vehiculos'};
    await axios
    .request(options)
    .then(function(response){
        setVehiculos(response.data);
    })
    .catch(function(error){
        console.log(error);
    });
    setEjeConsulta(false);
};