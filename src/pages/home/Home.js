
import styles from './Home.module.css'
import TransactionForm from './TransactionForm'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import TransactionList from './TransactionList'
import SpendManage from './SpendManage'
export default function Home() {
    // Add Filter by all, this week, this month, Essential Needs, Personal Needs 
    const { user } = useAuthContext()
    const { documents, error } = useCollection('transactionsList', ["uid", "==", user.uid], ["createdAt", "desc"])
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <SpendManage documents={documents}/>
                {error && <p>{error}</p>}
                {documents && <TransactionList transactions={documents} />}
            </div>
            <div className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
            </div>
        </div>
    )
}

