import { useHookstate } from '@hookstate/core'
import { IonFabButton, IonIcon } from '@ionic/react'
import { clipboardOutline } from 'ionicons/icons'
import { nanoid } from 'nanoid'
import { Plugins } from '@capacitor/core'
import { ClipboardItems } from '../lib/state'
import { isString, maybeReadFromWebClipboard } from '../lib/utils'

const PasteButton: React.FC = () => {
  const items = useHookstate(ClipboardItems)

  async function handleClick(): Promise<void> {
    try {
      const value =
        navigator.clipboard != null
          ? await maybeReadFromWebClipboard()
          : await Plugins.Clipboard.read().then((res) => res.value)

      if (isString(value)) {
        items.merge([
          {
            id: nanoid(),
            content: value,
            created_at: Date.now(),
          },
        ])
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <IonFabButton onClick={handleClick}>
      <IonIcon icon={clipboardOutline} />
    </IonFabButton>
  )
}

export default PasteButton
