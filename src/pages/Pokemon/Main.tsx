import { Pokemon, PokemonSpecies } from "pokenode-ts";
import FormsCard from "../../components/FormsCard";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import InfoPage from "../../components/InfoPage";
import DataTable from "../../components/DataTable";
import TableData from "../../types/TableData";
import { generateKey } from "crypto";
import missingNo from "../../assets/images/missingNo.png";
import measuring from "common/utils/measuring";
import TypeButton from "components/TypeButton";
import Formatting from "common/utils/string";
import OptionBox from "components/OptionBox";

interface Props {
  species: PokemonSpecies,
  forms: Pokemon[],
  form: number,
  setForm: React.Dispatch<React.SetStateAction<number>>
}

export default function MainInfo({ species, forms, form, setForm }: Props) {
  const f = Formatting

  const currentForm = forms[form];
  const img = currentForm.sprites.other["official-artwork"].front_default || missingNo

  const actualHeight = currentForm.height / 10
  const actualWeight = currentForm.weight / 10

  const { feet, inches } = measuring.metersToFootAndInches(actualHeight)

  const types = currentForm.types.map(t => (t.type.name))

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

  return (
    <InfoPage>
      <FormsCard>
        <img src={img} alt={currentForm.name}/>
        {forms.length > 1 && <OptionBox label={[f.capitalize(currentForm.name)]} comparing={forms.length}/>}
        {/* <img src={img} alt={currentForm.name} />
        {forms.length > 1 && <div className='optionBox'>
          <a onClick={e => form === 0 ? setForm(forms.length - 1) : setForm(form - 1)}><AiFillCaretLeft /></a>
          <span> {f.formattingFormName(species.name, currentForm.name)} </span>
          <a onClick={e => form === forms.length - 1 ? setForm(0) : setForm(form + 1)}><AiFillCaretRight /></a>
        </div>} */}
      </FormsCard>
      <div>
        <OptionBox label={[`N° ${String(species.id).padStart(3, '0')}`, f.capitalize(species.name)]} comparing={897}/>
        <DataTable data={data} />
      </div>
    </InfoPage>
  )
}