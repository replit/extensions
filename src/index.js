import { registerMessageListener, handshake } from './talk';
import {debug} from './log'
export * from './api'
export * from './log'

export async function init({permissions}) {
  const disposeMessageListener = registerMessageListener()
  await handshake(permissions)

  return () => {
    disposeMessageListener();
  }
}