import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PokemonClient, PokemonSpecies, Pokemon } from "pokenode-ts"
import Page from "../../components/Page";
import MainInfo from "./MainInfo";
import OtherInfo from "./OtherInfo";

export default function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = new PokemonClient();

  const [species, setSpecies] = useState<PokemonSpecies>();
  const [forms, setForms] = useState<Pokemon[]>()
  const [current_form, setCurrentForm] = useState<Pokemon>();
  const [max_pokemon, setMaxPokemon] = useState(0)
  const [id_copy, setIdCopy] = useState<number>(0)

  const getSpecies = async () => {
    await api.getPokemonSpeciesByName(id || '')
      .then(res => setSpecies(res))
  }

  const getForms = async () => {
    await species?.varieties.map(v => {
      api.getPokemonByName(v.pokemon.name)
        .then(res => setForms(
          oldForms => (oldForms && !oldForms.find(p => res.id == p.id) ? [...oldForms
            .filter(form => form.species.name === species?.name), res] : [res]))
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

    if (id && !isNaN(Number(id)) && species)
      navigate(`/pokemon/${species.name}`)

  }, [species])

  useEffect(() => {
    if (forms) {
      forms.sort((a, b) => a.id < b.id ? -1 : 1)
      setCurrentForm(forms[0])
    }
  }, [forms])

  if (species && forms && current_form)
    return (
      <Page>
        <MainInfo
          max_pokemon={max_pokemon}
          species={species}
          forms={forms}
          current_form={current_form}
        />
        <OtherInfo
          pokemonForm={current_form}
          pokemonSpecies={species}
        />
      </Page>
    )

  return (
    <></>
  )
}