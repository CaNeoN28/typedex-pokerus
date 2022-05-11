function capitalize(str: string){
  let list = str.split('')
  list[0] = list[0].toUpperCase()
  return(list.join(''))
}

function growthRate(gr: string){
  let list = compostString(gr, '-')
  list = list.map(str => capitalize(str))

  return list.join('-')
}

function compostString(str: string, char: string = '_'){
  return str.split(char)
}


function validatingFormName(species_name: string, form_name: string){
  let f_form_name = form_name.replace(species_name, '')
  let f_form_name_l = compostString(f_form_name, "-")

  f_form_name = f_form_name_l.map(f_name => f_name && capitalize(f_name)).join(" ")

  if (f_form_name == '')
    f_form_name = "Default"

  return f_form_name
}

const Formatting = {
  growthRate,
  capitalize,
  validatingFormName
}

export default Formatting