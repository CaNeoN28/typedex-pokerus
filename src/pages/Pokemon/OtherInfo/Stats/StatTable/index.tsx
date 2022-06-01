import { PokemonStat } from "pokenode-ts";
import "./StatTable.scss"

interface Props {
  data: {
    label: string,
    data: number
  }[]
}

export default function StatTable({ data }: Props) {
  return (
    <div className="stat-table">
      {data.map(d => (
        <ul className="table-item">
          <li className="item-key">
            {d.label}
          </li>
          <li className="item-data">
            <a>{d.data}</a>
          </li>
        </ul>
      ))}
    </div>
  )
}