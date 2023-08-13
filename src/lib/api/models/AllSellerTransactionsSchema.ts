/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SellerAccountlessTransaction } from './SellerAccountlessTransaction';
import type { SellerTransaction } from './SellerTransaction';

export type AllSellerTransactionsSchema = {
    transaction_pointers: Array<SellerTransaction>;
    accountless_transaction_pointers: Array<SellerAccountlessTransaction>;
};
