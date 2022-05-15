import NavBar from "components/NavBar"
import ListPokemon from "pages/ListPokemon"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PokemonPage from "./pages/Pokemon"

export default function AppRouter(){
  return(
    <Router>
      <NavBar/>
      <Routes>
        <Route path="pokemon/:id" element={<PokemonPage/>}/>
        <Route path="/" element={<ListPokemon/>}/>
      </Routes>
    </Router>
  )
}