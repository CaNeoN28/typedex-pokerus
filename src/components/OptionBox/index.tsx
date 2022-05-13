import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"
import './OptionBox.css'

interface Props{
  label: string[]
  comparing: number
}

export default function OptionBox({label, comparing} : Props){
  return(
    <div className="optionBox">
      <a><AiFillCaretLeft /></a>
      <div className="optionLabelGroup">
        {label.map(l => <span>{l}</span>)}
      </div>
      <a><AiFillCaretRight /></a>
    </div>
  )
}