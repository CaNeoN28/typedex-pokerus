import './LoadButton.scss'

interface Props {
  max: number,
  setMax: React.Dispatch<React.SetStateAction<number>>
}

export default function LoadButton({ max, setMax }: Props) {
  const page = true

  return (
    <div className="buttonSpace">
      <button
        onClick={() => {
          setMax(max + 16)
        }}>
        See more
      </button>
    </div>
  )
}