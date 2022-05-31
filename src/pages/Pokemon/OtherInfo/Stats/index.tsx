import Formatting from "common/utils/string";
import SingleRowTable from "components/SingleRowTable";
import { PokemonStat } from "pokenode-ts";
import StatChart from "./StatChart";
import './Stats.scss'

export default function Stats({stats} : {stats : PokemonStat[]}){
  const f = Formatting

  const data = stats.map(s => {
    return({
      label: f.statAbbreviation(s.stat.name),
      data: s.base_stat
    })
  })

  const total = () => {
    let sum = 0
    stats.map(s => sum += s.base_stat)

    return sum
  }

  return(
    <div className="stats">
      <SingleRowTable data={data}/>
      <StatChart stats={stats}/>
      <SingleRowTable data={[{label: 'Total', data: total()}]}/>
    </div>
  )
}