import './LoadButton.scss'

interface Props {
  min: number,
  max: number,
  setMax: React.Dispatch<React.SetStateAction<number>>
}

export default function LoadButton({ min, max, setMax }: Props) {
  const page = true

  return (
    <div className="buttonSpace">
      <button
        onClick={() => {
          setMax(max + min)
        }}>
        Load More
      </button>
    </div>
  )
}