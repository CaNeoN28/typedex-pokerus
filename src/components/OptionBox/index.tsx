import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"
import './OptionBox.css'

interface Props{
  label: string[]
  comparing: number
  parameter: number
  setParameter: React.Dispatch<React.SetStateAction<number>>
}

export default function OptionBox({label, comparing, parameter, setParameter} : Props){
  return(
    <div className="optionBox">
      <a onClick={e => parameter == 1 ? setParameter(comparing) : setParameter(parameter - 1)}><AiFillCaretLeft /></a>
      <div className="optionLabelGroup">
        {label.map(l => <span>{l}</span>)}
      </div>
      <a onClick={e => parameter == comparing ? setParameter(1) : setParameter(parameter + 1)}><AiFillCaretRight /></a>
    </div>
  )
}