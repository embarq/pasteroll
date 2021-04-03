import { none, useHookstate } from '@hookstate/core'
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonList, IonPage, IonTitle, IonToast, IonToolbar } from '@ionic/react'
import { useState } from 'react'
import {
  arrowUndoOutline,
  ellipsisVerticalOutline
} from 'ionicons/icons'
import { Plugins } from '@capacitor/core'
import ClipboardItemsListItem from '../components/ClipboardItemsLIstItem'
import { ClipboardItems } from '../lib/state'
import { ClipboardItem } from '../model'
import './Home.css'

const Home: React.FC = () => {
  const items = useHookstate(ClipboardItems)
  const [showUndoToast, setShowUndoToast] = useState(false)
  const [showCopiedToast, setShowCopiedToast] = useState(false)
  const [removedItem, setRemovedItem] = useState<ClipboardItem | null>(null)
  const listItems = Array.from(items.value)
    .sort((a, b) => a.created_at - b.created_at)
    .map(item => (
      <ClipboardItemsListItem key={item.id} item={item} onRemove={handleRemove} onClick={handleItemClick} />
    ))

  function handleItemClick (itemId: string): void {
    const item = items.find(item => item.value.id === itemId)

    if (item != null) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Plugins.Clipboard.write({
        string: item.content.value
      })
      setShowCopiedToast(true)
    }
  }

  function handleRemove (itemId: string): void {
    const ix = items.findIndex(item => item.value.id === itemId)

    if (ix > -1) {
      const itemToRemove = Object.assign({}, items.value[ix])
      items.merge({ [ix]: none })
      setShowUndoToast(true)
      setRemovedItem(itemToRemove)
    }
  }

  function undoRemoveItem (): void {
    if (removedItem != null) {
      items.merge([removedItem])
      setRemovedItem(null)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>💾 Pasteroll</IonTitle>
          <IonButtons slot='end'>
            <IonButton color='dark'>
              <IonIcon icon={ellipsisVerticalOutline} slot='icon-only' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          items.length > 0 && <IonList>{listItems}</IonList>
        }
      </IonContent>
      <IonToast
        isOpen={showUndoToast}
        duration={5000}
        position='top'
        message='Item removed'
        onDidDismiss={() => setShowUndoToast(false)}
        buttons={[
          {
            side: 'start',
            text: 'Undo',
            icon: arrowUndoOutline,
            handler: undoRemoveItem
          },
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]}
      />
      <IonToast
        isOpen={showCopiedToast}
        duration={3000}
        position='top'
        message='Copied 💾'
        onDidDismiss={() => setShowCopiedToast(false)}
        buttons={[
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]}
      />
    </IonPage>
  )
}

export default Home
