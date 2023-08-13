import { useState, useEffect, createContext } from 'react';
import { UserAuthService } from '../lib/api/services/UserAuthService';
import { UserOut } from '../lib/api/models/UserOut';
import { LoginIn } from '../lib/api/models/LoginIn';
import { ChangePasswordIn } from '../lib/api/models/ChangePasswordIn';

export interface AuthInterface {
	user: UserOut|null
	isLoggedIn(): boolean
	logIn(credentials: LoginIn): Promise<void>
	logOut(): Promise<void>
	whoAmI(): Promise<void>
	ChangePasswordProfile(): Promise<void>
}

export const AuthContext = createContext({})

const AuthContextProvider = ({ children }: { children: any }) => {
	const [ready, setReady] = useState(false)

	const [user, setUser] = useState<UserOut|null>(() => {
		const storedUser = localStorage.getItem('user')
		return (storedUser !== null && storedUser !== undefined) ? JSON.parse(storedUser) : storedUser
	})

	const isLoggedIn = () => !!user
	const logIn = async (credentials: LoginIn): Promise<void> => {
		try {
			const response = await UserAuthService.login(credentials)
			setUser(response)
			localStorage.setItem('user', JSON.stringify(response))
		} catch (error) {
			localStorage.removeItem('user')
			setUser(null)
		}
	}
	const logOut = async (): Promise<void> => {
		try {
			// console.log('OUT')
			await UserAuthService.logout()
		} finally {
			setUser(null)
			localStorage.removeItem('user')
			localStorage.removeItem('cart')
		}
	}
	const whoAmI = async (): Promise<void> => {
		try {
			const response = await UserAuthService.me()
			localStorage.setItem('user', JSON.stringify(response))
			setUser(response)
			response
		} catch (error) {
			setUser(null)
			localStorage.removeItem('user')
		}
	}
	const ChangePasswordProfile = async (credentials: ChangePasswordIn): Promise<string> => {
		try{
			const response = await UserAuthService.changePassword(credentials);
			console.log(JSON.stringify(response))
			return JSON.stringify(response)
		} catch (error) {
			// setUser(null)
			// localStorage.removeItem('user')
			console.log(error)
			return JSON.stringify(error)
		}
	}

	const auth = {
		user,
		isLoggedIn: isLoggedIn,
		logIn: logIn,
		logOut: logOut,
		whoAmI: whoAmI,
		ChangePasswordProfile: ChangePasswordProfile
	}
	
	useEffect(() => {
		const checkUser = async () => {
			if (!auth.isLoggedIn()) {
				await auth.whoAmI()
			}
			setReady(true)
		}
		checkUser()	
	}, [auth.user])
	
	return (
		<AuthContext.Provider value={auth}>
			{(children)}
		</AuthContext.Provider>
	)
}


export default AuthContextProvider
