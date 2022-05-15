import Page from "components/Page";
import SearchBox from "components/Searchbox";
import { useEffect, useState } from "react";

export default function(){
  const [search, setSearch] = useState('')

  useEffect(() => {
    console.log(search)
  }, [search])
  
  return(
    <Page>
      <SearchBox setSearch={setSearch}/>
    </Page>
  )
}