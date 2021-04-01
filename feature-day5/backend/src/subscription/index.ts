import { PubSub } from 'apollo-server';
 
import * as MASTER_EVENTS from './master'

export const EVENTS = {
    MASTER: MASTER_EVENTS
}

export default new PubSub();