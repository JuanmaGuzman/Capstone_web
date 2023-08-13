/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type UserProfileCreationSchema = {
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
    password1: string;
    password2: string;
};
