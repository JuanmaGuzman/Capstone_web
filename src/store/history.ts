import { useContext } from 'react'
import { TransactionContext } from '../contexts/TransactionsContextProvider'


// export default () => useContext(ProfileContext)
export function useTransactions() {
    return useContext(TransactionContext);
}