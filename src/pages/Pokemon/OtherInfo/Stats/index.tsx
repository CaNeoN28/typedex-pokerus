import SingleRowTable from "components/SingleRowTable";
import { PokemonStat } from "pokenode-ts";
import StatChart from "./StatChart";

export default function Stats({stats} : {stats : PokemonStat[]}){
  const data = stats.map(s => {
    return({
      label: s.stat.name,
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