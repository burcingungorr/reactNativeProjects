import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import React, { useState } from 'react'
import reducers from './reducers'

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null)
    const [isAuthLoading, setisAuthLoading] = useState(true);

//useEffect(() => {}, [])




    const store =configureStore(reducers,{})
  return <Provider>{children}</Provider>
}

export default AuthProvider