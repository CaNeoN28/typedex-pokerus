import { Pokemon, PokemonSpecies } from "pokenode-ts";
import FormsCard from "../../components/FormsCard";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import InfoPage from "../../components/InfoPage";
import DataTable from "../../components/DataTable";
import TableData from "../../types/TableData";
import { generateKey } from "crypto";
import missingNo from "../../assets/images/missingNo.png";
import measuring from "common/utils/measuring";

interface Props {
  species: PokemonSpecies,
  forms: Pokemon[],
  form: number,
  setForm: React.Dispatch<React.SetStateAction<number>>
}

export default function MainInfo({ species, forms, form, setForm }: Props) {
  const currentForm = forms[form];
  const img = currentForm.sprites.other["official-artwork"].front_default || missingNo
  const actualWeight = currentForm.weight/10

  const data = {
    title: species.genera.find(g => g.language.name == 'en')?.genus || '',
    rows: [
      {
        label: "Types",
        values: currentForm.types.map(t => t.type.name)
      },{
        label: "Height",
        values: [""]
      },{
        label: "Weight",
        values: [
          `${measuring.kgToLbs(actualWeight).toFixed(1)}lbs`,
          ' / ',
          `${(actualWeight).toFixed(1)}kg`
        ]
      },{
        label: "Egg groups",
        values: species.egg_groups.map(e => e.name)
      },{
        label: "Growth rate",
        values: [species.growth_rate.name]
      }
    ]
  }

  return (
    <InfoPage>
      <FormsCard>
        <img className="image" src={img} alt={currentForm.name} />
        {forms.length > 1 && <div className='optionBox'>
          <a onClick={e => form === 0 ? setForm(forms.length - 1) : setForm(form - 1)}><AiFillCaretLeft /></a>
          <span> {currentForm.name} </span>
          <a onClick={e => form === forms.length - 1 ? setForm(0) : setForm(form + 1)}><AiFillCaretRight /></a>
        </div>}
      </FormsCard>
      <DataTable data={data}/>
    </InfoPage>
  )
}