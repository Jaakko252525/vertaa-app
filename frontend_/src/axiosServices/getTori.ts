


import axios from 'axios';

// config
const config = {
    headers: {
        'Accept-Ch': 'sec-ch-ua-model,sec-ch-ua-platform-version',


      // Other headers you might need
    }
  };


export const getItem = async () => {

    try {
        console.log('making request')

        const data = await axios.get('https://www.huuto.net/haku?words=gameboy', config)
        console.log('data', data.data)


        return 'hello'

    } catch (error) {
        console.log(error)

    }
   



}



