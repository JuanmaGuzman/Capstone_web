import { useContext } from 'react'
import { ProductContext } from '../contexts/ProductContextProvider'


export default () => useContext(ProductContext)
// export default function useProduct() {
//     return useContext(ProductContext);
// }