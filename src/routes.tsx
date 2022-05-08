import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Pokemon from "./pages/Pokemon"

export default function AppRouter(){
  return(
    <Router>
      <Routes>
        <Route path="pokemon/:id" element={<Pokemon/>}/>
      </Routes>
    </Router>
  )
}