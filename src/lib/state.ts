import { createState } from '@hookstate/core'
import { ToastOptions } from '@ionic/react'
import { ClipboardItem } from '../model'

export const ClipboardItems = createState([] as ClipboardItem[])

export const ClipboardAvailable = createState<boolean>(
  typeof navigator?.clipboard !== 'undefined'
)
