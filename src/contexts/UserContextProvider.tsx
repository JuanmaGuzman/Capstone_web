import { createContext } from 'react'
import { UserProfileService } from '../lib/api/services/UserProfileService'
import { UserShippingAddress } from '../lib/api/models/UserShippingAddress'
import { UserShippingAddressCreate } from '../lib/api/models/UserShippingAddressCreate'
import {UserProfile4} from '../lib/api/models/UserProfile4'

export interface UserInterface {
	getAllUsers(): Promise<void>
    removeSeller(): Promise<void>
    removeUserById(): Promise<void>
    allSignedUserShippingAddresses(): Promise<UserShippingAddress>
    oneSignedUserShippingAddresses (addressId:number):Promise<UserShippingAddress>
    createShippingAddress (info:UserShippingAddressCreate): Promise<void>
    removeShippingaddress(addressId:number) : Promise<void>
}

export const UserContext = createContext({})


const UserContextProvider = ({ children }: { children: any }) => {

    const allUsers = async (): Promise<Array<UserProfile4>> => {
		try {
            const response = await UserProfileService.getAllUsers()
            const noAdminUsers = response.filter(user => !user.is_admin)
			return noAdminUsers
		} catch (error) {
			return Promise.reject(error);
		}
	}

    const allSellers = async (): Promise<Array<UserProfile4>> => {
		try {
			const allUsers = await UserProfileService.getAllUsers()
            const sellers = allUsers.filter(user => user.is_seller && !user.is_admin)
            return sellers
		} catch (error) {
			return Promise.reject(error);
		}
	}

    const removeSeller = async (userId: number): Promise<void> => {
        try {
            UserProfileService.removeSeller(userId)
        } catch (error) {
            Promise.reject(error)
        }
    }

    const assignSeller = async (userId: number): Promise<void> => {
        try {
            UserProfileService.assignSeller(userId)
        } catch (error) {
            Promise.reject(error)
        }
    }

	const removeUser = async (userId: number): Promise<void> => {
        try {
            UserProfileService.removeUserById(userId)
        } catch (error) {
            Promise.reject(error)
        }
    }

    const removeActualUser = async (): Promise<void> => {
        try {
            UserProfileService.removeUser()
        } catch (error) {
            Promise.reject(error)
        }
    }

    const allSignedUserShippingAddresses = async ():Promise<Array<UserShippingAddress>> => {
        try {
            return await UserProfileService.getAllSignedUserShippingAddresses()
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const oneSignedUserShippingAddresses = async (addressId:number):Promise<UserShippingAddress> => {
        try {
            return await UserProfileService.getSignedUserShippingAddress(addressId)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const createShippingAddress = async(info:UserShippingAddressCreate):Promise<string> => {
        try{
            const response = await UserProfileService.createShippingAddress(info)
            return JSON.stringify(response)
        } catch (error) {
            return JSON.stringify(error)
        }
    }

    const removeShippingaddress = async(addressId:number) : Promise<void> => {
        try{
            UserProfileService.deleteShippingAddress(addressId)
        } catch (error) {
            Promise.reject(error)
        }
    }

    const user = {
		allUsers: allUsers,
        removeSeller: removeSeller,
		removeUser: removeUser,
        allSellers: allSellers,
        removeActualUser: removeActualUser,
        assignSeller: assignSeller,
        allSignedUserShippingAddresses: allSignedUserShippingAddresses,
        oneSignedUserShippingAddresses: oneSignedUserShippingAddresses,
        createShippingAddress: createShippingAddress,
        removeShippingaddress: removeShippingaddress
	}

    return (
		<UserContext.Provider value={user}>
			{(children)}
		</UserContext.Provider>
	)
}

export default UserContextProvider
