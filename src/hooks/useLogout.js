import { useEffect, useState } from "react";
import { auth } from '../firebase/config'
import { signOut } from "firebase/auth"
import { useAuthContext } from "./useAuthContext";
//When we reset the page all context are resetted

export const useLogout = () => {
    const [isCanceled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch } = useAuthContext()
    const logout = async () => {
        setError(null)
        setIsPending(true)
            await signOut(auth).then(() =>{
            dispatch({ type: 'LOGOUT' })
            if (!isCanceled) {
                setIsPending(false)
                setError(null)
            }
        }).catch((err) => {
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
    return { logout, error, isPending }
}