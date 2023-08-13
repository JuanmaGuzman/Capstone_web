/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CategorySchema } from '../models/CategorySchema';
import type { CategorySchema2 } from '../models/CategorySchema2';
import type { Publication_Update } from '../models/Publication_Update';
import type { PublicationCreationSchema } from '../models/PublicationCreationSchema';
import type { PublicationItemAddSchema } from '../models/PublicationItemAddSchema';
import type { PublicationItemSchema } from '../models/PublicationItemSchema';
import type { PublicationItemUpdateSchema } from '../models/PublicationItemUpdateSchema';
import type { PublicationsShow } from '../models/PublicationsShow';
import type { Shopping_Cart } from '../models/Shopping_Cart';
import type { ShoppingCartDetail } from '../models/ShoppingCartDetail';
import type { SuccinctPublicationSchema } from '../models/SuccinctPublicationSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublicationsService {

    /**
     * Get Publication Recommendations
     * @param amount 
     * @returns SuccinctPublicationSchema OK
     * @throws ApiError
     */
    public static getPublicationRecommendations(
amount: number,
): CancelablePromise<Array<SuccinctPublicationSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/publications/recommendations',
            query: {
                'amount': amount,
            },
        });
    }

    /**
     * Show Publications
     * @returns SuccinctPublicationSchema OK
     * @throws ApiError
     */
    public static showPublications(): CancelablePromise<Array<SuccinctPublicationSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/publications/all',
            errors: {
                403: `Forbidden`,
            },
        });
    }

    /**
     * Show Publications User
     * @param userId 
     * @returns SuccinctPublicationSchema OK
     * @throws ApiError
     */
    public static showPublicationsUser(
userId: number,
): CancelablePromise<Array<SuccinctPublicationSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/publications/all/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Show Active Publications
     * @returns SuccinctPublicationSchema OK
     * @throws ApiError
     */
    public static showActivePublications(): CancelablePromise<Array<SuccinctPublicationSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/publications/active',
        });
    }

    /**
     * Show Inactive Publications
     * @returns SuccinctPublicationSchema OK
     * @throws ApiError
     */
    public static showInactivePublications(): CancelablePromise<Array<SuccinctPublicationSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/publications/pending',
            errors: {
                403: `Forbidden`,
            },
        });
    }

    /**
     * Show Specific Publication
     * @param publicationId 
     * @returns PublicationsShow OK
     * @throws ApiError
     */
    public static showSpecificPublication(
publicationId: number,
): CancelablePromise<PublicationsShow> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/publications/obtener/{publication_id}',
            path: {
                'publication_id': publicationId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Show Specific Publication As Admin
     * @param publicationId 
     * @returns PublicationsShow OK
     * @throws ApiError
     */
    public static showSpecificPublicationAsAdmin(
publicationId: number,
): CancelablePromise<PublicationsShow> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/publications/obtener_as_admin/{publication_id}',
            path: {
                'publication_id': publicationId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Create Publication
     * @param formData 
     * @returns PublicationsShow Created
     * @throws ApiError
     */
    public static createPublication(
formData: {
files: Array<Blob>;
body: PublicationCreationSchema;
},
): CancelablePromise<PublicationsShow> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/publications/publications/create',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                409: `Conflict`,
            },
        });
    }

    /**
     * Add Publication Item
     * @param publicationId 
     * @param requestBody 
     * @returns PublicationsShow OK
     * @throws ApiError
     */
    public static addPublicationItem(
publicationId: number,
requestBody: PublicationItemAddSchema,
): CancelablePromise<PublicationsShow> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/publications/publications/add_publication_item/{publication_id}',
            path: {
                'publication_id': publicationId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Update Publication
     * @param pubId 
     * @param requestBody 
     * @returns PublicationsShow OK
     * @throws ApiError
     */
    public static updatePublication(
pubId: number,
requestBody: Publication_Update,
): CancelablePromise<PublicationsShow> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/publications/publications/update_publication/{pub_id}',
            path: {
                'pub_id': pubId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Update Publication Item
     * @param pubItemId 
     * @param requestBody 
     * @returns PublicationItemSchema OK
     * @throws ApiError
     */
    public static updatePublicationItem(
pubItemId: number,
requestBody: PublicationItemUpdateSchema,
): CancelablePromise<PublicationItemSchema> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/publications/publications/update_publication_item/{pub_item_id}',
            path: {
                'pub_item_id': pubItemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Remove Publication
     * @param publicationId 
     * @returns void 
     * @throws ApiError
     */
    public static removePublication(
publicationId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/publications/publications/remove_publication/{publication_id}',
            path: {
                'publication_id': publicationId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Accept Publication
     * @param publicationId 
     * @returns PublicationsShow OK
     * @throws ApiError
     */
    public static acceptPublication(
publicationId: number,
): CancelablePromise<PublicationsShow> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/publications/publications/accept/{publication_id}',
            path: {
                'publication_id': publicationId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Reject Publication
     * @param publicationId 
     * @returns void 
     * @throws ApiError
     */
    public static rejectPublication(
publicationId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/publications/publications/reject/{publication_id}',
            path: {
                'publication_id': publicationId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Show Brands
     * @returns string OK
     * @throws ApiError
     */
    public static showBrands(): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/publications/existing_brands',
        });
    }

    /**
     * Add To Cart
     * @param publicationItemId 
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static addToCart(
publicationItemId: number,
requestBody: Shopping_Cart,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/publications/shopping_cart/add_to_cart/{publication_item_id}',
            path: {
                'publication_item_id': publicationItemId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Remove From Cart
     * @param publicationItemId 
     * @returns void 
     * @throws ApiError
     */
    public static removeFromCart(
publicationItemId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/publications/shopping_cart/remove_from_cart/{publication_item_id}',
            path: {
                'publication_item_id': publicationItemId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Remove All Cart From Active User
     * @returns any OK
     * @throws ApiError
     */
    public static removeAllCartFromActiveUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/publications/shopping_cart/remove_all_cart/me',
        });
    }

    /**
     * Show Shopping Cart User
     * @returns ShoppingCartDetail OK
     * @throws ApiError
     */
    public static showShoppingCartUser(): CancelablePromise<Array<ShoppingCartDetail>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/shopping_cart/shopping_cart/me',
        });
    }

    /**
     * Show Shopping Cart From Specific User
     * @param userId 
     * @returns ShoppingCartDetail OK
     * @throws ApiError
     */
    public static showShoppingCartFromSpecificUser(
userId: number,
): CancelablePromise<Array<ShoppingCartDetail>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/shopping_cart/user_shopping_cart/{user_id}',
            path: {
                'user_id': userId,
            },
            errors: {
                403: `Forbidden`,
            },
        });
    }

    /**
     * Show Categories
     * @returns CategorySchema OK
     * @throws ApiError
     */
    public static showCategories(): CancelablePromise<Array<CategorySchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/publications/categories/all',
        });
    }

    /**
     * Add Category
     * @param formData 
     * @returns CategorySchema OK
     * @throws ApiError
     */
    public static addCategory(
formData: {
file: Blob;
body: CategorySchema2;
},
): CancelablePromise<CategorySchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/publications/categories/create',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Delete Category
     * @param categoryId 
     * @returns void 
     * @throws ApiError
     */
    public static deleteCategory(
categoryId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/publications/categories/remove/{category_id}',
            path: {
                'category_id': categoryId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
