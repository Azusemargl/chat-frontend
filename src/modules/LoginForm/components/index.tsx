import React from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { Form, Field, FormikProps } from 'formik'
import { Link, Redirect } from 'react-router-dom'
import { Block, Button } from '../../../components'
import { OtherProps, FormValue } from '../containers'
import { AppState } from '../../../store/store'
import Check from '../../../assets/img/checked.svg'
import Cancel from '../../../assets/img/cancel.svg'

const LoginForm = (props: OtherProps & FormikProps<FormValue>) => {
   const { touched, errors, formError, isSubmitting } = props

   const loginSuccess = useSelector(({ user }: AppState) => user.id)

   if (loginSuccess) return <Redirect to='/im' />

   const emailErrors = touched.email && errors.email
   const passwordErrors = touched.password && errors.password

   return (
      <>
         <div className="auth__top">
            <h2>Войти в аккаунт</h2>
            <p>Пожалуйста, войдите в свой аккаунт</p>
         </div>
         <Block>
            <Form className="form">
               {formError && <span className="form__error-text form__error-text--field">{formError}</span>}

               <div className={classNames("form__group", {"form__error": emailErrors || formError})}>
                  <div className="form__item">
                     <Field className="form__field" type="text" name="email" placeholder="E-mail" />
                     {(emailErrors || formError) && <img src={Cancel} alt="cancel" />}
                     {touched.email && !errors.email && !formError && <img src={Check} alt="check" />}
                  </div>
                  {emailErrors && <span className="form__error-text">{errors.email}</span>}
               </div>

               <div className={classNames("form__group", {"form__error": passwordErrors || formError})}>
                  <div className="form__item">
                     <Field className="form__field" type="password" name="password" placeholder="Пароль" />
                     {(passwordErrors || formError) && <img src={Cancel} alt="cancel" />}
                     {touched.password && !errors.password && !formError && <img src={Check} alt="check" />}
                  </div>
                  {passwordErrors && <span className="form__error-text">{errors.password}</span>}
               </div>

               <Button type="submit" disabled={isSubmitting}>Войти</Button>
               <p className="auth__links">Нет аккаунта?<Link className="auth__link" to="/signup">Зарегистрироваться</Link></p>
            </Form>
         </Block>
      </>
   )
}

export default LoginForm