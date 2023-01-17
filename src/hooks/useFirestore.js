import { useReducer, useEffect, useState } from "react";
import { DB} from '../firebase/config'
import {collection, addDoc, deleteDoc, doc, Timestamp} from 'firebase/firestore'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}
const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { document: null, success: false, error: null, isPending: true }
        case 'ADDED_DOCUMENT':
            return { ...state, isPending: false, document: action.payload, success: true }
        case 'DELETE_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: true, success: false, document: null, error: action.payload }
        default:
            return state
    }
}
export const useFirestore = (c) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    //collection ref
    const ref = collection(DB,c)

    //only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled) {
            dispatch(action)
        }
    }

    //add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })
        try {
            const createdAt = Timestamp.fromDate(new Date())
            const addDocument = await addDoc(ref, { ...doc, createdAt })
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addDocument })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    //delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING" })
        try {
            const deleteDocument = await deleteDoc(doc(DB, c, id))
            dispatchIfNotCancelled({ type: "DELETE_DOCUMENT", payload: deleteDocument })
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: 'could not delete' })
        }
    }

    useEffect(() => {

        return () => setIsCancelled(true)
    }, [])
    return { addDocument, deleteDocument, response }
}