import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PokemonClient, PokemonSpecies, Pokemon } from "pokenode-ts"
import Page from "../../components/Page";
import InfoPage from "../../components/InfoPage";
import MainInfo from "./Main";

export default function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = new PokemonClient();

  const [species, setSpecies] = useState<PokemonSpecies>();
  const [form, setForm] = useState(0)
  const [forms, setForms] = useState<Pokemon[]>()
  const [max_pokemon, setMaxPokemon] = useState(0)
  const [id_copy, setIdCopy] = useState<number>(0)

  useEffect(() => {
    api.listPokemonSpecies(0, -1)
      .then(res => setMaxPokemon(res.count))
  })

  useEffect(() => {
    api.getPokemonSpeciesByName(id || '')
      .then(res => setSpecies(res))
  }, [id])

  useEffect(() => {
    species?.varieties.map(v => {
      api.getPokemonByName(v.pokemon.name)
        .then(res => setForms(
          oldForms => (oldForms && !oldForms.find(p => res.id == p.id) ? [...oldForms, res] : [res])
            .filter(form => form.species.name === species.name)
            .sort((a, b) => (a.id < b.id) ? -1 : 1))
        )
    })

    species && setIdCopy(species?.id)
  }, [species])
  
  useEffect(() => {
    setForm(0)
    if (id_copy != species?.id && id_copy != 0) {
      navigate(`/pokemon/${id_copy}`)
    }
  }, [id_copy])

  if (species && forms)
    return (
      <Page>
        <MainInfo max_pokemon={max_pokemon} species={species} forms={forms} form={form} id_copy={id_copy} setForm={setForm} setIdCopy={setIdCopy} />
      </Page>
    )

  return (
    <></>
  )
}