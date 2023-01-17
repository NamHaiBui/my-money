import { useEffect, useState } from "react"
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [isCanceled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)
        await createUserWithEmailAndPassword(auth, email, password).then((res) =>{
            if (!res) {
                throw new Error("Could not complete signup")
            }
            // dispatch login function
            dispatch({ type: 'LOGIN', payload: res.user })

            res.user.updateProfile({ displayName: displayName })
            //update State
            if (!isCanceled) {
                setIsPending(false)
                setError(null)
            }
        }).catch ((err) => {
            if (!isCanceled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        })
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return { error, isPending, signup }
}