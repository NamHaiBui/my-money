import { Modal } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../../context/BudgetContext"
export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { getBudgetExpenses, budgets, deleteBudget } = useBudgets()
    const expenses = getBudgetExpenses(budgetId)
    const budget =
        UNCATEGORIZED_BUDGET_ID === budgetId
            ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
            : Budgets.find((b) => b.id === budgetId)
    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Stack direction="horizontal" gap="2">
                    <div> Expenses - {budgets?.name}</div>
                    {budgetId !== CATEGORIZED_BUDGET_ID && (
                        <Button
                            onClick={() => {
                                deleteBudget(budget)
                                handleClose()
                            }}
                            variant="outline-danger"
                        >
                            Delete
                        </Button>
                    )}
                </Stack>
            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical" gap="3">
                    {expenses.map((expense) => (
                        <div>
                            <div className="me-auto fs-4">
                                {expense.description}
                            </div>
                            <div className="fs-5">
                                {currencyFormatter.format(expense.amount)}
                            </div>
                        </div>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    )
}
