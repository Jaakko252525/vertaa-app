




// importing toriSearch
import { TORI_SCRAPER } from "../graphql/queries"

// useMutation 
import { useMutation } from "@apollo/client"

// useState
import { useState } from "react"

const Vertaa = () => {

    const [sales, setSales] = useState([])

    const [searchWord, setSearchWord] = useState('')
    // using useMutation
    const [tori_scraper, { data, loading, error }] = useMutation(TORI_SCRAPER)


    // function that handles form submit
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // calling create_user mutation
        const data = await tori_scraper({ variables: { product: searchWord } })


        console.log(data)
    }

    return (
        <div>
            Vertaa page

            <form onSubmit={submit}>


                <input 
                value={searchWord}
                onChange={word => setSearchWord(word.target.value)}
                />
                <button type="submit" >Search</button>

            </form>
        </div>
    )
}


export default Vertaa











