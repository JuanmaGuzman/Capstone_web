/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PublicationItemGeneralInfoSchema } from './PublicationItemGeneralInfoSchema';

export type SuccinctPublicationSchema = {
    id?: number;
    seller: number;
    price: number;
    general_item_info?: PublicationItemGeneralInfoSchema;
    photo_uris?: Array<string>;
};
