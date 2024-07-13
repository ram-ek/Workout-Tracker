import { useState } from 'react'

import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [ error, setError ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(null)

    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })

        const data = await response.json()

        if(response.ok) {
            // save user to local storage
            localStorage.setItem('user', JSON.stringify(data))

            // update auth context
            dispatch({ type: 'LOGIN', payload: data })
        }

        setIsLoading(false)
        setError(data.error)
    }

    return { signup, isLoading, error }
}