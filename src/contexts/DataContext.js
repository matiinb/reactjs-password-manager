import React, { useContext, useState } from 'react'
import { db } from '../firebase'
import { collection, doc, getDocs, addDoc, deleteDoc } from 'firebase/firestore'
import { useAuth } from './AuthContext'

const DataContext = React.createContext()

export function useDataStore() {
    return useContext(DataContext)
}

export function DataStoreProvider({ children }) {
    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)
    const { currentUser } = useAuth()

    async function fetchQuery() {
        const dataRef = collection(db, 'main-collection', currentUser.email, 'passwords')
        const storeData = await getDocs(dataRef)

        if (storeData) {
            setData(storeData)
            setLoading(false)
        }
    }

    function addData(service, data) {
        const dataRef = collection(db, 'main-collection', currentUser.email, 'passwords')
        const dataToStore = {
            service: service,
            password: data
        }
        return addDoc(dataRef, dataToStore)
    }

    function deleteData(id) {
        const dataRef = doc(db, 'main-collection', currentUser.email, 'passwords', id)
        return deleteDoc(dataRef)
    }

    const value = {
        data,
        fetchQuery,
        loading,
        addData,
        deleteData
    }

    return (
        <DataContext.Provider value={value}>
            { children }
        </DataContext.Provider>
    )
}
