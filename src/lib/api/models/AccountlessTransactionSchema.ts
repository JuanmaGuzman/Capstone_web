/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SuccinctCouponSchema } from './SuccinctCouponSchema';

export type AccountlessTransactionSchema = {
    buyer_name: string;
    buyer_lastname: string;
    phone_number: string;
    region: string;
    commune: string;
    address: string;
    coupon?: SuccinctCouponSchema;
};
