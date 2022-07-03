import './App.css';
import Landingpage from './Components/LandingPage/LandingPage';
import { Route, useLocation } from 'react-router-dom'
import Home from './Components/Home/Home';
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';
import Navbar from './Components/Navbar/NavBar';
import PokemonDetails from './Components/PokemonDetails/PokemonDetails';
import PokemonByName from './Components/Search/PokemonByName';



function App() {
  const { pathname } = useLocation()
  // console.log(pathname)
  return (
    <div className='App'>
      {(pathname === "/") ? (<Route path='/' component={Landingpage} />)
        : (<>
          <Navbar />
          <Route path='/home' component={Home} />
          <Route exact path='/pokemons/:id' component={PokemonDetails} />
          <Route path='/pokemon/:name' component={PokemonByName} />
          <Route path='/create' component={CreatePokemon} />
        </>
        )
      }
    </div>
  );
}

export default App;



