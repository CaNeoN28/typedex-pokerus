import { ChainLink } from "pokenode-ts";

export default function Card({ chain_link }: { chain_link: ChainLink }) {
  return (
    <>
      <div>
        {chain_link.species.name}
      </div>
      {chain_link.evolves_to && chain_link.evolves_to.map(cl =>
        <Card chain_link={cl} />)
      }
    </>
  )
}