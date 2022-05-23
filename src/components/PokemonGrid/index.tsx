import React from "react";
import './PokemonGrid.css'

export default function PokemonGrid({children} : {children? : React.ReactNode}){
  return(
    <div className="pokemonGrid">
        {children}
    </div>
  )
}