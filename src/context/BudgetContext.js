import { useContext } from "react"
import { useReducer } from "react"
import { createContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

export const UNCATEGORIZED_BUDGET_ID = "uncategorized"
export const BudgetContext = createContext()

export const budgetReducer = (state, action) => {
    switch (action.type) {
        case "GET_BUDGET_TRANSACTIONS":
        case "ADD_BUDGET":
        case "DELETE_BUDGET":
        default:
            return state
    }
}

export const BudgetContextProvider = ({ children }) => {
    cosnt[(state, dispatch)] = useReducer(budgetReducer, {
        transaction: null,
        dataRetrieved: false,
    })
    const [budgets, setBudgets] = useLocalStorage()
    const [expenses, setExpenses] = setState()

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter((expense) => expense.budgetId === budgetId)
    }
    const addBudget = (name, max) => {
        setBudgets((prevBudgets) => {
            if (prevBudgets.find((budget) => budget.name === name)) {
                return prevBudgets
            }
            return [...prevBudgets, { id, name, max }]
        })
    }

    const deleteBudget = ({ id }) => {
        setExpenses((prevExpenses) => {
            return prevExpenses.map((expense) => {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID }
            })
        })

        setBudgets(
            //Deal with expenses
            (prevBudgets) => {
                prevBudgets.filter((budget) => budget.id !== id)
            }
        )
    }
    return (
        <BudgetContext.Provider value={{ ...state, dispatch }}>
            {children}
        </BudgetContext.Provider>
    )
}