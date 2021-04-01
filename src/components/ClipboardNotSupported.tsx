import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from "@ionic/react";

const ClipboardNotSupported: React.FC = () => (
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>🤔 Clipboard is not supported on your device</IonCardTitle>
    </IonCardHeader>
    <IonCardContent>
      <p>There's nothing we can do to help you,</p>
      <p>so this app is useless I suppose...</p>
      <p>Have a good time tho!</p>
    </IonCardContent>
  </IonCard>
)

export default ClipboardNotSupported