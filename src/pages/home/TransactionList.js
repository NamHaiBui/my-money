import { useEffect, useRef, useState } from "react"
import styles from "./Home.module.css"

export default function TransactionList({ transactions }) {
    const [transactionsD, setTransactionsD] = useState([])
    const [focused, setFocused] = useState(false)
    const [previous, setPrevious] = useState(null)
    const inputEls = useRef([])

    transactions.map((transaction) => {
        transaction.posted = new Date(
            parseInt(parseInt(transaction.createdAt.seconds) * 1000)
        )
            .toISOString()
            .toString()
        return transaction
    })
    useEffect(() => {
        const persistBlur = (element) => {
            element.blur()
            element.focus()
            element.blur()
        }
        const handleClick = (id) => {
            inputEls.current[id].focus()
            if (
                !focused &&
                !inputEls.current[id].classList.contains(styles["focused"])
            ) {
                setPrevious(id)
                persistBlur(inputEls.current[id])
                inputEls.current[id].classList.toggle(styles["focused"])
                setFocused(true)
            } else if (
                focused &&
                inputEls.current[id].classList.contains(styles["focused"])
            ) {
                setPrevious(id)
                inputEls.current[id].classList.toggle(styles["focused"])
                setFocused(false)
            } else {
                inputEls.current[previous].classList.toggle(styles["focused"])
                setFocused(false)
                setPrevious(id)
                inputEls.current[id].classList.toggle(styles["focused"])
                setFocused(true)
            }
        }
        const handleBlur = (id) => {
            // if (focused) {
            //     inputEls.current[previous].classList.remove(styles["focused"])
            //     setFocused(false)
            // }
        }

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
            // console.log(organizedTransactionData)
            for (const [year, months] of organizedTransactionData) {
                //add Ispending
                const formatMonth = new Intl.DateTimeFormat("en", {
                    month: "short",
                })
                for (const [month, transactions] of months) {
                    let monthDiv = []
                    // console.log(transactions)
                    for (let transaction of transactions) {
                        const date = new Date(transaction.posted)
                        monthDiv.push(
                            <div
                                key={transaction.id}
                                className={styles["transaction"]}
                                tabIndex="0"
                                onClick={() => handleClick(transaction.id)}
                                ref={(el) =>
                                    (inputEls.current[transaction.id] = el)
                                }
                                onBlur={() => handleBlur(transaction.id)}
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
                                    {transaction.description !== "" && (
                                        <>
                                            <strong
                                                className={
                                                    styles["datetime-label"]
                                                }
                                            >
                                                Description
                                            </strong>
                                            <span
                                                className={styles["datetime"]}
                                            >
                                                {transaction.description}
                                            </span>
                                        </>
                                    )}
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

        // const copyToClipboard = (str) => {
        //     const el = document.createElement("textarea")
        //     el.value = str
        //     el.setAttribute("readonly", "")
        //     el.style.position = "absolute"
        //     el.style.left = "-9999px"
        //     document.body.appendChild(el)
        //     const selected =
        //         document.getSelection().rangeCount > 0
        //             ? document.getSelection().getRangeAt(0)
        //             : false
        //     el.select()
        //     document.execCommand("copy")
        //     document.body.removeChild(el)
        //     if (selected) {
        //         document.getSelection().removeAllRanges()
        //         document.getSelection().addRange(selected)
        //     }
        // }

        // window.addEventListener("keydown", (e) => {
        //     const activeElement = document.activeElement
        //     if (
        //         e.keyCode === 67 &&
        //         e.metaKey &&
        //         activeElement.matches(".transaction")
        //     ) {
        //         copyToClipboard(activeElement.dataset.copyContent)
        //         applyFocus(activeElement)
        //     }
        // })

        // window.addEventListener("keyup", (e) => {
        //     const activeElement = document.activeElement
        //     if (e.keyCode === 9 && activeElement.matches(".transaction")) {
        //         applyFocus(activeElement)
        //     }
        // })
    }, [transactions, focused, inputEls, previous])

    return <div>{transactionsD}</div>
}
