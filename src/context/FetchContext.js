import React, { createContext } from 'react'
import axios from 'axios'


const environmentApiUrl = {
    'development': 'http:localhost:8000',
    'production': ''
}
const FetchContext = createContext()
const { Provider } = FetchContext

function FetchProvider({ children }) {

    const authAxios = axios.create({
        baseUrl: environmentApiUrl[process.env.NODE_ENV]
    })


    return (
        <Provider
            value={{
                authAxios
            }}
        >
            {children}
        </Provider>
    )
}

export { FetchContext, FetchProvider }

