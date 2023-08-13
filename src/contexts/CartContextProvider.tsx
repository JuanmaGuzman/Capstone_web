import React from 'react'
import { createContext } from 'react'
import { PublicationsService } from '../lib/api/services/PublicationsService'
import { Shopping_Cart } from '../lib/api/models/Shopping_Cart'
import { ShoppingCartDetail } from '../lib/api/models/ShoppingCartDetail'
import { PublicationCreationSchema } from '../lib/api/models/PublicationCreationSchema'
import { PublicationsShow } from '../lib/api/models/PublicationsShow'
import { PublicationItemSchema } from '../lib/api/models/PublicationItemSchema'
import useAuth from '../store/auth';
import useProduct from '../store/product'


export const CartContext = createContext({})

const CartContextProvider = ({ children }: { children: any }) => {

	const auth:any = useAuth()
	const product:any = useProduct()

	function handleInitialLoad (response: any) {
		localStorage.setItem('cart', JSON.stringify(response))
	}

	function handleAddItem(publicationId:number, requestBody:Shopping_Cart, fromCart:boolean, productId:number) {
		const textCart:any = localStorage.getItem('cart')
		const storedCart = JSON.parse(textCart)
		console.log(storedCart)
		product.getPublication(productId)
		.then((publication:PublicationsShow) => {
			console.log(publication)
			const publication_item:PublicationItemSchema|any = publication?.publication_items?.find((post:any) => post.id == publicationId)
			console.log(publication_item)
			const data = {
				amount: requestBody.amount,
				publication_item: {
					id: publication_item.id,
					publication: publication_item.publication,
					item: publication_item.item,
					available: publication_item.available,
					publication_info: {
						price: publication.price,
						image_uris: publication.photo_uris
					}
				}
			}
			console.log(data)
			if (storedCart === null) localStorage.setItem('cart', JSON.stringify([data]))
			else {
				const searchedPublication = storedCart.find((post:any) => post.publication_item.id === publicationId)
				if (searchedPublication) {
					if (fromCart) 
						searchedPublication.amount += 1
					else
						searchedPublication.amount = requestBody.amount
				}
				else 
					storedCart.push(data)
				localStorage.setItem('cart', JSON.stringify(storedCart))
			}
			// console.log(localStorage.getItem('cart'))
		})
	}

	function handleRemoveItem (publicationId:number) {
		const textCart:any = localStorage.getItem('cart')
		const storedCart = JSON.parse(textCart)
		const publicationIndex = storedCart.findIndex((post:any) => post.publication_item.id === publicationId)
		console.log("Antes:", storedCart)
		storedCart.splice(publicationIndex, 1)
		localStorage.setItem('cart', JSON.stringify(storedCart))
		console.log(storedCart)
	}

	async function handleCartButtonRequest (publicationId:number) {
		PublicationsService.showShoppingCartUser()
		.then((response:any) => {
			const cartItem = response.find((post:any) => post.publication.id === publicationId)
			let prevAmount = 0
			if (cartItem !== undefined){
				prevAmount = cartItem.amount
			}
			const data = { amount: prevAmount + 1}
			PublicationsService.addToCart(publicationId, data)
		})
	}

    const myCart = async (): Promise<Array<ShoppingCartDetail>|string> => {
		try {
			const response = await PublicationsService.showShoppingCartUser()
			handleInitialLoad(response)
			return response
		} catch (error) {
			localStorage.removeItem('cart')
			Promise.reject(error);
			return('Error')
		}
	}

    const addItem = async (publicationId: number, requestBody: Shopping_Cart, productId:number): Promise<void> => {
		try {
			handleAddItem(publicationId, requestBody, false, productId)
			if (auth.isLoggedIn()) PublicationsService.addToCart(publicationId, requestBody)
		} catch (error) {
			localStorage.removeItem('cart')
			Promise.reject(error);
		}
	}

	const addItemFromCart = async (publicationId:number, requestBody:Shopping_Cart, productId:number): Promise<void> => {
		try {
			handleAddItem(publicationId, requestBody, true, productId)
			if (auth.isLoggedIn()) {
				handleCartButtonRequest(publicationId)
			}
		} catch (error) {
			localStorage.removeItem('cart')
			Promise.reject(error);
		}
	}

	const removeItem = async (publicationId: number): Promise<void> => {
		try {
			handleRemoveItem(publicationId)
			if (auth.isLoggedIn()) PublicationsService.removeFromCart(publicationId)
		} catch (error) {
			localStorage.removeItem('cart')
			Promise.reject(error);
		}
	}

	const removeCart = async (): Promise<void> => {
		try {
			localStorage.removeItem('cart')
			if (auth.isLoggedIn()) PublicationsService.removeAllCartFromActiveUser()
		} catch (error) {
			Promise.reject(error);
		}
	}

    const cart = {
        myCart: myCart,
        addItemFromCart: addItemFromCart,
		removeItem: removeItem,
		addItem: addItem,
		removeCart: removeCart
	}

    return (
		<CartContext.Provider value={cart}>
			{(children)}
		</CartContext.Provider>
	)
}

export default CartContextProvider
