import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";
import InfoPage from "components/InfoPage";
import DataTable from "components/DataTable";
import TypeButton from "components/TypeButton";
import Formatting from "common/utils/string";
import measuring from "common/utils/measuring";
import OptionBox from "./OptionBox";
import './MainInfo.scss';
import { useEffect, useState } from "react";

interface Props {
  max_pokemon: number
  species: PokemonSpecies,
  form: Pokemon
}


export default function MainInfo({ max_pokemon, species, form}: Props) {

  const f = Formatting
  const api = new PokemonClient()

  const img = form.sprites.other["official-artwork"].front_default || ''

  const actualHeight = form.height / 10
  const actualWeight = form.weight / 10

  const { feet, inches } = measuring.metersToFootAndInches(actualHeight)

  const types = form.types.map(t => (t.type.name))

  const data = {
    title: species.genera.find(g => g.language.name == 'en')?.genus || '',
    rows: [
      {
        label: "Types",
        value: types.map(
          (t, index) => <TypeButton key={index} type={t} />
        )
      }, {
        label: "Height",
        value: [
          `${feet}'${String(inches).padStart(2, '0')}"`,
          `${actualHeight.toFixed(1)}m`
        ]
      }, {
        label: "Weight",
        value: [
          `${measuring.kgToLbs(actualWeight).toFixed(1)}lbs`,
          `${(actualWeight).toFixed(1)}kg`
        ]
      }, {
        label: "Egg groups",
        value: species.egg_groups.map(e => <a>{f.formattingEggGroup(e.name)}</a>)
      }, {
        label: "Growth rate",
        value: [f.growthRate(species.growth_rate.name)]
      }
    ]
  }

  const [previous, setPrevious] = useState("")
  const [next, setNext] = useState("")

  const getNextAndPrevious = async () => {
    let previous_pokemon = "", next_pokemon = ""

      await api.getPokemonSpeciesById(species.id === 1 ? max_pokemon : species.id + 1)
        .then(res => setNext(res.name)) 

      await api.getPokemonSpeciesById(species.id === max_pokemon ? 1 : species.id - 1)
        .then(res => setPrevious(res.name))
  }

  useEffect(() => {
    getNextAndPrevious()
  }, [species])

  return (
    <InfoPage>
      <div className="main-page">
        <div className="image">
          <img src={img} alt={form.name} />
        </div>
        <div className="info">
          <OptionBox previous_pokemon={previous} next_pokemon={next} species={species} />
          <DataTable data={data} />
        </div>
      </div>
    </InfoPage>
  )
}