import './LoadButton.css'

interface Props {
  max: number,
  setMax: React.Dispatch<React.SetStateAction<number>>
  true_max: number
}

export default function LoadButton({ max, setMax, true_max }: Props) {
  const page = true

  return (
    <div className="buttonSpace">
      {max <= true_max &&
        <button
          className='loadButton'
          onClick={() => {
            setMax(max + 16)
          }}>
          See more
        </button>}
    </div>
  )
}