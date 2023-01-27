import { useState } from "react"
import { Container } from "react-bootstrap"
import AddBudgetModal from "../../components/AddBudgetModal"
import { useBudgets } from "../../context/BudgetContext"
import BudgetCard from "./BudgetCard"
import styles from "./categoryTracking.module.css"
import TotalBudgetCard from "./TotalBudgetCard"
export default function CategoryTracking() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
    const { budgets, expenses } = useBudgets()
    return (
        <>
            <TotalBudgetCard />
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto"> Catergory Tracking</h1>
                    <Button
                        variant="primary"
                        onClick={() => setShowAddBudgetModal(true)}
                    >
                        Add Budget
                    </Button>
                </Stack>
                <div className={styles["cards"]}>
                    {BudgetCard.map((budget) => {
                        const amount = getBudgetExpenses(budget.id).reduce(
                            (total, expense) => total + expense.amount,
                            0
                        )
                        return (
                            <BudgetCard
                                key={budget.id}
                                amount={budget.amount}
                                max={budget.limit}
                            ></BudgetCard>
                        )
                    })}
                </div>
                <AddBudgetModal
                    show={showAddBudgetModal}
                    handleClose={() => setShowAddBudgetModal(false)}
                />
            </Container>
        </>
    )
}
