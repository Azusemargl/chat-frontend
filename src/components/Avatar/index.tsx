import React from 'react'
import { Users } from '../../types/user.type'
import { convertColorHex } from '../../utils/helpers'
import './Avatar.scss'

const Avatar: React.FC<Props> = ({ user }) => {
   if (!user) return <div className="avatar"></div>

   const color         = convertColorHex(+user._id).color
   const colorLighten  = convertColorHex(+user._id).colorLighten
   const upperCaseName = user.name[0].toUpperCase()

   return (
      <div className="avatar">
         {user.avatar
            ? <img src={user.avatar} alt={`${user.name} avatar`}/>
            : <div className="avatar avatar__bg" style={
                  { background: `linear-gradient(135deg, ${color} 0%, ${colorLighten})` }
               }>
               <span>{upperCaseName}</span>
            </div>
         }
      </div>
   )
}

export default Avatar

// Type
type Props = {
   user?: Users
}