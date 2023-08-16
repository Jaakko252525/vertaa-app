


// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';


// importing scrapers
import { TORI_SCRAPER, HUUTONET_SEARCH, HUUTOKAUPAT_SEARCH } from "../graphql/queries"

// components
import LoadingForVertaaPage from './LoadingForVertaaPage';

// useMutation 
import { useMutation } from "@apollo/client"

// useState
import { useEffect, useState } from "react"



// function that gets array of sales and returns array in ascending order
//@ts-ignore
const ascendingOrder = async (arrayOfSales) => {

  let count = 0


  let arrayOfSaleObjects = []



  // loop through and take price and make and object
  while ( count < arrayOfSales.length) {

    const sale =  arrayOfSales[count].split(' ')

    // finding '€' then getting element(price) before it
    const idx = sale.indexOf("€")


    let saleObject = {
      sale: arrayOfSales[count],
      price: parseFloat(sale[idx - 1])
    }

    arrayOfSaleObjects.push(saleObject)


    count += 1




  }

  // sorting 
  arrayOfSaleObjects.sort((p1, p2) => (p1.price < p2.price) ? 1 : (p1.price > p2.price) ? -1 : 0);

    return arrayOfSaleObjects.reverse()
}


interface ascendingSaleObjects {
  sale: string,
  price: Number
}


// components
const Vertaa = () => {

  //@ts-ignore
  const [loadingData, setLoadingData] = useState('')

    // sales
    const [toriSales, setToriSales] = useState<ascendingSaleObjects[]>([])
    const [toriSalesResults, setToriSalesResults] = useState()

    const[ascending, setAscending] = useState(false)

    const [huutonetSales, setHuutonetSales] = useState<ascendingSaleObjects[]>([])
    const [huutonetSalesResults, setHuutonetSalesResults] = useState()
    const [huutokaupatSales, setHuutokaupatSales] = useState([])


    const [searchWord, setSearchWord] = useState('')
    // using useMutation
    const [tori_scraper, { data, loading, error }] = useMutation(TORI_SCRAPER)

    // huutonet mutation
    const [huutonet_scraper, { data: huutonetData, loading: huutonetLoading, error: huutonetError }] = useMutation(HUUTONET_SEARCH)
    
    // huutokaupat com mutation
    const [huutokaupat_scraper, { data: huutokaupatData, loading: huutokaupatloading, error: huutokaupatError }] = useMutation(HUUTOKAUPAT_SEARCH)
    
    // function that handles form submit
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // setting loading
        await setLoadingData('loading')

        // calling create_user mutation
        const toriResult = await tori_scraper({ variables: { product: searchWord } })
        const huutonetResult = await huutonet_scraper({ variables: { product: searchWord } })
        const huutokaupatResult = await huutokaupat_scraper({ variables: { product: searchWord } })

        
        // huutonet sales to array
        const huutonetSalesOnArray = huutonetResult.data.huutoNetSearch
        
        // huutokaupat to array
        const huutokaupatSalesArray = huutokaupatResult.data.huutokaupatSearch

        

        const lengthOfSales = toriResult.data.toriSearch.length
        const resultSales = toriResult.data.toriSearch
        // tori sales data manipulation
        let count = 0
        let array: string[] = []
        while (count < lengthOfSales) {

            array.push(resultSales[count])


            count += 1
        }


        // ascending tori sales
        const ascendingSales = await ascendingOrder(array)
        // ascending huutoNet sales
        const ascendingHuutoNetSales = await ascendingOrder(huutonetSalesOnArray)


        // to huutonet states
        await setHuutonetSales(ascendingHuutoNetSales)
        await setHuutonetSalesResults(huutonetSalesOnArray.length)


        // to tori state
        await setToriSales(ascendingSales)
        await setToriSalesResults(lengthOfSales)

        // to huutokaupat states
        await setHuutokaupatSales(huutokaupatSalesArray)

        
    }




    useEffect(() => {


        setLoadingData('')
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

          <div>
            <LoadingForVertaaPage loadingProp={loadingData} />
          </div>


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
                            {sale.sale}
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
                                    {sale.sale}
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
            
            <div>
              <ul>
                {huutokaupatSales.map(s => 
                  <li>
                    {s}
                    <br/>
                    <br/>
                  </li>
                  
                  )}
              </ul>
            </div>
          </Card.Text>
        </Card.Body>

      </Card>
    </CardGroup>
    </div>
</div>
    )
}


export default Vertaa











