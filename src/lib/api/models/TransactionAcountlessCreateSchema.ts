/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { TransactionAccountlessPublicationItems } from './TransactionAccountlessPublicationItems';

export type TransactionAcountlessCreateSchema = {
    buyer_name: string;
    buyer_lastname: string;
    phone_number: string;
    email: string;
    region: string;
    commune: string;
    address: string;
    publication_items_list: Array<TransactionAccountlessPublicationItems>;
    coupon_id?: number;
};
