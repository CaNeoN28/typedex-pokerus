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
import { useEffect, useState } from "react";

interface Props {
  max_pokemon: number
  species: PokemonSpecies,
  forms: Pokemon[],
  form: number,
  current_form: Pokemon,
  id_copy: number
  setForm: React.Dispatch<React.SetStateAction<number>>
  setIdCopy: React.Dispatch<React.SetStateAction<number>>
}

export default function MainInfo({ max_pokemon, species, forms, form, current_form,  id_copy, setForm, setIdCopy }: Props) {

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
  
  return (
    <InfoPage>
      <FormsCard>
        <img src={img} alt={current_form.name} />
        {forms.length > 1 && <OptionBox
          type={'form'}
          label={[f.formattingFormName(species.name, current_form.name)]}
          comparing={forms.length - 1}
          parameter={form}
          setParameter={setForm}
        />}
      </FormsCard>
      <div>
        <OptionBox
          type="species"
          label={[`N° ${String(species.id).padStart(3, '0')}`, f.capitalize(species.name)]} 
          comparing={max_pokemon} 
          parameter={id_copy} 
          setParameter={setIdCopy}/>
        <DataTable data={data} />
      </div>
    </InfoPage>
  )
}