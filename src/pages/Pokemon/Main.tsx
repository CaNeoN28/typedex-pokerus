import { Pokemon, PokemonSpecies } from "pokenode-ts";
import FormsCard from "../../components/ FormsCard";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

interface Props {
  species: PokemonSpecies,
  forms: Pokemon[],
  form: number,
  setForm: React.Dispatch<React.SetStateAction<number>>
}

export default function MainInfo({ species, forms, form, setForm }: Props) {
  return (
    <>
      {forms.map((f, index) => (
        index == form &&
        <div key={index}>
          <FormsCard>
            <img src={f.sprites.other["official-artwork"].front_default || ''} alt={f.name} />
            <div className='optionBox'>
              <a onClick={e => index === 0 ? setForm(forms.length - 1) : setForm(form - 1)}><AiFillCaretLeft /></a>
              <span> {f.name} </span>
              <a onClick={e => index === forms.length - 1 ? setForm(0) : setForm(form + 1)}><AiFillCaretRight /></a>
            </div>
          </FormsCard>
        </div>
      ))}
    </>
  )
}