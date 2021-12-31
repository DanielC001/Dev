//const express = require('express');
import Express from 'express';
import {MongoClient,ObjectId} from 'mongodb';
//const cors = require('cors');
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
const {BD_URI}=process.env;
const {PORT}=process.env || 5000;


const client = new MongoClient(BD_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

const app = Express();
app.use(Express.json());
app.use(cors());

//Funcionalidad
//el navegador solo recibe peticiones get
app.get('/vehiculos',(req,res)=>{
    console.log('alguien hizo get en la ruta /vehiculos');
    //res.send('Hola mundo');
    conexion.collection('vehiculo').find({}).toArray((err,result)=>{
        if(err){
            console.error(err);
            res.status(400).send('error consultando');
        }else{
            res.json(result);
        }
    });
    /*
    const vehiculos = [
        {nombre:'march',marca:'nissan'},
        {nombre:'hilux',marca:'toyota'},
        {nombre:'fiesta',marca:'ford'}
    ]
    res.send(vehiculos);*/
});

//ruta de tipo post
app.post('/vehiculos/nuevo',(req,res)=>{
    //console.log('Solicitud a /vehiculos/nuevo');
    const datosVehiculo = req.body;
    //console.log('llaves',Object.keys(datosVehiculo));
    try{
        if(
            Object.keys(datosVehiculo).includes('name')&&
            Object.keys(datosVehiculo).includes('marca')
        ){
            conexion.collection('vehiculo').insertOne(datosVehiculo,(err,result)=>{
                if(err){
                    console.error(err);
                    res.sendStatus(500);
                }else{
                    console.log(result);
                    res.sendStatus(200);
                }
            });
            //res.sendStatus(200);
        }else{
            res.sendStatus(500);}
    }catch{
        res.sendStatus(500);
    }
    //res.send('vehiculo creado')
    //console.log('Vehiculo a crear',req.body);
;});

app.patch('/vehiculos/editar',(req,res)=>{
    const edicion = req.body;
    const filtro = {_id:new ObjectId(edicion.id)};
    delete edicion.id;
    const operacion={
        $set:edicion,
    };
    conexion.collection('vehiculo').findOneAndUpdate(filtro,operacion,{upsert:true,returnOriginal:true},(err,result)=>{
        if(err){
            console.log('error',err);
            res.sendStatus(500);
        }else{
            console.log('actualizado');
            res.sendStatus(200);
        }
    });
})

app.delete('/vehiculos/eliminar',(req,res)=>{
    const edicion = req.body;
    const filtro = {_id:new ObjectId(edicion.id)};
    conexion.collection('vehiculo').deleteOne(filtro,(err,result)=>{
        if(err){
            console.log('error',err);
            res.sendStatus(500);
        }else{
            console.log('actualizado');
            res.sendStatus(200);
        }
    })
});
/*app.listen(5000,()=>{
    console.log('Conectado en el puerto 5000');
});*/

let conexion;

const main=()=>{
    client.connect((err,db)=>{
        if(err){
            console.log('error de conexion');
        }
        conexion = db.db('concesionario');
        console.log('Conectado a la base de datos');
        return app.listen(PORT,()=>{
            console.log('Conectado en el puerto 5000');
        });
    });
};

main();


