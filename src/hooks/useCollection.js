import { useEffect, useRef, useState } from "react"
import { DB } from "../firebase/config"
import {
    collection,
    onSnapshot,
    where,
    query,
    orderBy,
} from "firebase/firestore"

export const useCollection = (c, _q, _order) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const q = useRef(_q).current
    const order = useRef(_order).current

    // this will run right away as the component that is using the hook mounts
    useEffect(() => {
        let ref = collection(DB, c)
        // When dealing with array(reference type), React will see it differently everytime. Hence, we uses
        // useRef() to take a current sample of the array and avoid the infinite Loop by useEffect
        if (q) {
            ref = query(ref, where(...q))
        }

        if (order) {
            ref = query(ref, orderBy(...order))
        }

        const unsub = onSnapshot(
            ref,
            (snapshot) => {
                let results = []
                snapshot.docs.forEach((doc) => {
                    results.push({ ...doc.data(), id: doc.id })
                })
                setDocuments(results)
                setError(null)
            },
            (error) => {
                console.log(error)
                setError("could not fetch the data")
            }
        )
        return () => {
            unsub()
        }
    }, [c, q, order])
    return { documents, error }
}
