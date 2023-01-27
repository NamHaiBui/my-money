import { useBudgets } from "../../context/BudgetContext"
import BudgetCard from "./BudgetCard"

export default function TotalBudgetCard(props) {
    // Change this to using the MDB Doughnut Chart
    const { expenses, budgets } = useBudgets()
    const amount = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    )
    const max = budgets.reduce((total, budget) => total + budget.amount, 0)
    if (amount === 0) return null
    return <BudgetCard amount={amount} name="Total" gray max={max} />
}
