import { useEffect, useState } from "react"






//@ts-ignore
const LoadingForVertaaPage = ({ loadingProp }) => {

    const [loading, setLoading] = useState('')

    useEffect(() => {

        if (loadingProp === 'loading') {
            setLoading(loadingProp)
        }

        console.log('loading?',loadingProp)



    },[loadingProp])


    if (loading === 'loading') {
    return (

        <div>
            loading...
        </div>
    )}
    return (
        <div>

        </div>
    )
}



export default LoadingForVertaaPage













