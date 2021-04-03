import { useHookstate } from '@hookstate/core'
import { IonFabButton, IonIcon } from '@ionic/react'
import { clipboardOutline } from 'ionicons/icons'
import { nanoid } from 'nanoid'
import { Plugins } from '@capacitor/core'
import { ClipboardItems } from '../lib/state'
import { isString } from '../lib/utils'

const PasteButton: React.FC = () => {
  const items = useHookstate(ClipboardItems)

  async function handleClick (): Promise<void> {
    const { value } = await Plugins.Clipboard.read()

    if (isString(value)) {
      items.merge([
        {
          id: nanoid(),
          content: value,
          created_at: Date.now()
        }
      ])
    }
  }

  return (
    <IonFabButton onClick={handleClick}>
      <IonIcon icon={clipboardOutline} />
    </IonFabButton>
  )
}

export default PasteButton
