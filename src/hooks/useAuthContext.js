import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    // the hook is used outside the scope of the Context
    if (!context) {
        throw Error('useAuthContext must be inside an AuthContextProvider')
    }
    return context
}