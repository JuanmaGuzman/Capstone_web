/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PublicationItemSchema } from './PublicationItemSchema';

export type PublicationsShow = {
    id?: number;
    seller: number;
    price: number;
    publish_date?: string;
    is_active?: boolean;
    is_accepted?: boolean;
    description?: string;
    publication_items?: Array<PublicationItemSchema>;
    photo_uris?: Array<string>;
};
