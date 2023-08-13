import { useState, createContext } from 'react'
import { TransactionsService } from '../lib/api/services/TransactionsService'
import { Transaction } from '../lib/api/models/Transaction'
import { Coupon } from '../lib/api/models/Coupon'
import { CouponCreate } from '../lib/api/models/CouponCreate'
import { TransactionCreateResponseSchema } from '../lib/api/models/TransactionCreateResponseSchema' 
import { TransactionCreateSchema } from '../lib/api/models/TransactionCreateSchema' 
import { TransactionAcountlessCreateSchema } from '../lib/api/models/TransactionAcountlessCreateSchema' 
// import { UserProfileCreationSchema } from '../lib/api/models/UserProfileCreationSchema'
// import { UserUpdate } from '../lib/api/models/UserUpdate'
// import { useNavigate } from 'react-router-dom';

export interface ProfileInterface {
  getPurchasesBuyer(): Promise<void>
  validateCuponBuyer(cupon: string): Promise<string>
}

export const TransactionContext = createContext({})

const TransactionContextProvider = ({ children }: { children: any }) => {
    // const [ready, setReady] = useState(false)
	// const navigate = useNavigate();

    const getPurchasesBuyer = async (): Promise<string> => {
		try {
            // console.log("Hola")
			const response = await TransactionsService.getMyPurchases()
            // console.log(response)
            return JSON.stringify(response)
		} catch (error) {
            console.log(error)
            return JSON.stringify(error)
		}
	}

	const getSells = async (): Promise<string> => {
		try {
            // console.log("Hola")
			const response = await TransactionsService.getMySells()
            // console.log(response)
            return JSON.stringify(response)
		} catch (error) {
            console.log(error)
            return JSON.stringify(error)
		}
	}

	const allCoupons = async (): Promise<Array<Coupon>> => {
		try {
			return TransactionsService.getAllCoupons()
		} catch (error) {
            return Promise.reject(error)
		}
	}

	const activateCoupon = async (couponId:number): Promise<Coupon> => {
		try {
			return TransactionsService.activateCoupon(couponId)
		} catch (error) {
            return Promise.reject(error)
		}
	}

	const deactivateCoupon = async (couponId:number): Promise<Coupon> => {
		try {
			return TransactionsService.deactivateCoupon(couponId)
		} catch (error) {
            return Promise.reject(error)
		}
	}

	const deleteCoupon = async (couponId:number): Promise<void> => {
		try {
			TransactionsService.deleteCoupon(couponId)
		} catch (error) {
            return Promise.reject(error)
		}
	}

	const createCoupon = async (body:CouponCreate): Promise<Coupon> => {
		try {
			console.log(body)
			return TransactionsService.createCoupon(body)
		} catch (error) {
            return Promise.reject(error)
		}
	}

	const validateCuponBuyer = async (cupon:string): Promise<string> => {
		try {
			const response = await TransactionsService.validateCoupon(cupon)
			console.log(response)
			return JSON.stringify(response)
		} catch (error) {
			return JSON.stringify(error)
		}
	}

	const createTransactions = async (body:TransactionCreateSchema): Promise<TransactionCreateResponseSchema> => {
		try {
			return TransactionsService.createTransaction(body)
		} catch (error) {
            return Promise.reject(error)
		}
	}

	const createAccountlessTransactions = async (body:TransactionAcountlessCreateSchema): Promise<TransactionCreateResponseSchema> => {
		try {
			return TransactionsService.createAccountlessTransaction(body)
		} catch (error) {
            return Promise.reject(error)
		}
	}
	
	const transaction = {
		getPurchasesBuyer: getPurchasesBuyer,
		getSells: getSells,
		allCoupons: allCoupons,
		activateCoupon: activateCoupon,
		deactivateCoupon: deactivateCoupon,
		deleteCoupon: deleteCoupon,
		createCoupon: createCoupon,
		validateCuponBuyer: validateCuponBuyer,
		createTransactions: createTransactions,
		createAccountlessTransactions: createAccountlessTransactions
	}
	
	return (
		<TransactionContext.Provider value={transaction}>
        	{ children }
		</TransactionContext.Provider>
	)
}


export default TransactionContextProvider