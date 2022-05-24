import { Pokemon } from "pokenode-ts";
import React from "react";
import PokemonCard from "./PokemonCard";
import './PokemonGrid.scss'

interface Props{
  pokemon_list : Pokemon[]
}

export default function PokemonGrid({pokemon_list} : Props){
  return(
    <div className="pokemon-grid">
      {pokemon_list.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon}/>)}
    </div>
  )
}