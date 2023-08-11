

// import Tori getItem
import { getItem } from "../axiosServices/getTori"


const Vertaa = () => {

    const func = async () => {
    const data = await getItem()

    console.log('data in component: ', data)

}

    func()

    return (
        <div>
            Vertaa page
        </div>
    )
}


export default Vertaa











