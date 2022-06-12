import { ChainLink } from "pokenode-ts";
import './Line.scss'

export default function Line({ chain_link }: { chain_link: ChainLink[] }) {
  return (
    <>
      <div className="line">
        {chain_link.map(cl => (
          <div>
            {cl.species.name}
          </div>
        ))}
      </div>
      {chain_link.map(cl =>
        cl.evolves_to.length > 0 &&
        <Line chain_link={cl.evolves_to} />
      )}
    </>
  )
}