import { useFirestore } from "../../hooks/useFirestore"
import styles from "./Home.module.css"

export default function TransactionList({ transactions }) {
    const { deleteDocument } = useFirestore("transactionsList")
    // 2021-04-16T08:52:24.408Z
    // if (transactions) {
    //     const organizedTransactionData = [
    //         ...new Set(
    //             transactions.map((t) => parseInt(t.createdAt.split("-")[0]))
    //         ),
    //     ]
    //         .map((yr) => [
    //             yr,
    //             [
    //                 ...new Set(
    //                     transactions
    //                         .filter(
    //                             (t) =>
    //                                 parseInt(t.createdAt.split("-")[0]) === yr
    //                         )
    //                         .map((t) => parseInt(t.createdAt.split("-")[1]))
    //                 ),
    //             ]
    //                 .map((mo) => [
    //                     mo,
    //                     transactions
    //                         .filter(
    //                             (t) =>
    //                                 parseInt(t.createdAt.split("-")[0]) ===
    //                                     yr &&
    //                                 parseInt(t.createdAt.split("-")[1]) === mo
    //                         )
    //                         .map((t) => ({
    //                             ...t,
    //                             sign: t.type === "Income" ? 1 : -1,
    //                         })),
    //                 ])
    //                 .sort((a, b) => b[0] - a[0]),
    //         ])
    //         .sort((a, b) => b[0] - a[0])
    //     console.log(organizedTransactionData)
    // }
    return (
        <ul className={styles.transactions}>
            {transactions.map((transaction) => {
                return (
                    <li key={transaction.id}>
                        <p className={styles.name}>{transaction.name}</p>
                        <p>{transaction.category}</p>
                        <p className={styles.amount}>$ {transaction.amount}</p>
                        <button onClick={() => deleteDocument(transaction.id)}>
                            x
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}
