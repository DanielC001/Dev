//const express = require('express');
import Express from 'express';


const app = Express();

//Funcionalidad
//el navegador solo recibe peticiones get
app.get('/vehiculos',(req,res)=>{
    console.log('alguien hizo get en la ruta /vehiculos');
    //res.send('Hola mundo');
    const vehiculos = [
        {nombre:'march',marca:'nissan'},
        {nombre:'hilux',marca:'toyota'},
        {nombre:'fiesta',marca:'ford'}
    ]
    res.send(vehiculos);
});

//ruta de tipo post
app.post('/vehiculos/nuevo',(req,res)=>{
    console.log('Solicitud a /vehiculos/nuevo');
    res.send('vehiculo creado')
;});

app.listen(5000,()=>{
    console.log('Conectado en el puerto 5000');
});


