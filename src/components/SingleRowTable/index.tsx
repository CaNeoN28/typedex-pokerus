import './SingleRowTable.scss'

interface Props {
  data: {
    label: string,
    data: any
  }[]
}

export default function SingleRowTable({ data }: Props) {
  return (
    <div className='srt'>
      <table>
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
    </div>
  )
}