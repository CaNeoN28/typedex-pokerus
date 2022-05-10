function kgToLbs(kg : number){
  return (kg * 2.205)
}

function metersToFootAndInches(meters: number){
  let feet = meters * 3.281
  let inches = Math.round((feet % 1) * 12)
  feet = feet - feet % 1

  return {feet, inches}
}

const measuring = {
  kgToLbs,
  metersToFootAndInches
}

export default measuring