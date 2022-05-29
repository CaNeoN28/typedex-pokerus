export default interface TableData{
  title?: string
  rows:
    {
      label: string,
      value: any[] | JSX.Element
    }[]
}