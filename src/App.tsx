import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { Home, Auth } from './pages'
import { store } from './store/store'
import { fetchAuth } from './store/reducers/User'
import { token } from './utils/helpers/cookies'

const Wrapper = () => {
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    dispatch(fetchAuth(token))
  }, [token])

  return (
    <div className="wrapper">
      <Route path="/im" component={Home} />
      <Route exact path={["/", "/signin", "/signup"]} component={Auth} />
    </div>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Wrapper />
      </Provider>
    </BrowserRouter>
  )
}

export default App
