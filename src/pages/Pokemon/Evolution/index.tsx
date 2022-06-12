import axios from "axios";
import InfoPage from "components/InfoPage";
import { EvolutionChain, PokemonSpecies } from "pokenode-ts";
import { useEffect, useState } from "react";
import './Evolution.scss'

interface Props {
  species: PokemonSpecies
}

export default function Evolution({ species }: Props) {

  const [line, setLine] = useState<EvolutionChain>()

  const getEvoLine = async () => {
    axios.get(species.evolution_chain.url)
      .then(evolution_chain =>
        setLine(evolution_chain.data)
      )
  }

  useEffect(() => {
    getEvoLine()
  }, [])

  return (
    <InfoPage>
      <p>Evolutionary Line</p>
      {line && (
        <>{line.chain.species.name}</>
      )}
    </InfoPage>
  )
}