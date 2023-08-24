





























import { createSlice } from '@reduxjs/toolkit'



const chatReqIdSlice = createSlice({
  name: 'chatReqId',

  initialState: {
    chatReqID: '',
    buyerID: ''
  },

  reducers: {
    chatReqIDToStore: (state, action) => {
      

      const data = action.payload


      console.log('data in slicer', data)

      //@ts-ignore
      state.chatReqID = data.id
      state.buyerID = data.buyerId



    }
  },
})


export const { chatReqIDToStore } = chatReqIdSlice.actions
export default chatReqIdSlice.reducer



































