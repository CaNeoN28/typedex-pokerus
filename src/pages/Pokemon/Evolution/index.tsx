import InfoPage from "components/InfoPage";
import { EvolutionClient, EvolutionChain, PokemonSpecies } from "pokenode-ts";
import { useState } from "react";
import './Evolution.scss'

interface Props{
  species: PokemonSpecies
}

export default function Evolution({species} : Props){
  const evoClient = new EvolutionClient()

  const [line, setLine] = useState<EvolutionChain>()

  return(
    <InfoPage>
      <p>Evolutionary Line</p>
    </InfoPage>
  )
}