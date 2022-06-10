import { Pokemon } from "pokenode-ts";
import React from "react";
import SpeciesAndBaseForm from "types/SpeciesAndForm";
import PokemonCard from "./PokemonCard";
import './PokemonGrid.scss'

interface Props{
  list : SpeciesAndBaseForm[]
}

export default function PokemonGrid({list} : Props){
  return(
    <div className="pokemon-grid">
      {list.map((l, index) => <PokemonCard key={index} pokemon={l.pokemon}/>)}
    </div>
  )
}