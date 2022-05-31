import './SingleRowTable.scss'

interface Props {
  data: {
    label: String,
    data: any
  }[]
}

export default function SingleRowTable({ data }: Props) {
  return (
    <table className='srt'>
      <thead>
        <tr>
          {data.map((d, index) => (
            <th key={index}>{d.label}</th>
          ))}
        </tr>
      </thead>
      <tbody className='table-data'>
        <tr>
          {data.map((d, index) => (
            <td key={index}>{d.data}</td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}