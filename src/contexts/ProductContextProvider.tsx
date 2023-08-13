import { createContext } from 'react'
import { PublicationsService } from '../lib/api/services/PublicationsService'
import { CategorySchema } from '../lib/api/models/CategorySchema'
import { PublicationsShow } from '../lib/api/models/PublicationsShow'
import { Publication_Update } from '../lib/api/models/Publication_Update'
import { SuccinctPublicationSchema } from '../lib/api/models/SuccinctPublicationSchema' 
import { PublicationItemSchema } from '../lib/api/models/PublicationItemSchema'

export interface ProductInterface {
	allPublications(): Promise<void>
    getPublication(publicationId: any): Promise<void>
}

export const ProductContext = createContext({})

const ProductContextProvider = ({ children }: { children: any }) => {

    const allPublications = async (): Promise<Array<SuccinctPublicationSchema>> => {
		try {
			return PublicationsService.showPublications()
		} catch (error) {
			console.log("error")
			return Promise.reject(error);
		}
	}

	const getRecomendations = async (amount:number): Promise<Array<SuccinctPublicationSchema>> => {
		try {
			return PublicationsService.getPublicationRecommendations(amount)
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const activePublications = async (): Promise<Array<SuccinctPublicationSchema>> => {
		try {
			return PublicationsService.showActivePublications()
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const nonActivePublications = async (): Promise<Array<SuccinctPublicationSchema>> => {
		try {
			return PublicationsService.showInactivePublications()
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const acceptPublication = async (publicationId: number): Promise<void> => {
		try {
			PublicationsService.acceptPublication(publicationId)
		} catch (error) {
			Promise.reject(error);
		}
	}

	const rejectPublication = async (publicationId: number): Promise<void> => {
		try {
			PublicationsService.rejectPublication(publicationId)
		} catch (error) {
			Promise.reject(error);
		}
	}

	const getUserPublications = async (userId: number): Promise<Array<SuccinctPublicationSchema>> => {
		try {
			const response = await PublicationsService.showPublicationsUser(userId)
			return response
		} catch (error) {
			return Promise.reject(error);
		}
	}

    const getPublication = async (publicationId: any): Promise<PublicationsShow> => {
		try {
			return await PublicationsService.showSpecificPublication(publicationId)
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const getPublicationAsAdmin = async (publicationId: any): Promise<PublicationsShow> => {
		try {
			return await PublicationsService.showSpecificPublicationAsAdmin(publicationId)
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const createPublication = async (file: string, body: any): Promise<any> => {
		try {
			console.log(file)
			console.log(new Blob([file], {type : 'text/plain'}))
			const response = await PublicationsService.createPublication({
										files: [new Blob([file], {type : 'multipart/form-data'})], body: body})
			return response
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const updatePublication = async (id: number, details: any): Promise<Publication_Update> => {
		try {
			console.log(details)
			const response = await PublicationsService.updatePublication(id, details)
			return response
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const updatePublicationItem = async (id: number, details: any): Promise<PublicationItemSchema> => {
		try {
			console.log(details)
			const response = await PublicationsService.updatePublicationItem(id, details)
			return response
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const addPublicationItem = async (id: number, details: any): Promise<any> => {
		try {
			const response = await PublicationsService.addPublicationItem(id, details)
			return response
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const removePublication = async (id: number): Promise<void> => {
		try {
			const response = await PublicationsService.removePublication(id)
			return response
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const allCategories = async (): Promise<Array<CategorySchema>> => {
		try {
			return PublicationsService.showCategories()
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const createCategory = async (file: string, body: any): Promise<CategorySchema> => {
		try {
			const response = await PublicationsService.addCategory({
				file: new Blob([file], {type : 'text/plain'}), body: body})
			return response
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const allBrands = async (): Promise<Array<string>> => {
		try {
			return PublicationsService.showBrands()
		} catch (error) {
			return Promise.reject(error);
		}
	}

	const publicationsByCategory = async (categoryName: string): Promise<Array<SuccinctPublicationSchema>> => {
		try {
			const active = await PublicationsService.showActivePublications()
			const response = active.filter((publication:SuccinctPublicationSchema) => publication.general_item_info?.category.name == categoryName)
			console.log(response)
			return response
		} catch (error) {
			return Promise.reject(error);
		}
	}

    const product = {
		allPublications: allPublications,
    	getPublication: getPublication,
		getPublicationAsAdmin: getPublicationAsAdmin,
		activePublications: activePublications,
		createPublication: createPublication,
		getUserPublications: getUserPublications,
		acceptPublication: acceptPublication,
		rejectPublication: rejectPublication,
		nonActivePublications: nonActivePublications,
		updatePublication: updatePublication,
		removePublication: removePublication,
		updatePublicationItem: updatePublicationItem,
		addPublicationItem: addPublicationItem,
		allCategories: allCategories,
		allBrands: allBrands,
		publicationsByCategory: publicationsByCategory,
		getRecomendations: getRecomendations,
		createCategory: createCategory
	}


    return (
		<ProductContext.Provider value={product}>
			{(children)}
		</ProductContext.Provider>
	)
}

export default ProductContextProvider
