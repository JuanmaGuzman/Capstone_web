/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategorySchema } from './CategorySchema';

export type PublicationItemGeneralInfoSchema = {
    name: string;
    brand: string;
    category: CategorySchema;
    total_amount: number;
};
