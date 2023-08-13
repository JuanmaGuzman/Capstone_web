/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DetailedPublicationItemSchema } from './DetailedPublicationItemSchema';

export type TransactionPointerSchema = {
    id?: number;
    amount: number;
    price_per_unit: number;
    publication_item?: DetailedPublicationItemSchema;
};
