/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PublicationItemCreationSchema } from './PublicationItemCreationSchema';

export type PublicationCreationSchema = {
    price: number;
    description: string;
    item_name: string;
    item_brand: string;
    item_category_id: number;
    publication_items: Array<PublicationItemCreationSchema>;
};
