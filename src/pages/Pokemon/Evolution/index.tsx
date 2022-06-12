import axios from "axios";
import InfoPage from "components/InfoPage";
import { EvolutionChain, PokemonSpecies } from "pokenode-ts";
import { useEffect, useState } from "react";
import Line from "./Line";
import './Evolution.scss'

interface Props {
  species: PokemonSpecies
}

export default function Evolution({ species }: Props) {

  const [line, setLine] = useState<EvolutionChain>()

  const getEvoLine = async () => {
    axios.get(species.evolution_chain.url)
      .then(evolution_chain => {
        console.log(evolution_chain.data)
        setLine(evolution_chain.data)
      }
      )
  }

  useEffect(() => {
    getEvoLine()
  }, [])

  return (
    <InfoPage>
      <p>Evolutionary Line</p>
      <div 
        className={`card-space${species.name === 'eevee'
        || species.evolves_from_species && species.evolves_from_species.name === 'eevee' ? ' eevee' : ''}`}>
        {line && <Line chain_link={[line.chain]}/>}
      </div>
    </InfoPage>
  )
}