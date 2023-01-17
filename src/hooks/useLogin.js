import { useEffect, useState } from "react";
import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth"
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [isCanceled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch } = useAuthContext()
    const login = async (email, password) => {
        setError(null)
        setIsPending(true)
        await signInWithEmailAndPassword(auth, email, password).then((res)=>{
            dispatch({ type: 'LOGIN', payload: res.user })
            //update State 
            if (!isCanceled) {
                setIsPending(false)
                setError(null)
            }
        }
        ).catch ((err)=> {
            if (!isCanceled) {
                setError(err.message)
                setIsPending(false)
            }
        })
    }
    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])
    return { login, error, isPending }
}