import AuthProvider from "./context/AuthProvider/AuthProvider"
import Router from "./Router"
import React from "react"

export default () =>{
    return(
        <AuthProvider>
            <Router />
        </AuthProvider>
    )
}