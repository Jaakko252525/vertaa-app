
//useState
import { useState } from "react"



// @ts-ignore
const Loading = ({ loadingProp }) => {

    
    const [loading, setLoading] = useState(false)

    // if prop === loading
    if (loadingProp === true) {
        setLoading(true)
    }




    if (loading === true) {
        

        return (
            <div>
                Fetching data...
            </div>
        )
    }
    return (
        <div>

        </div>
    )
}


export default Loading














