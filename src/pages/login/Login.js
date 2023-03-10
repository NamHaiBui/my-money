import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import styles from './Login.module.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isPending } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (
        <div>
            <form className={styles['login-form']} onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>
                    <span>Email:</span>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                </label>
                {error && <p>{error}</p>}
                {!isPending && <p><button className='btn'>Login</button></p>}
                {isPending && <p><button className='btn' disabled>Loading</button></p>}
            </form>
        </div>
    )
}
