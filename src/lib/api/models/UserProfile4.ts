/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserProfile4 = {
    id?: number;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    phone_number: string;
    rut: string;
    birthdate: string;
    is_admin?: boolean;
    is_seller?: boolean;
};
