export default interface TableData{
  title: string,
  rows:
    {
      label: string,
      values: any[]
    }[]
}