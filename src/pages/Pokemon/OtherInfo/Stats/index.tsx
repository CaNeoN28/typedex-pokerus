import Formatting from "common/utils/string";
import SingleRowTable from "components/SingleRowTable";
import { PokemonStat } from "pokenode-ts";
import StatChart from "./StatChart";

export default function Stats({stats} : {stats : PokemonStat[]}){
  const f = Formatting

  const data = stats.map(s => {
    return({
      label: f.statAbbreviation(s.stat.name),
      data: s.base_stat
    })
  })

  return(
    <div>
      <SingleRowTable data={data}/>
      <StatChart stats={stats}/>
    </div>
  )
}