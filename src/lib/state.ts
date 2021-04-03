import { createState } from '@hookstate/core'
import { ClipboardItem } from '../model'

export const ClipboardItems = createState([] as ClipboardItem[])

export const ClipboardAvailable = createState<boolean>(
  typeof navigator?.clipboard !== 'undefined'
)
