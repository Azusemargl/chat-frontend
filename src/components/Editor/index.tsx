import React from 'react'
import { Emoji } from '..'
import classnames from 'classnames'
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons'
import './Editor.scss'

const Editor: React.FC = React.memo(() => {
   const [value, setValue] = React.useState('')
   const [files, setFiles] = React.useState<FileList | null>(null)
   const [emojiVisable, setShowChosenEmoji] = React.useState(false)
   
   const emojiRef = React.useRef<HTMLDivElement>(null)

   // Get files
   const onFileSelect = (file: FileList | null) => {
      console.log(files)      
      setFiles(file)
   }

   // Set emoji window visible
   const onVisableEmoji = (e: React.MouseEvent<HTMLElement>) => {
      setShowChosenEmoji(!emojiVisable)
   }

   // Set emoji item to input field
   const onEmojiSelect = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      const value = e.target as HTMLElement
      console.log(value.innerText)
   }

   // Hide the emoji window after click
   const handleOutsideClick = (e: MouseEvent) => {
      if (emojiRef.current !== null) {
         const path = e.composedPath()
         if (!path.includes(emojiRef.current)) setShowChosenEmoji(false)
      }
      window.removeEventListener("click", handleOutsideClick)
   }

   // Add listener for window clicks
   React.useEffect(() => {
      document.body.addEventListener('click', handleOutsideClick)
   }, [])

   return (
      <div className="editor">
         <div className="editor__container">
            <div className="editor__block">
               <div className="emoji__container" ref={emojiRef}>
                     <button onClick={onVisableEmoji}>
                     <SmileOutlined className={classnames("editor__icon", {"active": emojiVisable})} />
                  </button>
                  {emojiVisable && <Emoji onEmojiSelect={onEmojiSelect} />}
               </div>
               <input
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  type="text"
                  placeholder="Введите текст сообщения…"
               />
            </div>
            <div className="editor__block">
               <button>
                  <input id="file" type="file" hidden multiple onChange={e => onFileSelect(e.target.files)} />
                  <label htmlFor="file"><CameraOutlined className="editor__icon" /></label>
               </button>
               <button><AudioOutlined className="editor__icon" /></button>
               <button><SendOutlined className="editor__icon" /></button>
            </div>
         </div>
      </div>
   )
})

export default Editor
