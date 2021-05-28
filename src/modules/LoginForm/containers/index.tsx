import LoginForm from '../components'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../../../store/reducers/User'
import { AppState } from '../../../store/store'

const LoginContainer = withFormik<OtherProps, FormValue>({
   mapPropsToValues: () => ({ email: '', password: '' }),

   validationSchema: Yup.object().shape({
      email:    Yup.string().email('Неккоректный email').required('Обязательное поле'),
      password: Yup.string().min(6, 'Минимум 6 символов').max(20, 'Максимум 20 символов').required('Обязательное поле')
   }),

   handleSubmit: (values, { props, setSubmitting  }) => {
      props.onFetchUser(values)
      setSubmitting(false)
   }
})(LoginForm)

export default () => {
   const dispatch = useDispatch()
   const errors = useSelector(({ user }: AppState) => user.loginError)

   const onFetchUser = ({ email, password }: FormValue) => {
      dispatch(fetchLogin(email, password))
   }

   return <LoginContainer formError={errors} onFetchUser={onFetchUser} />
}

// Types
export type OtherProps = {
   formError: string | null
   onFetchUser: (value: FormValue) => void
}
export type FormValue = {
   email: string
   password: string
}