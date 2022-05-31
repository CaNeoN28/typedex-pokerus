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

  const total_func = () => {
    let sum = 0
    stats.map(s => sum += s.base_stat)

    return sum
  }

  const total = total_func()

  return(
    <div className="stats">
      <SingleRowTable data={data}/>
      <StatChart stats={stats}/>
      <div className="total-stats">
        <span className="label">Total</span>
        <span className="value">{total}</span>
      </div>
    </div>
  )
}