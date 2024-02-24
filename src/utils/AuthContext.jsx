import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(()=>{
        setLoading(false)
    }, [])

    const contextData = {
        user
    }

    return <AuthContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
}

//? Building the Custom Hook for using the AuthContext
export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;