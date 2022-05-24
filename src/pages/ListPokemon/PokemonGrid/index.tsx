import React from "react";
import './PokemonGrid.scss'

export default function PokemonGrid({children} : {children? : React.ReactNode}){
  return(
    <div className="pokemonGrid">
        {children}
    </div>
  )
}