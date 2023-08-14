


// useState
import { useState } from "react"

// useMutation
import { useMutation } from "@apollo/client"

// gql mutation to add sale
import { ADD_SALE } from "../graphql/queries"

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

                <form onSubmit={submit} >

                    Product: <input
                    value={product}
                    onChange={e => setProduct(e.target.value) }
                    
                    />
                    <br/>
                    <br/>

                    Price: <input
                    value={price}
                    onChange={e => setPrice(e.target.value) }
                    
                    />
                    <button>Create</button>
                    <button onClick={() => setRender(false)} >Close</button>
                </form>
            </div>
            

        )
    } 

    return (

        <div>
            <button onClick={() => setRender(true)} >Create sale</button>
        </div>

    )
}


export default AddSaleForm











