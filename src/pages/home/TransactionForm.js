import { useEffect, useState } from "react"
import { useFirestore } from "../../hooks/useFirestore"
import { RadioGroup, ReversedRadioButton } from "react-radio-buttons"
import Select from "react-select"

const categories = [
    { value: "essential", label: "Essential" },
    { value: "personal", label: "Personal" },
]

export default function TransactionForm({ uid }) {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [type, setType] = useState("")
    const [description, setDescription] = useState("")

    const [formError, setFormError] = useState(null)
    const { addDocument, response } = useFirestore("transactionsList")

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!category) {
            setFormError("Please select a project category.")
            return
        }
        const newTrans = {
            uid,
            name,
            amount,
            category: category.value,
            description,
            type,
        }
        console.log(newTrans)
        addDocument(newTrans)
    }
    useEffect(() => {
        if (response.success) {
            setName("")
            setAmount("")
            setType("")
            setCategory("")
        }
    }, [response.success])
    return (
        <div>
            <h3>Add a Transaction</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Transaction Name:</span>
                    <input
                        type="text"
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    ></input>
                </label>
                <label>
                    <span>Amount ($):</span>
                    <input
                        type="number"
                        required
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    ></input>
                </label>
                <label>
                    <RadioGroup
                        onChange={(value) => setType(value)}
                        horizontal
                        required
                    >
                        <ReversedRadioButton value="income">
                            Income
                        </ReversedRadioButton>
                        <ReversedRadioButton value="expense">
                            Expense
                        </ReversedRadioButton>
                    </RadioGroup>
                </label>
                <Select
                    required
                    onChange={(option) => setCategory(option)}
                    options={categories}
                />
                <label>
                    <span>Description ($):</span>
                    <textarea
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                    ></textarea>
                </label>
                <button className="btn">Add Transaction</button>
                {formError && <p className="error">{formError}</p>}
            </form>
        </div>
    )
}
