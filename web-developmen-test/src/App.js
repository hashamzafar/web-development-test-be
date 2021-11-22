import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Components/Login/Login'
import Registration from "./Components/Registration/Registration"
import Home from "./Components/Home/Home"
import NavBar from "./Components/Home/Navbar/Navbar"
function App() {

  return (

    <Router basename='/'>

      <Route exact path='/home' render={(routerProps) => <NavBar />} />
      <Route exact path='/' render={(routerProps) => <Login {...routerProps} />} />
      <Route exact path='/register' render={(routerProps) => < Registration {...routerProps} />} />

      <Route exact path='/home' render={(routerProps) => < Home {...routerProps} />} />


    </Router>

  );
}

export default App;
