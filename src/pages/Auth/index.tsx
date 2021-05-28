import React from 'react'
import { Route } from 'react-router-dom'
import { LoginForm, RegisterForm } from '../../modules'
import background from '../../assets/img/auth_background.jpg'
import './Auth.scss'

const Auth: React.FC = () => {
   return (
      <div className="auth" style={{ backgroundImage: `url(${background})` }}>
         <div className="auth__content">
            <Route exact path="/signin" component={LoginForm} />
            <Route exact path="/signup" component={RegisterForm} />
         </div>
      </div>
   )
}

export default Auth