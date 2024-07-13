import { useState } from 'react'

import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const { login, isLoading, error } = useLogin()

    const handleLogin = async (event) => {
        event.preventDefault()

        await login(email, password)
    }

    return (
        <form className='login' onSubmit={ handleLogin }>
            <h3>Log in</h3>

            <label>Email:</label>
            <input
                type='email'
                onChange={ (event) => setEmail(event.target.value) }
                value={ email }
            />

            <label>Password:</label>
            <input
                type='password'
                onChange={ (event) => setPassword(event.target.value) }
                value={ password }
            />

            <button disabled={ isLoading }>Log in</button>
            { error && <div className='error'>{ error }</div> }
        </form>
    )
}

export default Login