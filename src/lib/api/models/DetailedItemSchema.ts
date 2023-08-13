/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SuccinctCategorySchema } from './SuccinctCategorySchema';

export type DetailedItemSchema = {
    id?: number;
    name: string;
    brand: string;
    size?: string;
    color: string;
    sku: number;
    category?: SuccinctCategorySchema;
};
