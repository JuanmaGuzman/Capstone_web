import { useState, createContext } from 'react'
import { UserProfileService } from '../lib/api/services/UserProfileService'
import { UserProfile4 } from '../lib/api/models/UserProfile4'
import { UserProfileCreationSchema } from '../lib/api/models/UserProfileCreationSchema'
import { UserUpdate } from '../lib/api/models/UserUpdate'
import { useNavigate } from 'react-router-dom';
import { UserShippingAddress } from '../lib/api/models/UserShippingAddress' 

export interface ProfileInterface {
  createNewUser(credentials: UserProfileCreationSchema): Promise<string>
  isNew(): boolean
  getInformationUser(): Promise<void>
  updateInformationUser(credentials: UserUpdate): Promise<void>
}

export const ProfileContext = createContext({})

const ProfileContextProvider = ({ children }: { children: any }) => {
    const [ready, setReady] = useState(false)
	const navigate = useNavigate();

    const [user, setUser] = useState<UserProfile4|null>(() => {
		const storedUser = localStorage.getItem('user')
		return (storedUser !== null && storedUser !== undefined) ? JSON.parse(storedUser) : storedUser
	})

	const isNew = () => !!user

    const createNewUser = async (credentials: UserProfileCreationSchema): Promise<string> => {
		try {
            // console.log("Hola")
			const response = await UserProfileService.createUser(credentials)

			// toast.current.show({
			// 	severity: 'success',
			// 	summary: 'User Created',
			// 	detail: 'You creaated a new user',
			// 	life: 3000
			// })
            setUser(response)
            setReady(true)
			return ""
		} catch (error) {
            localStorage.removeItem('user')
            setUser(null)
            console.log(error)
			return JSON.stringify(error)
		}
	}
	
	const getInformationUser = async(): Promise<UserProfile4|void> => {
		try {
			const response = await UserProfileService.getUser()
			localStorage.setItem('user', JSON.stringify(response))
			setUser(response)
			return response
		} catch (error) {
			setUser(null)
			localStorage.removeItem('user')
		} 
	}


	const updateInformationUser = async(credentials: UserUpdate) : Promise<void> => {
		console.log(localStorage.getItem('user'));
		try{
			const response = await UserProfileService.updateUser(credentials)
			setReady(true)
		} catch (error) {
			console.log(error)
		}
	}

	const getAllShippingAddresses = async() : Promise<Array<UserShippingAddress>> => {
		console.log(localStorage.getItem('user'));
		try{
			return await UserProfileService.getAllSignedUserShippingAddresses()
		} catch (error) {
			return Promise.reject(error)
		}
	}

	
	const profile = {
		createNewUser: createNewUser,
		isNew: isNew,
		getInformationUser: getInformationUser,
		updateInformationUser: updateInformationUser,
		getAllShippingAddresses: getAllShippingAddresses
	}
	
	return (
		<ProfileContext.Provider value={profile}>
        	{ children }
		</ProfileContext.Provider>
	)
}


export default ProfileContextProvider