import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonContent, IonFab, IonItem, IonList, IonMenu, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Home from './pages/Home'

import './styles'
import PasteButton from './components/PasteButton'
import { useEffect, useState } from 'react'
import { useHookstate } from '@hookstate/core'
import { ClipboardAvailable } from './lib/state'

const App: React.FC = () => {
  const clipboardAvailable = useHookstate(ClipboardAvailable)

  useEffect(() => {
    if (clipboardAvailable.value === false && typeof navigator.permissions !== 'undefined') {
      const results = Promise.all([
        navigator.permissions.query({ name: 'clipboard-read' }),
        navigator.permissions.query({ name: 'clipboard-write' }),
      ])

      results
        .then(statuses => statuses.every(status => status.state === 'granted'))
        .then(isClipboardAvailable =>
          isClipboardAvailable && clipboardAvailable.set(isClipboardAvailable)
        )
    }
  }, [])

  return (
    <IonApp>
      <IonMenu>
        <IonContent>
          <IonList>
            <IonItem>
              What's up?
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      {clipboardAvailable.value && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <PasteButton />
        </IonFab>
      )}

    </IonApp>
  )
}

export default App;
