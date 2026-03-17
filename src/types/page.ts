import type { MinistryId } from './ministries';

export type Page =
  | 'home'
  | 'about'
  | 'service-times'
  | 'core-values'
  | 'ministries'
  | `ministry/${MinistryId}`
  | 'dominion-center'
  | 'events'
  | 'sermons'
  | 'giving';
