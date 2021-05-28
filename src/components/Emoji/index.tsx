import React from 'react'
import './Emoji.scss'

const emojiItems = [
   '🐑', '✨'
]

export const Emoji: React.FC<Props> = ({ onEmojiSelect }) => {
   return (
      <div className="emoji">
         {emojiItems.map(item => {
            return (
               <span className="emoji__item" key={item} onClick={onEmojiSelect}>{item}</span>
            )
         })}
      </div>
   )
}

export default Emoji

// Types
type Props = {
   onEmojiSelect: (e: React.MouseEvent<HTMLElement>) => void
}