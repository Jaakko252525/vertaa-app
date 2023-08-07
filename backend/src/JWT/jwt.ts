







const jwt = require('jsonwebtoken');


const somethin = require('crypto').randomBytes(64).toString('hex')
// '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

const dotenv = require('dotenv');

// get config vars
dotenv.config();



export const generateAccessToken = async (username: string) => {
    const token = await jwt.sign(username, process.env.TOKEN_SECRET)
    return token
  }


interface authhhh {
    headers: {
    authorization: string
}
    user: {
        username: string
        password: string
    }

}
  // next needs to be refactored !!!!
export const authenticateToken = (req: authhhh, res: string, next:any) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return 'authenticateToken func didnt go through!'
  
    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
      console.log(err)
  
      if (err) return 'authenticateToken func didnt go through 2!'
  
      req.user = user
  
      next()
    })
  }














