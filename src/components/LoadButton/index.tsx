interface Props{
  max: number,
  setMax: React.Dispatch<React.SetStateAction<number>>
  true_max: number
}

export default function LoadButton({max, setMax, true_max}: Props){
  const page = true

  return(
    <div>
      {max <= true_max && 
      <button onClick={() => {
        setMax(max + 150)
      }}>
        See more
      </button>}
    </div>
  )
}