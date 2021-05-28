import React from 'react'
import { AppState } from '../../../store/store';
import { withFormik } from 'formik'
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { fetchRegistration } from '../../../store/reducers/User'
import RegisterForm from '../components'

const RegistrationContainer = withFormik<OtherProps, FormValue>({
   mapPropsToValues: () => ({ name: '', email: '', password: '', confirmPassword: '' }),

   validationSchema: Yup.object().shape({
      name: Yup.string()
         .min(2, 'Минимум 2 символа')
         .max(20, 'Максимум 20 символов')
         .required('Обязательное поле'),
      email: Yup.string()
         .email('Неккоректный email')
         .required('Обязательное поле'),
      password: Yup.string()
         .min(6, 'Минимум 6 символов')
         .max(20, 'Максимум 20 символов')
         .required('Обязательное поле'),
      confirmPassword: Yup.string()
         .min(6, 'Минимум 6 символов')
         .max(20, 'Максимум 20 символов')
         .required('Обязательное поле')
         .oneOf([Yup.ref('password'), null], 'Пароли должны быть одинаковыми')
    }),

   handleSubmit: (values: FormValue, { props, setSubmitting  }) => {
      props.onRegistration(values)
      setSubmitting(false)
   }
})(RegisterForm)

export default () => {
   const dispatch = useDispatch()
   const errors = useSelector(({ user }: AppState) => user.registrationError)
   const auth = useSelector(({ user }: AppState) => user.auth)

   const onRegistration = ({ name, email, password }: FormValue) => {
      dispatch(fetchRegistration(name, email, password))
   }

   return <RegistrationContainer formError={errors} onRegistration={onRegistration} auth={auth} />
}

// Types
export type OtherProps = {
   formError: string | null
   onRegistration: (values: FormValue) => void
   auth: boolean
}
export type FormValue = {
   name: string
   email: string
   password: string
   confirmPassword?: string
}