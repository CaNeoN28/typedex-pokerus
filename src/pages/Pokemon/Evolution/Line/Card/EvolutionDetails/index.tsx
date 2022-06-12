import Formatting from "common/utils/string";
import { EvolutionDetail } from "pokenode-ts";
import { useEffect, useState } from "react";

export default function EvolutionDetails({ evo_detail }: { evo_detail: EvolutionDetail }) {
  const f = Formatting

  const ev = evo_detail

  const [details, setDetails] = useState<string[]>([])

  const setDetailF = (old: string[] | undefined, item1: string, item2?: string) => {
    if (old) {
      if (item2)
        return ([...old, item1, item2])
      return ([...old, item1])
    }

    if (item2) {
      return ([item1, item2])
    }
    return ([item1])
  }

  const getDetails = () => {
    if (ev.gender) {
      const d = ev.gender === 1 ? 'Female' : 'Male'
      setDetails(old => setDetailF(old, 'Gender:', d))
    }
    if (ev.held_item) {
      const h = f.compostName(ev.held_item.name)
      setDetails(old => setDetailF(old, 'Held Item:', h))
    }
    if (ev.item) {
      const i = f.compostName(ev.item.name)
      setDetails(old => setDetailF(old, 'Uses item:', i))
    }
    if (ev.known_move) {
      const m = f.compostName(ev.known_move.name)
      setDetails(old => setDetailF(old, 'Knows move:', m))
    }
    if (ev.known_move_type) {
      const m = f.capitalize(ev.known_move_type.name)
      setDetails(old => setDetailF(old, 'Knows a', `${m} type Move`))
    }
    if (ev.location) {
      const l = f.compostName(ev.location.name)
      setDetails(old => setDetailF(old, 'Location:', l))
    }
    if (ev.min_affection) {
      const a = ev.min_affection.toString()
      setDetails(old => setDetailF(old, 'Affection:', a))
    }
    if (ev.min_beauty) {
      const b = ev.min_beauty.toString()
      setDetails(old => setDetailF(old, 'Beauty:', b))
    }
    if (ev.min_happiness) {
      const h = ev.min_happiness.toString()
      setDetails(old => setDetailF(old, 'Hapiness:', h))
    }
    if (ev.min_level) {
      const l = ev.min_level.toString()
      setDetails(old => setDetailF(old, 'Level:', l))
    }
    if (ev.party_species) {
      const ps = f.formattingSpeciesName(ev.party_species.name)
      setDetails(old => setDetailF(old, 'Along a', ps))
    }
    if (ev.party_type) {
      const pt = f.formattingSpeciesName(ev.party_type.name)
      setDetails(old => setDetailF(old, 'With a ', pt))
    }
    if (ev.needs_overworld_rain) {
      setDetails(old => setDetailF(old, 'During', 'rain'))
    }
    if (ev.relative_physical_stats) {
      const s = ev.relative_physical_stats > 0 ? 'higher' : 'lower'
      setDetails(old => setDetailF(old, 'If attack is', `${s} than defense`))
    }
    if (ev.time_of_day) {
      const t = ev.time_of_day
      setDetails(old => setDetailF(old, 'During the', t))
    }
    if (ev.trade_species) {
      const ts = f.formattingSpeciesName(ev.trade_species.name)
      setDetails(old => setDetailF(old, 'Traded for a', ts))
    }
    if (ev.trigger) {
      if (Number(ev.trigger.url.split('/').at(-2)) > 3) {
        const t = f.compostName(ev.trigger.name)
        setDetails(old => setDetailF(old, t))
      }
    }
    if (ev.turn_upside_down) {
      setDetails(old => setDetailF(old, 'Turn upside', 'down'))
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
      {details.map((detail, index) => (
        <li key={index}>{detail}</li>
      ))}
    </ul>
  )
}