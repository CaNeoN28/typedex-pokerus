import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PokemonClient, PokemonSpecies, Pokemon } from "pokenode-ts"
import Page from "../../components/Page";
import MainInfo from "./Main";

export default function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = new PokemonClient();

  const [species, setSpecies] = useState<PokemonSpecies>();
  const [form, setForm] = useState(0)
  const [forms, setForms] = useState<Pokemon[]>()
  const [current_form, setCurrentForm] = useState<Pokemon>();
  const [max_pokemon, setMaxPokemon] = useState(0)
  const [id_copy, setIdCopy] = useState<number>(0)

  const getSpecies = async() => {
    await api.getPokemonSpeciesByName(id || '')
      .then(res => setSpecies(res))
  }

  const getForms = async() => {
    await species?.varieties.map(v => {
      api.getPokemonByName(v.pokemon.name)
        .then(res => setForms(
          oldForms => (oldForms && !oldForms.find(p => res.id == p.id) ? [...oldForms, res] : [res])
            .filter(form => form.species.name === species.name)
            .sort((a, b) => (a.id < b.id) ? -1 : 1))
        )
    })

    species && setIdCopy(species?.id)
  }

  useEffect(() => {
    api.listPokemonSpecies(0, -1)
      .then(res => setMaxPokemon(res.count))
  })

  useEffect(() => {
    getSpecies()
  }, [id])

  useEffect(() => {
    getForms()
  }, [species])
  
  useEffect(() => {
    setForm(0)
    if (id_copy != species?.id && id_copy != 0) {
      navigate(`/pokemon/${id_copy}`)
    }
  }, [id_copy])

  useEffect(() => {
    if (forms)
      setCurrentForm(forms[form])
  }, )

  if (species && forms && current_form)
    return (
      <Page>
        <MainInfo max_pokemon={max_pokemon} species={species} forms={forms} current_form={current_form}/>
      </Page>
    )

  return (
    <></>
  )
}