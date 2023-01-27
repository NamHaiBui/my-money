// import { useStateuseEffect } from "react"

// export default function useLocalStorage(key, defaultValue) {
//     const [value, setValue] = useState(() => {
//         const jsonValue = localStorage.getItem(key)
//         if (jsonValue != null) return JSON.parse(jsonValue)
//         if (typeof defaultValue === "function") {
//             return defaultValue()
//         } else {
//             return defaultValue
//         }
//     })
//     useEffect(() => {
//         localStorage.setItem(key, JSON.stringify(value))
//     }, [key, value])
//     return [value, setValue]
// }
import { BudgetContext } from "../context/BudgetContext"
import { useContext } from "react"

export const useBudgetContext = () => {
    const context = useContext(BudgetContext)
    // the hook is used outside the scope of the Context
    if (!context) {
        throw Error("useBudgetContext must be inside an BudgetContextProvider")
    }
    return context
}
