import { useContext } from 'react'
import { ProfileContext } from '../contexts/ProfileContextProvider'


// export default () => useContext(ProfileContext)
export function useProfile() {
    return useContext(ProfileContext);
}