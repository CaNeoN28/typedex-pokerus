import { useState } from "react"
import { useParams } from "react-router-dom"
import { PokemonClient, PokemonSpecies, Pokemon } from "pokenode-ts"
import Page from "../../components/Page";
import InfoPage from "../../components/InfoPage";

export default function PokemonPage() {
  const { id } = useParams();
  const api = new PokemonClient();

  const [species, setSpecies] = useState<PokemonSpecies>();
  const [form, setForm] = useState(0)
  const [forms, setForms] = useState<Pokemon[]>()

  if (id) {
    api.getPokemonSpeciesByName(id)
      .then(res => setSpecies(res))
    species?.varieties.map(v => {
      api.getPokemonByName(v.pokemon.name)
        .then(res => setForms(oldForms => oldForms ? [...oldForms, res] : [res]))
    })
  }

  if (species && forms)
    return (
      <Page>
        <InfoPage>
          <img src={forms[0].sprites.other["official-artwork"].front_default || ''}/>
        </InfoPage>
      </Page>
    )

  return (
    <></>
  )
}