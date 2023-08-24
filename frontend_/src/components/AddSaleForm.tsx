


// css
import '../cssFiles/AddSale.css'

// bootstrap
import { Button, Card } from "react-bootstrap";


// useState
import { useState } from "react"

// useMutation
import { useMutation } from "@apollo/client"

// gql mutation to add sale
import { ADD_SALE } from "../graphql/queries"



// components
import TopBar from './TopBar';

// Define prop types for the component
interface AddSaleFormProps {
    userIdProp: string; // Specify that userIdProp should be of type string
  }


const AddSaleForm:  React.FC<AddSaleFormProps> = ({ userIdProp }) => {


    // state for rendering
    const [render, setRender] = useState(false)

    // Sale 
    const [product, setProduct] = useState('')
    const [price, setPrice] = useState('')

    // mutation
    const [add_Sale, {data, loading, error}] = useMutation(ADD_SALE)



    // function for form submit
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        // adding sale with graphql
        await add_Sale({ variables: { product: product, price: price, userId: userIdProp  } })        
    }


    if (render === true) {



        return (

            <div>
                 <div>
                    <TopBar/>
                </div>

                <div>
                    <p className='pageText' >Create Sale</p>
                </div>

                <Card className='styleForCardd' >
                    <form className='formStyle' onSubmit={submit} >

                        Product: <input
                        className='input-group'
                        value={product}
                        onChange={e => setProduct(e.target.value) }
                        
                        />
                        <br/>
                        <br/>

                        Price: <input
                        className='input-group'
                        value={price}
                        onChange={e => setPrice(e.target.value) }
                        
                        />
                        <Button variant="dark" >Create</Button>
                        <Button variant="dark" onClick={() => setRender(false)} >Close</Button>
                    </form>
                </Card>
            </div>
            

        )
    } 

    return (

        <div>

            <div>
                <TopBar/>
            </div>

        <div className='createSale' >
            <Button variant="dark" onClick={() => setRender(true)} >Create sale</Button>
        </div>

        </div>

    )
}


export default AddSaleForm











