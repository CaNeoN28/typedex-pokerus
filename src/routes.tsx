import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PokemonPage from "./pages/Pokemon"

export default function AppRouter(){
  return(
    <Router>
      <Routes>
        <Route path="pokemon/:id" element={<PokemonPage/>}/>
      </Routes>
    </Router>
  )
}