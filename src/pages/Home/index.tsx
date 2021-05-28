import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect  } from 'react-router-dom'
import classnames from 'classnames'
import { Header } from '../../components'
import { Dialogs, Messages } from '../../containers'
import { AppState } from '../../store/store'
import './Home.scss'

const App: React.FC = () => {
  const id =  useSelector((state: AppState) => state.user.id)
  const auth =  useSelector((state: AppState) => state.user.auth)

  const [showSidebar, setShowSidebar] = React.useState(true)

  const onBurger = () => {
    setShowSidebar(!showSidebar)
  }

  if (!auth) {
    return <Redirect to="/signin" />
  }

  return (
    <>

      <Header onBurger={onBurger} />
      <div className={classnames("home", {"home__full": !showSidebar})}>
        {showSidebar && <Dialogs ownerId={id} />}
        <div className="main" style={showSidebar ? { width: '70%' } : { width: '100%' }}>
          <Route path={'/im/:id?'} render={() => <Messages ownerId={id} />} />
        </div>
      </div>
    </>
  )
}

export default App
