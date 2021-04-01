import { useHookstate } from '@hookstate/core';
import { IonFabButton, IonIcon } from '@ionic/react';
import { clipboardOutline } from 'ionicons/icons'
import { ClipboardItems } from '../lib/state';
import { nanoid } from 'nanoid'
import { isString } from '../lib/utils';

const PasteButton: React.FC = () => {
  const items = useHookstate(ClipboardItems)

  function handleClick() {
    navigator.clipboard.readText().then(content => {
      if (isString(content)) {
        items.merge([
          {
            id: nanoid(),
            content,
            created_at: Date.now(),
          }
        ])
      }
    })

  }

  return (
    <IonFabButton onClick={handleClick}>
      <IonIcon icon={clipboardOutline}></IonIcon>
    </IonFabButton>
  )
}

export default PasteButton