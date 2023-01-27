import { useContext } from "react"
import { useReducer } from "react"
import { createContext } from "react"

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
    // Collect transactions
    // Refactor transactions to create budgets
    const [state, dispatch] = useReducer(budgetReducer, {
        budgets: null,
        transactions: null,
    })

    const getBudgetTransactions = (budgetId) => {
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
    const value = {
        budgetList: state.budget,
        transactions: state.transactions,
        getBudgetTransactions,
        addBudget,
        deleteBudget,
    }
    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    )
}
