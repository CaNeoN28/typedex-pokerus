import { Pokedex, Pokemon } from "pokenode-ts";
import React from "react";
import SpeciesAndBaseForm from "types/SpeciesAndForm";
import PokemonCard from "./PokemonCard";
import './PokemonGrid.scss'

interface Props {
  list: SpeciesAndBaseForm[],
  pokedex: Pokedex
}

export default function PokemonGrid({ list, pokedex }: Props) {

  return (
    <div className="pokemon-grid">
      {list.map((l, index) => <PokemonCard key={index} pokemon={l.pokemon} species={l.species} pokedex={pokedex} />)}
    </div>
  )
}