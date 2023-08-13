/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountlessTransactionSchema } from './AccountlessTransactionSchema';
import type { PublicationItemSchema } from './PublicationItemSchema';

export type SellerAccountlessTransaction = {
    id?: number;
    amount: number;
    price_per_unit: number;
    transaction?: AccountlessTransactionSchema;
    publication_item?: PublicationItemSchema;
};
