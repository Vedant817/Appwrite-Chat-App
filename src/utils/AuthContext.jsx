import { createContext, useState, useEffect, useContext } from "react";
import {account} from '../appwriteConfig';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        try {
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const contextData = {
        user,
        handleUserLogin
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