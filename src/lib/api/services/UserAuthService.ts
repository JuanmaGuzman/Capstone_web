/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordIn } from '../models/ChangePasswordIn';
import type { LoginIn } from '../models/LoginIn';
import type { RequestPasswordResetIn } from '../models/RequestPasswordResetIn';
import type { SetPasswordIn } from '../models/SetPasswordIn';
import type { UserOut } from '../models/UserOut';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserAuthService {

    /**
     * Login
     * @param requestBody 
     * @returns UserOut OK
     * @throws ApiError
     */
    public static login(
requestBody: LoginIn,
): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }

    /**
     * Logout
     * @returns void 
     * @throws ApiError
     */
    public static logout(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/auth/',
        });
    }

    /**
     * Me
     * @returns UserOut OK
     * @throws ApiError
     */
    public static me(): CancelablePromise<UserOut> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/me',
        });
    }

    /**
     * Request Password Reset
     * @param requestBody 
     * @returns void 
     * @throws ApiError
     */
    public static requestPasswordReset(
requestBody: RequestPasswordResetIn,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/request_password_reset',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Reset Password
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static resetPassword(
requestBody: SetPasswordIn,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/reset_password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Change Password
     * @param requestBody 
     * @returns any OK
     * @throws ApiError
     */
    public static changePassword(
requestBody: ChangePasswordIn,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/change_password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden`,
            },
        });
    }

}
