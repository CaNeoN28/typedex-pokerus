import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"
import './OptionBox.css'

interface Props{
  type: "species" | "form"
  label: string[]
  comparing: number
  parameter: number
  setParameter: React.Dispatch<React.SetStateAction<number>>
}

export default function OptionBox({type, label, comparing, parameter, setParameter} : Props){

  const onClickDefault = (min : number, operation : "minus" | "plus") => {
    if (operation == "minus")
      parameter == min ? setParameter(comparing) : setParameter(parameter - 1)
    else if (operation == "plus")
      parameter == comparing ? setParameter(min) : setParameter(parameter + 1)
  }

  const onClick = (operation: "minus" | "plus") => {
    if (type === "species")
      onClickDefault(1, operation)
    else if (type === "form")
      onClickDefault(0, operation)
  }

  return(
    <div className="optionBox">
      {<a onClick={e=> onClick("minus")}><AiFillCaretLeft /></a>}
      <div className="optionLabelGroup">
        {label.map(l => <span>{l}</span>)}
      </div>
      <a onClick={e => onClick("plus")}><AiFillCaretRight /></a>
    </div>
  )
}