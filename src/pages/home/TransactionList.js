import { useEffect, useState } from "react"
import styles from "./Home.module.css"

export default function TransactionList({ transactions }) {
    const [transactionsD, setTransactionsD] = useState([])
    transactions.map((transaction) => {
        transaction.posted = new Date(
            parseInt(parseInt(transaction.createdAt.seconds) * 1000)
        )
            .toISOString()
            .toString()
        return transaction
    })

    useEffect(() => {
        let transactionDiv = []
        const leadZero = (number) => ("0" + number).slice(-2)
        if (transactions) {
            const organizedTransactionData = [
                ...new Set(
                    transactions.map((t) => parseInt(t.posted.split("-")[0]))
                ),
            ]
                .map((yr) => [
                    yr,
                    [
                        ...new Set(
                            transactions
                                .filter(
                                    (t) =>
                                        parseInt(t.posted.split("-")[0]) === yr
                                )
                                .map((t) => parseInt(t.posted.split("-")[1]))
                        ),
                    ]
                        .map((mo) => [
                            mo,
                            transactions
                                .filter(
                                    (t) =>
                                        parseInt(t.posted.split("-")[0]) ===
                                            yr &&
                                        parseInt(t.posted.split("-")[1]) === mo
                                )
                                .map((t) => ({
                                    ...t,
                                    sign: t.type === "income" ? 1 : -1,
                                })),
                        ])
                        .sort((a, b) => b[0] - a[0]),
                ])
                .sort((a, b) => b[0] - a[0])

            for (const [year, months] of organizedTransactionData) {
                const formatMonth = new Intl.DateTimeFormat("en", {
                    month: "short",
                })
                for (const [month, transactions] of months) {
                    let monthDiv = []
                    for (let transaction of transactions) {
                        const date = new Date(transaction.posted)
                        monthDiv.push(
                            <div
                                key={transaction.id}
                                className={styles["transaction"]}
                                tabIndex="0"
                                data-important={`${
                                    date.getMonth() + 1
                                }/${date.getDate()}/${date.getFullYear()}, ${
                                    transaction.type
                                }, ${transaction.category}, ${
                                    transaction.sign + 1 === 0 ? "+" : "-"
                                }$${transaction.amount
                                    .toString()
                                    .split(".")
                                    .map((e, i) =>
                                        i
                                            ? e
                                            : e
                                                  .split("")
                                                  .reverse()
                                                  .map((f, j) =>
                                                      j && j % 3 === 0
                                                          ? f + ","
                                                          : f
                                                  )
                                                  .reverse()
                                                  .join("")
                                    )
                                    .join(".")}`}
                            >
                                <div className={styles["transaction-overview"]}>
                                    <div className={styles["transaction-date"]}>
                                        {date.getDate()}
                                    </div>
                                    <div
                                        className={
                                            styles["transaction-name-category"]
                                        }
                                    >
                                        <div
                                            className={
                                                styles["transaction-name"]
                                            }
                                        >
                                            {transaction.name}
                                        </div>
                                        <div
                                            className={
                                                styles["transaction-category"]
                                            }
                                        >
                                            {transaction.category}
                                        </div>
                                    </div>
                                    <div
                                        className={`${
                                            styles["transaction-amount"]
                                        }
                                            ${
                                                styles[
                                                    transaction.type.toLowerCase()
                                                ]
                                            }`}
                                    >
                                        {transaction.sign + 1 === 0 ? "-" : "+"}
                                        $
                                        {transaction.amount
                                            .toString()
                                            .split(".")
                                            .map((e, i) =>
                                                i
                                                    ? e
                                                    : e
                                                          .split("")
                                                          .reverse()
                                                          .map((f, j) =>
                                                              j && j % 3 === 0
                                                                  ? f + ","
                                                                  : f
                                                          )
                                                          .reverse()
                                                          .join("")
                                            )
                                            .join(".")}
                                    </div>
                                    {/* <button
                                        onClick={() =>
                                            deleteDocument(transaction.id)
                                        }
                                    >
                                        x
                                    </button> */}
                                </div>

                                <div className={styles["transaction-details"]}>
                                    <strong
                                        className={styles["datetime-label"]}
                                    >
                                        Datetime
                                    </strong>
                                    <span className={styles["datetime"]}>
                                        {year}-{leadZero(month)}-
                                        {leadZero(date.getDate())}
                                        {leadZero(date.getHours())}:
                                        {leadZero(date.getMinutes())}:
                                        {leadZero(date.getSeconds())} GTM
                                        {Math.sign(
                                            -1 * date.getTimezoneOffset()
                                        ) + 1
                                            ? "+"
                                            : "-"}
                                        {Math.abs(date.getTimezoneOffset()) /
                                            60}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    transactionDiv.push(
                        <div key={year * month}>
                            <h2 className={styles["transaction-group-heading"]}>
                                {`${formatMonth.format(
                                    new Date(transactions[0].posted)
                                )} ${year}`}
                            </h2>
                            <div className={styles["transaction-group"]}>
                                {monthDiv}
                            </div>
                        </div>
                    )
                }
            }
        }
        setTransactionsD(transactionDiv)
    }, [transactions])

    return <div>{transactionsD}</div>
    // return (
    //     <div>
    //         <ul className={styles.transactions}>
    //             {transactions.map((transaction) => {
    //                 return (
    //                     <li key={transaction.id}>
    //                         <p className={styles.name}>{transaction.name}</p>
    //                         <p>{transaction.category}</p>
    //                         <p className={styles.amount}>
    //                             $ {transaction.amount}
    //                         </p>

    //                     </li>
    //                 )
    //             })}
    //         </ul>
    //     </div>
    // )
}
