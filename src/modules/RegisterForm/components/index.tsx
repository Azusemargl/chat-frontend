import React from 'react'
import { Form, Field, FormikProps } from 'formik'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { Block, Button } from '../../../components'
import { FormValue, OtherProps } from '../containers'
import Check from '../../../assets/img/checked.svg'
import Cancel from '../../../assets/img/cancel.svg'
import Success from '../../../assets/img/success.png'

const RegisterForm = (props: OtherProps & FormikProps<FormValue>) => {
   const { touched, errors, formError, isSubmitting, auth } = props
   const success = auth

   const nameErrors = touched.name && errors.name
   const emailErrors = touched.email && errors.email
   const passwordErrors = touched.password && errors.password
   const confirmPasswordErrors = touched.confirmPassword && errors.confirmPassword

   return (
      <>
         {!success && (
         <div className="auth__top">
            <h2>Создать аккаунт</h2>
            <p>Пожалуйста, введите данные, чтобы зарегистрироваться</p>
         </div>
         )}

         <Block>
            {!success ? (
               <Form className="form">
                  {formError && <span className="form__error-text form__error-text--field">{formError}</span>}

                  <div className={classNames("form__group", {"form__error": nameErrors})}>
                     <div className="form__item">
                        <Field className="form__field" type="text" name="name" placeholder="Имя" />
                        {nameErrors && <img src={Cancel} alt="cancel" />}
                        {touched.name && !errors.name && <img src={Check} alt="check" />}
                     </div>
                     {nameErrors && <span className="form__error-text">{errors.name}</span>}
                  </div>

                  <div className={classNames("form__group", {"form__error": emailErrors})}>
                     <div className="form__item">
                        <Field className="form__field" type="text" name="email" placeholder="E-mail" />
                        {emailErrors && <img src={Cancel} alt="cancel" />}
                        {touched.email && !errors.email && <img src={Check} alt="check" />}
                     </div>
                     {emailErrors && <span className="form__error-text">{errors.email}</span>}
                  </div>

                  <div className={classNames("form__group", {"form__error": passwordErrors})}>
                     <div className="form__item">
                        <Field className="form__field" type="password" name="password" placeholder="Пароль" />
                        {passwordErrors && <img src={Cancel} alt="cancel" />}
                        {touched.password && !errors.password && <img src={Check} alt="check" />}
                     </div>
                     {passwordErrors && <span className="form__error-text">{errors.password}</span>}
                  </div>

                  <div className={classNames("form__group", {"form__error": confirmPasswordErrors})}>
                     <div className="form__item">
                        <Field className="form__field" type="password" name="confirmPassword" placeholder="Повтор пароля" />
                        {confirmPasswordErrors && <img src={Cancel} alt="cancel" />}
                        {touched.confirmPassword && !errors.confirmPassword && <img src={Check} alt="check" />}
                     </div>
                     {confirmPasswordErrors && <span className="form__error-text">{errors.confirmPassword}</span>}
                  </div>

                  <Button type="submit" disabled={isSubmitting}>Зарегистрироваться</Button>
                  <p className="auth__links">Есть аккаунт?<Link className="auth__link" to="/signin">Войти</Link></p>
               </Form>
            ) : (
            <div className="auth__success-block">
               <img src={Success} alt="success" />
               <h2>Подтвердите свой аккаунт</h2>
               <p>На Вашу почту отправлено письмо с ссылкой на подтверждение
               аккаунта.</p>
            </div>
            )}
         </Block>
      </>
   )
}

export default RegisterForm