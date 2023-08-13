/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SuccinctCouponSchema } from './SuccinctCouponSchema';
import type { TransactionPointerSchema } from './TransactionPointerSchema';
import type { UserShippingAddress } from './UserShippingAddress';

export type TransactionSchema = {
    id?: number;
    shipping_address?: UserShippingAddress;
    transaction_pointers?: Array<TransactionPointerSchema>;
    coupon?: SuccinctCouponSchema;
};
