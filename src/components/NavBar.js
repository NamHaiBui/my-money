import { Link } from "react-router-dom"
import styles from "./NavBar.module.css"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

export default function NavBar() {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}>WellSpent</li>
                {!user && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Signup</Link>
                        </li>
                    </>
                )}

                {user && (
                    <>
                        <li>{user.displayName}</li>
                        <li>
                            <button className="btn" onClick={logout}>
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}
