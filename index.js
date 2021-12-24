document.write('<h1>Hola</h1>');
//console.log('java');
var x = 5 ;
document.writeln(x);

//funcion
function Sumar(a,b,c){
    var x = a+b;
    if(c==true){
        document.writeln(x);
    }else{
        return x;
    }
    var x = a+b;
}

//var y = Sumar(5,4,false);
//document.writeln('igual a: '+y);

//objetos
var persona1 = {nombre:'pedro',apellido:'perez'};
//las variables adentro del objeto, son propiedades.
document.writeln(persona1.nombre +'length:'+ persona1.nombre.length); //accediendo a la propiedad nombre.

//constructor
function persona(nombre,apellido,edad){
    this.nombre=nombre;
    this.apellido=apellido;
    this.edad=edad;
    this.Nombre = function(){ //metodo
        return this.nombre+' '+this.apellido;
    }
    this.IsAdulto = comEdad;
}
//el metodo es la funcion dentro de un objeto
function comEdad(){
    if(this.edad>=18){
        return true;
    }else{
        return false;
    }   
}
var p1 = new persona("mario","fernandez",16);
console.log(p1.nombre);

console.log(p1.Nombre());
console.log(p1.IsAdulto());

//-------------------------------------
//Arreglos
var Edades = new Array(15,20,40);
console.log(Edades[0]);
var frutas = new Array(3);
frutas[0]="pera";
frutas[1]="manzana";
console.log(frutas[2]);
frutas[2]="piña";
console.log(frutas[2]);

var numeros = new Array(); // se le pueden definir infinitos valores.

//Date y otros

function Alerta(){
    alert('Hola');
}
//setInterval(Alerta,3000); //3000 miliSegundos , 3 segundos
var fecha = new Date();
//var fecha = new Date("2020","9","06");
console.log(fecha);
console.log(fecha.getDay());

function Hora(){
var fecha = new Date();
var hora = fecha.getHours();
var minutos = fecha.getMinutes();
var segundos = fecha.getSeconds();
document.body.innerHTML = hora+":"+minutos+":"+segundos;
}

//setInterval(Hora,1000); Mostrar la hora en pantalla.



