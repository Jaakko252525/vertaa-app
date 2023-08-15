

// bootstrap
import { Button } from "react-bootstrap"

// gql
import { EDIT_SALE } from "../graphql/queries"

// useMutation
import { useMutation } from "@apollo/client"

// useState
import { useEffect, useState } from "react"

// @ts-ignore
const EditSale = ({ modifiedSaleIdProp, userIdProp }) => {
    

    // product and price state
    const [product, setProduct] = useState('')
    const [price, setPrice] = useState('')

    const [showForm, setShowForm] = useState(false)



    // making the mutation varable
    const [EditSale, { data, loading, error }] = useMutation(EDIT_SALE)




    // function that makes the sale edit
    const submitSaleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()



        // using the gql 
        await EditSale({ variables: { product: product, price: price, userId: userIdProp, modifySaleId: modifiedSaleIdProp } })
        // closing editing form
        setShowForm(false)

    }


    if (showForm === true) {


    return (
        <div>
            <form onSubmit={submitSaleEdit}>

                Product: <input
                value={product}
                onChange={e => setProduct(e.target.value)}

                />
                <br/>
               Price:  <input
                value={price}
                onChange={e => setPrice(e.target.value)}

                />
                <Button variant="dark" type="submit" >Submit</Button>

            </form>
            <br/>
        </div>
    )} else return (

        <div>
            <Button variant="dark" onClick={() => setShowForm(true)} >Edit sale</Button>
        </div>
    )
}


export default EditSale














