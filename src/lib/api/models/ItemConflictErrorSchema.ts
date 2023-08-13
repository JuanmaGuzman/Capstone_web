/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ItemConflictInfo } from './ItemConflictInfo';

export type ItemConflictErrorSchema = {
    conflicts: Array<(ItemConflictInfo | string)>;
};
