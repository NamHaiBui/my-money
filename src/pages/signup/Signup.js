
import { useState } from 'react'
import styles from './Signup.module.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { signup, isPending, err } = useSignup()
    const [error, setError] = useState(null)
    // Implement this when learn pop-up
    // const confirmPassword= (e)=>{
    //     e.preventDefault();
    //     if (e.target.value !== password){

    //     }
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            setError(err)
            if (confirmPassword !== password) {
                setPassword('')
                setPassword('')
                throw new Error("Passwords do NOT match")
            } else {
                signup(email, password, displayName)
            }
        } catch (err) {
            setError(err.message)
        }
    }
    return (
        <div>
            <form className={styles['signup-form']} onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label>
                    <span>Display Name:</span>
                    <input
                        type="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                        value={displayName}
                        required
                    />
                </label>
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
                <label>
                    <span>Confirm Password:</span>
                    <input
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        required
                    />
                </label>
                {!isPending && < button className='btn'>Register</button>}
                {isPending && <button className="btn" disabled>Loading</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

