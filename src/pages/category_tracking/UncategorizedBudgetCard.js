import React from "react"
import { UNCATEGORIZED_BUDGET_ID } from "../../context/BudgetContext"
import BudgetCard from "./BudgetCard"
export default function UncategorizedBudgetCard() {
    const { getBudgetExpenses } = useBudgets()
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce(
        (total, expense) => total + expense.amount,
        0
    )
    if (amount === 0) return null
    return (
        <div>
            <BudgetCard amount={amount} name="Uncategorized" gray />
        </div>
    )
}
