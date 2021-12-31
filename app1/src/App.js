//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './pages/Home';
import Registro from './pages/Registro';
import Index from './pages/Privado/index';
import Vehiculo from './pages/Privado/vehiculo';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Publico from './layout/publico'
import Privado from './layout/privado';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={['/inicio','/vehiculo']}>
          <Privado>
            <Switch>
              <Route exact path='/inicio'><Index/></Route>
              <Route exact path='/vehiculo'><Vehiculo/></Route>
            </Switch>
          </Privado>
        </Route>
        <Route exact path={['/registro', '/']}>
          <Publico>
            <Switch>
              <Route exact path='/registro' ><Registro/></Route>
              <Route exact path='/' ><Home /></Route>
            </Switch>
          </Publico>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
