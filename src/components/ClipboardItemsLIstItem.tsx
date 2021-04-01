import { useHookstate } from "@hookstate/core";
import { IonBadge, IonButton, IonIcon, IonItem } from "@ionic/react";
import { trashBinOutline } from 'ionicons/icons'
import { MouseEventHandler, SyntheticEvent } from "react";
import { formatDateTime } from "../lib/format-date-time";
import { ClipboardAvailable } from "../lib/state";
import { isFunction } from "../lib/utils";
import { ClipboardItem } from "../model";

type ClipboardItemsListItemProps = {
  item: ClipboardItem
  onRemove?: (itemId: string) => any
  onClick?: (itemId: string) => any
}

const ClipboardItemsListItem: React.FC<ClipboardItemsListItemProps> = ({ item, onRemove, onClick }) => {
  const handleClick: MouseEventHandler<HTMLIonItemElement> = (event) => {
    const isRemoveBtnClick = (event.target as HTMLElement).classList.contains('remove-button')

    if (isFunction(onClick) && !isRemoveBtnClick) {
      onClick(item.id)
    }
  }

  return (
    <IonItem onClick={handleClick}>
      <article>
        <p>{item.content}</p>
        <IonBadge color="light">
          {formatDateTime(item.created_at)}
        </IonBadge>
      </article>
  
      <IonButton onClick={() => isFunction(onRemove) && onRemove(item.id)} slot="end" color="drak" fill="clear" class="remove-button">
        <IonIcon icon={trashBinOutline} color="danger" slot="icon-only"></IonIcon>
      </IonButton>
    </IonItem>
  )
}

export default ClipboardItemsListItem