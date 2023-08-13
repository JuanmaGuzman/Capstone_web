/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PublicUserProfile } from './PublicUserProfile';
import type { SuccinctCouponSchema } from './SuccinctCouponSchema';
import type { UserShippingAddress } from './UserShippingAddress';

export type Transaction = {
    shipping_address?: UserShippingAddress;
    buyer?: PublicUserProfile;
    coupon?: SuccinctCouponSchema;
};
