


// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';


// importing scrapers
import { TORI_SCRAPER, HUUTONET_SEARCH } from "../graphql/queries"


// useMutation 
import { useMutation } from "@apollo/client"

// useState
import { useEffect, useState } from "react"

// components


const Vertaa = () => {

    // sales
    // @ts-ignore
    const [toriSales, setToriSales] = useState([])
    const [toriSalesResults, setToriSalesResults] = useState()
    // @ts-ignore
    const [huutonetSales, setHuutonetSales] = useState([])
    const [huutonetSalesResults, setHuutonetSalesResults] = useState()

    const [searchWord, setSearchWord] = useState('gameboy')
    // using useMutation
    const [tori_scraper, { data, loading, error }] = useMutation(TORI_SCRAPER)


    const [huutonet_scraper, { data: huutonetData, loading: huutonetLoading, error: huutonetError }] = useMutation(HUUTONET_SEARCH)
    

    
    // function that handles form submit
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // calling create_user mutation
        const toriResult = await tori_scraper({ variables: { product: searchWord } })
        const huutonetResult = await huutonet_scraper({ variables: { product: searchWord } })

        

        const huutonetSalesOnArray = huutonetResult.data.huutoNetSearch
        
        // huutonet sales to state
        await setHuutonetSales(huutonetSalesOnArray)
        await setHuutonetSalesResults(huutonetSalesOnArray.length)


        const lengthOfSales = toriResult.data.toriSearch.length
        const resultSales = toriResult.data.toriSearch
        // tori sales data manipulation
        let count = 0
        let array: string[] = []
        while (count < lengthOfSales) {

            array.push(resultSales[count])


            count += 1
        }



        // @ts-ignore
        await setToriSales(array)
        await setToriSalesResults(lengthOfSales)


    }


    useEffect(() => {

    },[setToriSales])


    return (
        <div>


            <form className='form' onSubmit={submit}>


                <input 
                value={searchWord}
                onChange={word => setSearchWord(word.target.value)}
                />
                <button type="submit" >Search</button>

            </form>

        <div>


    <CardGroup className='vertaaSalesCardGroup' >
      <Card border='Danger' style={{ width: '18rem' }} >
        <Card.Body>
          <Card.Title>Tori</Card.Title>
          <Card.Text>  
            <div>
                <p>Sales: {toriSalesResults}</p>
                <ul> 
                    {toriSales.map(sale => 
                        <li>
                            {sale}
                            <br/>
                            <br/>
                        </li>
                        )}
                </ul>
            </div>
          </Card.Text>
        </Card.Body>

      </Card>

      <br/>
      <Card border='Primary' style={{ width: '18rem' }} >
        <Card.Body>
          <Card.Title>Huutonet</Card.Title>
          <Card.Text>
            <div>
                <p>Sales: {huutonetSalesResults}</p>
                        <ul> 
                            {huutonetSales.map(sale => 
                                <li>
                                    {sale}
                                    <br/>
                                    <br/>
                                </li>
                                
                                )}
                        </ul>
             </div>
          </Card.Text>
        </Card.Body>

      </Card>
      <Card>
        <Card.Body>
          <Card.Title>Huutokaupat.com</Card.Title>
          <Card.Text>
            Huutokaupat api coming soon...
          </Card.Text>
        </Card.Body>

      </Card>
    </CardGroup>
    </div>
</div>
    )
}


export default Vertaa











