/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { account } from '../appwriteConfig';
import { useNavigate } from 'react-router-dom'
import {ID} from 'appwrite'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        getUserOnLoad()
    }, [])

    const getUserOnLoad = async () => {
        try {
            const accountDetails = await account.get();
            setUser(accountDetails)
        } catch (error) {
            console.error(error);
        }
        setLoading(false)
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();
        try {
            const response = await account.createEmailPasswordSession(credentials.email, credentials.password);
            console.log(response);
            const accountDetails = account.get();
            setUser(accountDetails);
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    }

    const handleUserLogout = async () => {
        await account.deleteSession('current');
        setUser(null)
        //* This will automatically navigate us to the login page as user will be set to null and Private Route will protect from accessing other pages.
    }

    const handleUserRegister = async (e, credentials) => {
        e.preventDefault()
        if(credentials.password1 !== credentials.password2){
            alert('Passwords do not match')
            return
        }
        try {
            let response = await account.create(
                ID.unique(),
                credentials.email,
                credentials.password1,
                credentials.name
            )
            //! After registering the user we need to create an email session so that user can directly login and gets navigate to required page.
            await account.createEmailPasswordSession(credentials.email, credentials.password1)
            const accountDetails = account.get();
            setUser(accountDetails)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const contextData = {
        user,
        handleUserLogin,
        handleUserLogout,
        handleUserRegister
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