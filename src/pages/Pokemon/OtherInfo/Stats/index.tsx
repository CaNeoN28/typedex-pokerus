import { PokemonStat } from "pokenode-ts";
import StatChart from "./StatChart";

export default function Stats({stats} : {stats : PokemonStat[]}){
  return(
    <div>
      <StatChart stats={stats}/>
    </div>
  )
}