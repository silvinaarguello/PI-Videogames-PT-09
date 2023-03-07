import './App.css';
import { BrowserRouter, Route, Switch  } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import Details from './Components/DetailsGame/Details';
import CreateGame from './Components/CreateGame/CreateGame';
import NotFound from './Components/NotFound/NotFound.jsx';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route exact path= '/'><LandingPage /></Route>
      <Route exact path= '/home'><Home /></Route>
      <Route  path='/videogames/:id' ><Details /> </Route> 
      <Route  path= '/videogames' ><CreateGame /></Route>
      <Route path="*" component={NotFound} />
      
                        
           
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
