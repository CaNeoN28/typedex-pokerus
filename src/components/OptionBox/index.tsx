import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai"
import './OptionBox.css'

// export default function OptionBox({type, label, comparing, parameter, setParameter} : Props){
export default function OptionBox({children}: {children? : React.ReactNode}){

  return(
    <div className="optionBox">
      {children}
    </div>
  )
  // return(
  //   <div className="optionBox">
  //     {<a onClick={e=> onClick("minus")}><AiFillCaretLeft /></a>}
  //     <div className="optionLabelGroup">
  //       {label.map(l => <span>{l}</span>)}
  //     </div>
  //     <a onClick={e => onClick("plus")}><AiFillCaretRight /></a>
  //   </div>
  // )
}