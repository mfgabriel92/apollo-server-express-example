import { PubSub } from 'apollo-server'
import * as MESSAGES from './messages'

export const EVENTS = {
  MESSAGES,
}

export default new PubSub()
