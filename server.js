import express from 'express';
import { MongoClient , ObjectId } from 'mongodb';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});

//const stringConexion = 'mongodb+srv://admin:admin1234@cluster0.cuue1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const stringConexion = process.env.BD_URI;
const port =process.env.PORT || 5000;
const client = new MongoClient(stringConexion,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

let conexion;
const app = express();

app.use(express.json());
app.use(cors());

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

const main = () =>{
    client.connect((err,db)=>{
        if(err){
            console.error('Error conectando');
        }
        conexion=db.db('concesionario');
        console.log('conectado a la BD');
        return app.listen(5000,()=>{
            console.log('escuchando puerto 5000');
        });
    });
    //const conexion = 
}

main();