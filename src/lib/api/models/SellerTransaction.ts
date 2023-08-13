/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PublicationItemSchema } from './PublicationItemSchema';
import type { Transaction } from './Transaction';

export type SellerTransaction = {
    id?: number;
    amount: number;
    price_per_unit: number;
    transaction?: Transaction;
    publication_item?: PublicationItemSchema;
};
