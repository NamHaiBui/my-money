import React, { useEffect, useState } from "react"

export default function SpendManage({ documents }) {
    const [totalSpending, setTotalSpending] = useState(0)
    const [spendCap] = useState(null)
    // add a form in home page to set spend cap

    useEffect(() => {
        let total = 0
        if (documents) {
            documents.forEach((transaction) => {
                if (transaction.type === "expense") {
                    total += parseFloat(transaction.amount)
                }
                if (transaction.type === "income") {
                    total -= parseFloat(transaction.amount)
                }
            })
        }
        setTotalSpending(total)
    }, [documents, totalSpending])

    return (
        <div>
            <h4>Spending Limit: {spendCap ? spendCap : "Infinity"}</h4>
            <h4>Total Spent: {`$${totalSpending}`}</h4>
        </div>
    )
}
