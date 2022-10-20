import * as Comlink from 'comlink'
import { ExtensionPortAPI } from 'src/types'

export const extensionPort = Comlink.wrap<ExtensionPortAPI>(Comlink.windowEndpoint(self.parent, self, "*"))