function capitalize(str: string){
  let list = str.split('')
  list[0] = list[0].toUpperCase()
  return(list.join(''))
}

function compostStringToArray(str: string){
  return str.split('-')
}


function growthRate(gr: string){
  let list = compostStringToArray(gr)
  list = list.map(str => capitalize(str))

  return list.join('-')
}

function formattingFormName(species_name: string, form_name: string){
  let f_form_name = form_name.replace(species_name, '')
  let f_form_name_l = compostStringToArray(f_form_name)

  f_form_name = f_form_name_l.map(f_name => f_name && capitalize(f_name)).join(" ").replace('Gmax', 'G-Max')

  if (f_form_name == '')
    f_form_name = "Default"

  return f_form_name
}

function formattingEggGroup(eggGroup: string){
  let f_egg_group = eggGroup

  if (eggGroup == 'humanshape')
    return 'Human-Like'
  else if (eggGroup == 'indeterminate')
    return 'Amorphous'
  else if (eggGroup == 'no-eggs')
    return 'Undiscovered'    

  return (capitalize(eggGroup))
}

function formattingSpeciesName(name: string){
  let f_name = capitalize(name)

  if (f_name.endsWith('-f'))
    f_name = f_name.replace('-f', '♀')
    
  if (f_name.endsWith('-m'))
    f_name = f_name.replace('-m', '♂')

  return f_name
}

function compostString(str: string){
  return (compostStringToArray(str).join(' '))
}

const Formatting = {
  capitalize,
  growthRate,
  formattingFormName,
  formattingEggGroup,
  formattingSpeciesName,
  compostString
}

export default Formatting