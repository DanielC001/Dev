//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import Home from './pages/Home';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';
import Publico from './layout/publico'
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Publico>
            <Route  exact path='/'>
              <Home/>
            </Route>
          </Publico>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
