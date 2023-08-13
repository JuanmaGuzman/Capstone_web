/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DetailedItemSchema } from './DetailedItemSchema';

export type PublicationItemSchema = {
    id?: number;
    publication: number;
    item?: DetailedItemSchema;
    available?: number;
};
