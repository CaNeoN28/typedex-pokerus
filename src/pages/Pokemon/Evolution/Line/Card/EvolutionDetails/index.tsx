import Formatting from "common/utils/string";
import { EvolutionDetail } from "pokenode-ts";
import { useEffect, useState } from "react";

export default function EvolutionDetails({ evo_detail }: { evo_detail: EvolutionDetail }) {
  const f = Formatting

  const ev = evo_detail

  const [details, setDetails] = useState<string[]>([])

  const getDetails = () => {
    if (evo_detail.min_level){
      const l = evo_detail.min_level.toString()
      setDetails(old => old ? [...old, 'Level:', l]: ['Level:', l])
    }
    // { evo_detail.gender && <>Gender: <br />{`${evo_detail.gender === 1 ? 'Female' : 'Male'}`}</> } <br />
    // { evo_detail.held_item && <>Held Item: <br />{`${f.compostName(evo_detail.held_item.name)}`}</> } <br />
    // { evo_detail.item && <>Use item: <br />{`${f.compostName(evo_detail.item.name)}`}</> } <br />
    // { evo_detail.known_move && <>Knows move: <br />{`${f.compostName(evo_detail.known_move.name)}`}</> } <br />
    // { evo_detail.min_level && <>Level: <br />{`${evo_detail.min_level}`}</> }
  }

  useEffect(() => {
    setDetails([])
    getDetails()
  }, [])

  return (
    <ul>
      {details.map((detail, index)=> (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  )
}