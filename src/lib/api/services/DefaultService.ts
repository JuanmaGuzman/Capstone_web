/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Get Csrf
     * @returns any OK
     * @throws ApiError
     */
    public static getCsrf(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/csrf',
        });
    }

}
