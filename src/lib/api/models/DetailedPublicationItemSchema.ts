/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DetailedItemSchema } from './DetailedItemSchema';
import type { PublictionItemPublictionInfo } from './PublictionItemPublictionInfo';

export type DetailedPublicationItemSchema = {
    id?: number;
    publication: number;
    item?: DetailedItemSchema;
    available?: number;
    publication_info?: PublictionItemPublictionInfo;
};
