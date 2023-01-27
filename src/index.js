import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { AuthContextProvider } from "./context/AuthContext"
import "bootstrap/dist/css/bootstrap.im.css"
import { BudgetContextProvider } from "./context/BudgetContext"

ReactDOM.render(
    <AuthContextProvider>
        <BudgetContextProvider>
            <App />
        </BudgetContextProvider>
    </AuthContextProvider>,
    document.getElementById("root")
)
