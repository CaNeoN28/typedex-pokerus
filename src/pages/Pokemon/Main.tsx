import { Pokemon, PokemonSpecies } from "pokenode-ts";
import FormsCard from "../../components/ FormsCard";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'
import InfoPage from "../../components/InfoPage";

interface Props {
  species: PokemonSpecies,
  forms: Pokemon[],
  form: number,
  setForm: React.Dispatch<React.SetStateAction<number>>
}

export default function MainInfo({ species, forms, form, setForm }: Props) {
  return (
    <InfoPage>
      {forms.map((f, index) => (
        index == form &&
          <FormsCard key={index}>
            <img src={f.sprites.other["official-artwork"].front_default || ''} alt={f.name} />
            <div className='optionBox'>
              <a onClick={e => index === 0 ? setForm(forms.length - 1) : setForm(form - 1)}><AiFillCaretLeft /></a>
              <span> {f.name} </span>
              <a onClick={e => index === forms.length - 1 ? setForm(0) : setForm(form + 1)}><AiFillCaretRight /></a>
            </div>
          </FormsCard>
      ))}
      <div>aaaaaaaaaaaaaaaaaaaaaaaaaa</div>
    </InfoPage>
  )
}