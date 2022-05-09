import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { PokemonClient, PokemonSpecies, Pokemon } from "pokenode-ts"
import Page from "../../components/Page";
import InfoPage from "../../components/InfoPage";
import MainInfo from "./Main";

export default function PokemonPage() {
  const { id } = useParams();
  const api = new PokemonClient();

  const [species, setSpecies] = useState<PokemonSpecies>();
  const [form, setForm] = useState(0)
  const [forms, setForms] = useState<Pokemon[]>()

  useEffect(() => {
    api.getPokemonSpeciesByName(id || '')
      .then(res => setSpecies(res))
  }, [id])

  useEffect(() => {
    species?.varieties.map(v => {
      api.getPokemonByName(v.pokemon.name)
        .then(res => setForms(oldForms => oldForms ? [...oldForms, res] : [res]))
    })
  }, [species])

  if (species && forms)
    return (
      <Page>
        <MainInfo species={species} forms={forms} form={form} setForm={setForm} />
      </Page>
    )

  return (
    <></>
  )
}