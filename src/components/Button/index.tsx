import React from 'react'
import classNames from 'classnames'
import './Button.scss'

const Button: React.FC<Props> = ({ className, type, disabled, children }) => {
   return (
      <button className={classNames('button', className)} type={type} disabled={disabled}>
         {children}
      </button>
   )
}

export default Button 

// Type
type Props = {
   className?: string
   type: "button" | "submit" | "reset" | undefined
   disabled: boolean
   children: React.ReactChild
}