import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { PokemonClient, PokemonSpecies, Pokemon } from "pokenode-ts"
import Page from "../../components/Page";
import MainInfo from "./MainInfo";
import OtherInfo from "./OtherInfo";
import Formatting from "common/utils/string";

export default function PokemonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = new PokemonClient();
  const f = Formatting.formattingSpeciesName

  const [species, setSpecies] = useState<PokemonSpecies>();
  const [form, setPokemonForm] = useState<Pokemon>();
  const [max_pokemon, setMaxPokemon] = useState(0)

  const getSpecies = async () => {
    await api.getPokemonSpeciesByName(id || '')
      .then(res => setSpecies(res))
  }

  const getForm = async () => {
    species && await api.getPokemonById(species.id)
      .then(res => setPokemonForm(res))
  }

  useEffect(() => {
    api.listPokemonSpecies(0, -1)
      .then(res => setMaxPokemon(res.count))
  })

  useEffect(() => {
    getSpecies()
  }, [id])

  useEffect(() => {
    getForm()
  }, [species])

  useEffect(() => {
    if (species){
      if (id && !isNaN(Number(id)) && species)
        navigate(`/pokemon/${species.name}`)

      document.title=(f(species.name))
    }
  }, [species])

  // useEffect(() => {
  //   if (forms) {
  //     forms.sort((a, b) => a.id < b.id ? -1 : 1)
  //     setPokemonForm(forms[0])
  //   }
  // }, [forms])

  if (species && form)
    return (
      <Page>
        <MainInfo
          max_pokemon={max_pokemon}
          species={species}
          form={form}
        />
        <OtherInfo
          pokemonForm={form}
          pokemonSpecies={species}
        />
      </Page>
    )

  return (
    <></>
  )
}