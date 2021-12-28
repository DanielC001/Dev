import React from 'react'
import imagen1 from '../media/img1.jpg';
//import imagen2 from '../media/img2.jpg';
import imagen3 from '../media/img3.jpg';
import '../App.css'
const Home = () => {
var imagenes = [imagen1,imagen3];
var num = 0;
function next(){
  var slider = document.getElementById('slider');
  num++;
  if(num>=imagenes.length){
    num=0;
  }
  slider.src=imagenes[num];
}
setInterval(next,5000);
  return (
    <div className='home'>
      <div className='imagenes'>
        <img src={imagen1} id="slider" alt="" />
      </div>
      <section className='formulario'>
      <form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Correo</label>
            <input required type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
            <input required type="password" class="form-control" id="exampleInputPassword1"/>
          </div>
          <button type="submit" class="btn btn-primary boton">Iniciar Sesión</button>
        </form>
      </section>
    </div>
  )
}

export default Home

  