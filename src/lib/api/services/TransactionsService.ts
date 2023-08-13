/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AllSellerTransactionsSchema } from '../models/AllSellerTransactionsSchema';
import type { Coupon } from '../models/Coupon';
import type { CouponCreate } from '../models/CouponCreate';
import type { MassCouponCreationSchema } from '../models/MassCouponCreationSchema';
import type { TransactionAcountlessCreateSchema } from '../models/TransactionAcountlessCreateSchema';
import type { TransactionCreateResponseSchema } from '../models/TransactionCreateResponseSchema';
import type { TransactionCreateSchema } from '../models/TransactionCreateSchema';
import type { TransactionResolveSchema } from '../models/TransactionResolveSchema';
import type { TransactionSchema } from '../models/TransactionSchema';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TransactionsService {

    /**
     * Get My Purchases
     * @returns TransactionSchema OK
     * @throws ApiError
     */
    public static getMyPurchases(): CancelablePromise<Array<TransactionSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/transactions/my-purchases',
        });
    }

    /**
     * Get My Sells
     * @returns AllSellerTransactionsSchema OK
     * @throws ApiError
     */
    public static getMySells(): CancelablePromise<AllSellerTransactionsSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/transactions/my-sells',
        });
    }

    /**
     * Create Transaction
     * @param requestBody 
     * @returns TransactionCreateResponseSchema OK
     * @throws ApiError
     */
    public static createTransaction(
requestBody: TransactionCreateSchema,
): CancelablePromise<TransactionCreateResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions/transactions/create/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Create Accountless Transaction
     * @param requestBody 
     * @returns TransactionCreateResponseSchema OK
     * @throws ApiError
     */
    public static createAccountlessTransaction(
requestBody: TransactionAcountlessCreateSchema,
): CancelablePromise<TransactionCreateResponseSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions/transactions/create_acountless/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                503: `Service Unavailable`,
            },
        });
    }

    /**
     * Resolve Transaction
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static resolveTransaction(
requestBody: TransactionResolveSchema,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions/transaction_confirmation/resolved',
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
     * Confirm Transaction Request
     * @param paymentId 
     * @returns any OK
     * @throws ApiError
     */
    public static confirmTransactionRequest(
paymentId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/transactions/transaction_confirmation/confirm_request/{payment_id}',
            path: {
                'payment_id': paymentId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Cancel Transaction
     * @param paymentId 
     * @returns any OK
     * @throws ApiError
     */
    public static cancelTransaction(
paymentId: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/transactions/transaction_confirmation/cancel/{payment_id}',
            path: {
                'payment_id': paymentId,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Get All Coupons
     * @returns Coupon OK
     * @throws ApiError
     */
    public static getAllCoupons(): CancelablePromise<Array<Coupon>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/coupons/all',
            errors: {
                403: `Forbidden`,
            },
        });
    }

    /**
     * Create Coupon
     * @param requestBody 
     * @returns Coupon OK
     * @throws ApiError
     */
    public static createCoupon(
requestBody: CouponCreate,
): CancelablePromise<Coupon> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions/coupons/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Mass Create Coupon
     * @param requestBody 
     * @returns Coupon OK
     * @throws ApiError
     */
    public static massCreateCoupon(
requestBody: MassCouponCreationSchema,
): CancelablePromise<Array<Coupon>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions/coupons/mass_create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Activate Coupon
     * @param couponId 
     * @returns Coupon OK
     * @throws ApiError
     */
    public static activateCoupon(
couponId: number,
): CancelablePromise<Coupon> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/transactions/coupons/activate/{coupon_id}',
            path: {
                'coupon_id': couponId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Deactivate Coupon
     * @param couponId 
     * @returns Coupon OK
     * @throws ApiError
     */
    public static deactivateCoupon(
couponId: number,
): CancelablePromise<Coupon> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/transactions/coupons/deactivate/{coupon_id}',
            path: {
                'coupon_id': couponId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Delete Coupon
     * @param couponId 
     * @returns void 
     * @throws ApiError
     */
    public static deleteCoupon(
couponId: number,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/transactions/coupons/delete/{coupon_id}',
            path: {
                'coupon_id': couponId,
            },
            errors: {
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Validate Coupon
     * @param couponCode 
     * @returns Coupon OK
     * @throws ApiError
     */
    public static validateCoupon(
couponCode: string,
): CancelablePromise<Coupon> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/coupons/validate/{coupon_code}',
            path: {
                'coupon_code': couponCode,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

}
