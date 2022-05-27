import "./GenderRate.scss"

export default function GenderRate({ gender_rate }: { gender_rate: number }) {
  const male = (8 - gender_rate) / 0.08
  const female = gender_rate / 0.08

  return (
    <>
      <a>Male: {male}</a>
      <a>Female: {female}</a>
    </>
  )
}