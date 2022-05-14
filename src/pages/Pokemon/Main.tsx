import { Pokemon, PokemonSpecies } from "pokenode-ts";
import FormsCard from "../../components/FormsCard";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import InfoPage from "../../components/InfoPage";
import DataTable from "../../components/DataTable";
import measuring from "common/utils/measuring";
import TypeButton from "components/TypeButton";
import Formatting from "common/utils/string";
import OptionBox from "components/OptionBox";
import { Link } from "react-router-dom";

interface Props {
  max_pokemon: number
  species: PokemonSpecies,
  forms: Pokemon[],
  current_form: Pokemon
}

export default function MainInfo({ max_pokemon, species, forms, current_form}: Props) {

  const f = Formatting

  const defaultImg = forms[0].sprites.other["official-artwork"].front_default || ''
  const img = current_form.sprites.other["official-artwork"].front_default || defaultImg

  const actualHeight = current_form.height / 10
  const actualWeight = current_form.weight / 10

  const { feet, inches } = measuring.metersToFootAndInches(actualHeight)

  const types = current_form.types.map(t => (t.type.name))

  const data = {
    title: species.genera.find(g => g.language.name == 'en')?.genus || '',
    rows: [
      {
        label: "Types",
        values: types.map(
          (t, index) => <TypeButton key={index} type={t} />
        )
      }, {
        label: "Height",
        values: [
          `${feet}'${String(inches).padStart(2, '0')}"`,
          ' / ',
          `${actualHeight.toFixed(1)}m`
        ]
      }, {
        label: "Weight",
        values: [
          `${measuring.kgToLbs(actualWeight).toFixed(1)}lbs`,
          ' / ',
          `${(actualWeight).toFixed(1)}kg`
        ]
      }, {
        label: "Egg groups",
        values: species.egg_groups.map((e, index) => species.egg_groups.length > 1 && index == 0 ? <a>{f.formattingEggGroup(e.name)}, </a> : <a>{f.formattingEggGroup(e.name)}</a>)
      }, {
        label: "Growth rate",
        values: [f.growthRate(species.growth_rate.name)]
      }
    ]
  }

  const previous_pokemon = species.id === 1 ? `/pokemon/${max_pokemon}` : `/pokemon/${species.id - 1}`
  const next_pokemon = species.id === max_pokemon ? `/pokemon/${1}` : `/pokemon/${species.id + 1}`
  
  return (
    <InfoPage>
      <FormsCard>
        <img src={img} alt={current_form.name} />
      </FormsCard>
      <div>
        <OptionBox>
          <Link to={previous_pokemon}><AiFillCaretLeft/></Link>
          <div className="optionLabelGroup">
            <span>N° {species.id}</span>
            <span>{f.formattingSpeciesName(species.name)}</span>
          </div>
          <Link to={next_pokemon}><AiFillCaretRight/></Link>
        </OptionBox>
        <DataTable data={data} />
      </div>
    </InfoPage>
  )
}