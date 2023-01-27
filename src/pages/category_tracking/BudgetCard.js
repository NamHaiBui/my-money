import { Card, ProgressBar } from "react-bootstrap"
import { currencyFormatter } from "../utils/currencyFormatter"
export default function BudgetCard({ name, amount, limit, gray }) {
    const getProgressBarVariant = (amount, limit) => {
        const ratio = amount / max
        if (ratio < 0.5) return "primary"
        if (ratio < 0.75) return "warning"
        return "danger"
    }
    let className = []
    if (amount > max) {
        className.push("No-danger", "bg-opacity-10")
    } else if (gray) {
        className.push("bg-light")
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
                    <div className="me-2">{name}</div>
                    <div className="d-flex align-items-baseline">
                        {" "}
                        {currencyFormatter.format(amount)}
                        {max && (
                            <span className="text-muted fs-6 ms-1">
                                /{currencyFormatter.format(limit)}
                            </span>
                        )}
                    </div>
                </Card.Title>
                {max && (
                    <ProgressBar
                        className="rounded-pill"
                        variant={getProgressBarVariant(amount, limit)}
                        min={0}
                        max={limit}
                        now={amount}
                    />
                )}
            </Card.Body>
        </Card>
    )
}
