import "./GenderRate.scss"
import { BsGenderFemale, BsGenderMale } from 'react-icons/bs'
import GenderChart from "./GenderChart"

export default function GenderRate({ gender_rate }: { gender_rate: number }) {
  const male = (8 - gender_rate) / 0.08
  const female = gender_rate / 0.08

  if (gender_rate >= 0)
    return(
      <div className="gender-rate">
        <div>{male > 0 && <BsGenderMale/>}</div>
        <GenderChart gender_rate = {{male, female}}/>
        <div>{female > 0 && <BsGenderFemale/>}</div>
      </div>
    )

  return (
    <>
      Genderless
    </>
  )
}