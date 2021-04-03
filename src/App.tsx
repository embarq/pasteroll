import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonContent, IonFab, IonItem, IonList, IonMenu, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import Home from './pages/Home'

import './styles'
import PasteButton from './components/PasteButton'

const App: React.FC = () => {
  return (
    <IonApp>
      <IonMenu>
        <IonContent>
          <IonList>
            <IonItem>
              What&quot;s up?
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path='/home'>
            <Home />
          </Route>
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
      <IonFab vertical='bottom' horizontal='end' slot='fixed'>
        <PasteButton />
      </IonFab>

    </IonApp>
  )
}

export default App
