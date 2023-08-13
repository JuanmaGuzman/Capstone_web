/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserUpdate = {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
};
