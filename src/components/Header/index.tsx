import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { actions } from '../../store/reducers/User'
import { AppState } from '../../store/store'
import { delete_cookie } from '../../utils/helpers/cookies'
import { MenuOutlined, CaretDownOutlined, ExportOutlined, SettingOutlined } from '@ant-design/icons'
import Avatar from '../../assets/img/avatar.jpg'
import './Header.scss'

const Header: React.FC<Props> = ({ onBurger }) => {
   const dispatch = useDispatch()
   const { name } = useSelector((state: AppState) => state.user)

   const [settingsVisable, setSettingsVisable] = React.useState(false)
   const settingsRef = React.useRef<HTMLDivElement>(null)

   // Settings window toggle
   const onSettingsShow = () => setSettingsVisable(!settingsVisable)

   // Logout. Delete cookies and set null values for user data
   const onLogout = () => {
      delete_cookie('token')
      dispatch(actions.logout())
   }

   // Hide the settings window after click
   const handleOutsideClick = (e: MouseEvent) => {
      if (settingsRef.current !== null) {
         const path = e.composedPath()
         if (!path.includes(settingsRef.current)) setSettingsVisable(false)
      }
      window.removeEventListener("click", handleOutsideClick)
   }

   // Add listener for window clicks
   React.useEffect(() => {
      document.body.addEventListener('click', handleOutsideClick)
   }, [])

   return (
      <header className="header">
         <div>
            <MenuOutlined className="header__burger" onClick={onBurger} />
            <Link className="header__logo" to="/im/">Chat</Link>
         </div>
         <div className="header__auth">
            <div className="header__auth-block">
               <Link to="/settings"><img className="header__auth-avatar" src={Avatar} alt={`${name}`} /></Link>
               <div className="header__settings" ref={settingsRef}>
                  <CaretDownOutlined className={classnames("header__auth-arrow", { "active": settingsVisable })} onClick={onSettingsShow} />
                  {settingsVisable &&
                     <div className="header__auth-settings">
                        <Link className="header__auth-settings-link account" to="/account">
                           <img src={Avatar} alt={`${name}`} />
                           <p className="header__auth-label header__auth-name">{name}</p>
                        </Link>
                        <Link className="header__auth-settings-link" to="/settings">
                           <SettingOutlined className="header__auth-icon" />
                           <p className="header__auth-label">Настройки</p>
                        </Link>
                        <div className="header__auth-settings-link logout">
                           <ExportOutlined className="header__auth-icon" onClick={onLogout} />
                           <p className="header__auth-label">Выход</p>
                        </div>
                     </div>
                  }
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header

// Types
type Props = {
   onBurger: () => void
}
