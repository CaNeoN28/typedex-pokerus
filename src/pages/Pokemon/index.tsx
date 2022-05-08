import { useState } from "react"
import { useParams } from "react-router-dom"
import { PokemonClient, PokemonSpecies } from "pokenode-ts"
import Page from "../../components/Page";
import InfoPage from "../../components/InfoPage";

export default function Pokemon() {
  const { id } = useParams();
  const api = new PokemonClient();

  const [species, setSpecies] = useState<PokemonSpecies>();

  if (id)
    api.getPokemonSpeciesByName(id)
      .then(res => setSpecies(res))

  if (species)
    return (
      <Page>
        <InfoPage red>
          {species.name}
        </InfoPage>
      </Page>
    )

  return (
    <></>
  )
}