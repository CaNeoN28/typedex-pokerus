import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function AppRouter(){
  return(
    <Router>
      <Routes>
        <Route path="pokemon/:id" element={<></>}/>
      </Routes>
    </Router>
  )
}