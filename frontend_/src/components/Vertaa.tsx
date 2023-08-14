




// importing toriSearch
import { TORI_SCRAPER } from "../graphql/queries"

// useMutation 
import { useMutation } from "@apollo/client"

// useState
import { useEffect, useState } from "react"

// components


const Vertaa = () => {

    // sales
    // @ts-ignore
    const [sales, setSales] = useState([])

    const [searchWord, setSearchWord] = useState('gameboy')
    // using useMutation
    const [tori_scraper, { data, loading, error }] = useMutation(TORI_SCRAPER)


    // function that handles form submit
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // calling create_user mutation
        const result = await tori_scraper({ variables: { product: searchWord } })

        const lengthOfSales = result.data.toriSearch.length
        const resultSales = result.data.toriSearch


        let count = 0
        let array: string[] = []



        while (count < lengthOfSales) {

            array.push(resultSales[count])


            count += 1
        }

        // @ts-ignore
        await setSales(array)
    }


    useEffect(() => {

        

    },[setSales])


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

            <div> 
                <p>Sales from Tori</p>
                <ul> 
                    {sales.map(sale => 
                        <li>
                            {sale}
                        </li>
                        )}
                </ul>
            </div>
        </div>
    )
}


export default Vertaa











