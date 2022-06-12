import { ChainLink } from "pokenode-ts";
import Card from "./Card";
import './Line.scss'

export default function Line({ chain_link }: { chain_link: ChainLink[] }) {
  return (
    <>
      <div className="line">
        {chain_link.map(cl => (
          <Card species_name={cl.species.name}/>
        ))}
      </div>
      {chain_link.map(cl =>
        cl.evolves_to.length > 0 &&
        <Line chain_link={cl.evolves_to} />
      )}
    </>
  )
}