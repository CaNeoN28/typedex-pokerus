import { Pokemon } from "pokenode-ts";
import React from "react";
import PokemonCard from "./PokemonCard";
import './PokemonGrid.scss'

interface Props{
  pokemon_list : Pokemon[]
}

export default function PokemonGrid({pokemon_list} : Props){
  return(
    <div className="pokemonGrid">
      {pokemon_list.map(pokemon => <PokemonCard pokemon={pokemon}/>)}
    </div>
  )
}