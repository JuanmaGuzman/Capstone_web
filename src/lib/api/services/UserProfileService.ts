/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EmailConfirmation } from '../models/EmailConfirmation';
import type { PublicUserProfile } from '../models/PublicUserProfile';
import type { UserProfile4 } from '../models/UserProfile4';
import type { UserProfileCreationSchema } from '../models/UserProfileCreationSchema';
import type { UserShippingAddress } from '../models/UserShippingAddress';
import type { UserShippingAddressCreate } from '../models/UserShippingAddressCreate';
import type { UserUpdate } from '../models/UserUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserProfileService {

    /**
     * Get User
     * @returns UserProfile4 OK
     * @throws ApiError
     */
    public static getUser(): CancelablePromise<UserProfile4> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_profiles/user_profiles/me',
        });
    }

    /**
     * Get Seller
     * @param sellerId 
     * @returns PublicUserProfile OK
     * @throws ApiError
     */
    public static getSeller(
sellerId: number,
): CancelablePromise<PublicUserProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_profiles/user_profiles/seller/{seller_id}',
            path: {
                'seller_id': sellerId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Get All Users
     * @returns UserProfile4 OK
     * @throws ApiError
     */
    public static getAllUsers(): CancelablePromise<Array<UserProfile4>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_profiles/user_profiles/all',
            errors: {
                403: `Forbidden`,
            },
        });
    }

    /**
     * Create User
     * @param requestBody 
     * @returns UserProfile4 OK
     * @throws ApiError
     */
    public static createUser(
requestBody: UserProfileCreationSchema,
): CancelablePromise<UserProfile4> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_profiles/user_profiles/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Remove User
     * @returns void 
     * @throws ApiError
     */
    public static removeUser(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user_profiles/user_profiles/remove_user',
        });
    }

    /**
     * Remove User By Id
     * @param userId 
     * @returns void 
     * @throws ApiError
     */
    public static removeUserById(
userId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user_profiles/user_profiles/remove_user/{user_id}',
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
     * Update User
     * @param requestBody 
     * @returns UserProfile4 OK
     * @throws ApiError
     */
    public static updateUser(
requestBody: UserUpdate,
): CancelablePromise<UserProfile4> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user_profiles/user_profiles/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Confirm Email
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static confirmEmail(
requestBody: EmailConfirmation,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user_profiles/user_profiles/confirm_email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Get All Signed User Shipping Addresses
     * @returns UserShippingAddress OK
     * @throws ApiError
     */
    public static getAllSignedUserShippingAddresses(): CancelablePromise<Array<UserShippingAddress>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_profiles/user_profiles/shipping_address/me',
        });
    }

    /**
     * Get Signed User Shipping Address
     * @param shippingAddressId 
     * @returns UserShippingAddress OK
     * @throws ApiError
     */
    public static getSignedUserShippingAddress(
shippingAddressId: number,
): CancelablePromise<UserShippingAddress> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/user_profiles/user_profiles/shipping_address/me/{shipping_address_id}',
            path: {
                'shipping_address_id': shippingAddressId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Create Shipping Address
     * @param requestBody 
     * @returns UserShippingAddress OK
     * @throws ApiError
     */
    public static createShippingAddress(
requestBody: UserShippingAddressCreate,
): CancelablePromise<UserShippingAddress> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/user_profiles/user_profiles/shipping_address',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Delete Shipping Address
     * @param shippingAddressId 
     * @returns void 
     * @throws ApiError
     */
    public static deleteShippingAddress(
shippingAddressId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/user_profiles/user_profiles/shipping_address/{shipping_address_id}',
            path: {
                'shipping_address_id': shippingAddressId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Assign Seller
     * @param userProfileId 
     * @returns UserProfile4 OK
     * @throws ApiError
     */
    public static assignSeller(
userProfileId: number,
): CancelablePromise<UserProfile4> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user_profiles/permissions/assign_seller/{user_profile_id}',
            path: {
                'user_profile_id': userProfileId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Assign Admin
     * @param userProfileId 
     * @returns UserProfile4 OK
     * @throws ApiError
     */
    public static assignAdmin(
userProfileId: number,
): CancelablePromise<UserProfile4> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user_profiles/permissions/assign_admin/{user_profile_id}',
            path: {
                'user_profile_id': userProfileId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Remove Seller
     * @param userProfileId 
     * @returns void 
     * @throws ApiError
     */
    public static removeSeller(
userProfileId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user_profiles/permissions/remove_seller/{user_profile_id}',
            path: {
                'user_profile_id': userProfileId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Remove Admin
     * @param userProfileId 
     * @returns void 
     * @throws ApiError
     */
    public static removeAdmin(
userProfileId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/user_profiles/permissions/remove_admin/{user_profile_id}',
            path: {
                'user_profile_id': userProfileId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

}
